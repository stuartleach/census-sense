import axios from "axios";
import {BLSZipCodeRequest, CensusZipCodeRequest} from "../shared/types/types";


const census_api_key = process.env.REACT_APP_CENSUS_API_KEY;
const bls_api_key = process.env.REACT_APP_BLS_API_KEY;


export class CensusZipCodeInfo implements CensusZipCodeRequest {
    zipcode: string;
    state: string;
    api_key: string;
    base_url: string;
    api_url: string;
    url: string;

    constructor(zipcode: string) {
        this.zipcode = zipcode;
        this.state = "";
        // @ts-ignore
        this.api_key = census_api_key;
        this.base_url = "https://api.census.gov/data/";
        this.api_url = "2021/acs/acs5/profile";
        this.url = `${this.base_url}${this.api_url}`;
    }

    async get_median_household_income() {
        const params = {
            get: "DP03_0062E",
            for: `zip code tabulation area:${this.zipcode}`,
            key: this.api_key,
        };


        const response = await axios.get(this.url, {params});
        console.log(response.request.responseURL);
        const data = response.data;
        if (response.data === undefined || response.data[0] === undefined) {
            return {"Median Household Income": 0};
        }
        const median_income = parseInt(data[1][0]);
        return {"Median Household Income": median_income};
    }

    async get_population() {
        const params = {
            get: "DP05_0001E",
            for: `zip code tabulation area:${this.zipcode}`,
            key: this.api_key,

        };
        const response = await axios.get(this.url, {params});
        console.log(response.request.responseURL);
        const data = response.data;

        if (response.data === undefined || response.data[0] === undefined) {
            return {Population: 0};
        }

        const population = parseInt(data[1][0]) || 0;
        return {Population: population};
    }

    async get_home_expenditures() {
        const params = {
            get: "B25127",
            for: `zip code tabulation area:${this.zipcode}`,
            key: this.api_key,

        };
        const response = await axios.get(this.url, {params});
        console.log(response.request.responseURL);
        const data = response.data;
        const homeExpenditures = parseInt(data[1][0]);
        return {homeExpenditures: homeExpenditures};
    }

    async get_median_age() {
        const params = {
            get: "DP05_0018E",
            for: `zip code tabulation area:${this.zipcode}`,
            key: this.api_key,
        };
        const response = await axios.get(this.url, {params});
        console.log(response.request.responseURL);
        const data = response.data;
        if (response.data === undefined || response.data[0] === undefined) {
            return {"Median Age": 0};
        } else {
            const median_age = parseInt(data[1][0]);
            return {"Median Age": median_age};
        }
    }

    async get_average_home_value() {
        const params = {
            get: "DP04_0089E",
            for: `zip code tabulation area:${this.zipcode}`,
            key: this.api_key,
        };
        const response = await axios.get(this.url, {params});
        console.log(response.request.responseURL);
        const data = response.data;
        if (response.data === undefined || response.data[0] === undefined) {
            return {"Average Home Value": 0};
        }
        const avg_home_value = parseInt(data[1][0]);
        return {"Average Home Value": avg_home_value};
    }

    async get_zipcode_info() {
        const params = {
            get: "DP03_0062E,DP03_0052E,DP04_0089E",
            for: `zip code tabulation area:${this.zipcode}`,
            key: this.api_key,
        };
        const response = await axios.get(this.url, {params});
        const data = response.data;
        const population = parseInt(data[1][0])
        const median_income = parseInt(data[1][1]);
        const avg_home_value = parseInt(data[1][2]);
        const median_age = parseInt(data[1][3]);
        return {
            "Population": population,
            "Median Household Income": median_income,
            "Average home value": avg_home_value,
            "Median Age": median_age,
        };
    }
}

export class BLSZipCodeInfo implements BLSZipCodeRequest {
    zipcode: string;
    state: string;
    api_key: string;
    base_url: string;
    api_url: string;
    url: string;

    constructor(zipcode: string) {
        this.zipcode = zipcode;
        this.state = "";
        // @ts-ignore
        // this.api_key = bls_api_key;
        this.api_key = census_api_key;
        // this.base_url = "https://api.bls.gov/publicAPI/v2/timeseries/data/";
        // this.api_url = "LAUCN040010000000005";
        this.base_url = "https://api.census.gov/data/";
        this.api_url = "2021/acs/acs5/profile";
        this.url = `${this.base_url}${this.api_url}`;
        console.log(Promise.resolve(this.get_average_spent_on_home()))
        // try {this.get_average_spent_on_home()} catch (e) {console.log(e)}
    }

    async get_average_spent_on_home() {
        const params = {
            get: "DP03_0062E",
            for: `zip code tabulation area:${this.zipcode}`,
            key: this.api_key,
            // annualaverage: true
        };
        const response = await axios.get(this.url, {params});

        const myUrl = axios.create({
            baseURL: this.url,
            params: params
        })

        console.log(myUrl.getUri())
        // console.log("URL", response);
        const data = await response.data;
        console.log(data)
        // get the value from the data whose periodName is Annual
        const annual_values = data[1].filter((d: { periodName: string; }) => d.periodName === "Annual");
        // get the first element of the annual_values array
        console.log(annual_values)
        const annual_value = annual_values[0];

        // const average_spent_on_home = parseInt(data[1][0]);
        return {"Average Spent On Home": annual_value};
    }
}

