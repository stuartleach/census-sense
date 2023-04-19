import {PrismaClient} from "@prisma/client";

const prisma =  new PrismaClient();

export async function getZipCodeData(zip: string)  {
    console.log("zipcode", zip)
    const results = await prisma.all_zip_data.findUnique({
        where: {
            zipcode: parseInt(zip)
        }
    })
    return results
}