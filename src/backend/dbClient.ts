// This client is used to fetch data from the Postgres db,
// specified in the prisma client config.

import {PrismaClient} from '@prisma/client';
import {CensusZipCodeInfo} from './censusClient';
import targetZipCodes from "./zipcodeLists/targetZipCodes";

const prisma = new PrismaClient();

interface TargetZipCodes {
    data: number[];
}

const getAllZipCodeData = async (listOfZipCodes: TargetZipCodes) => {
    for (const zip of listOfZipCodes.data) {
         const previousEntry = await prisma.census_data.findFirst({
             where: {zipcode: zip},
         });

         if (previousEntry) continue;

        const censusZipCodeInfo = new CensusZipCodeInfo(zip.toString());
        const [
            zip_age,
            zip_pop,
            zip_income,
            zip_home_value,
        ] = await Promise.all([
            censusZipCodeInfo.get_median_age(),
            censusZipCodeInfo.get_population(),
            censusZipCodeInfo.get_median_household_income(),
            censusZipCodeInfo.get_average_home_value(),
        ]);

        await prisma.census_data.create({
            data: {
                zipcode: zip,
                population: zip_pop['Population'] || 0,
                income: zip_income['Median Household Income'] || 0,
                age: zip_age['Median Age'] || 0,
                average_home_value: zip_home_value['Average Home Value'] || 0,
            },
        });


    }
};

// Update in_scope flag to only include zip codes in market.
const updateZipcodesInScope = async () => {
    for (let i = 0; i < targetZipCodes.length; i++) {
        const zip = targetZipCodes[i];

        const num = await prisma.all_zip_data.count(
            {
                where: {zipcode: zip}
            }
        )

        // only update if exists
        if (num === 0) continue;

        await prisma.all_zip_data.update({
            where: {zipcode: zip},
            data: {
                in_scope: true,
            }
        })

    }
}

async function main() {
    // await getAllZipCodeData(texasZipCodes);
    // await getAllZipCodeData(newMexicoZipCodes);
    // await updateZipcodesInScope();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
