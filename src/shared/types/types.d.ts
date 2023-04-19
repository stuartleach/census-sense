export interface SearchResult {
    searchTerm: string; // zip code
    population: number;
    medianHouseholdIncome: number;
    medianAge: number;
    averageHomeValue: number;
    averageSpentOnHome?: number;
    latitude?: number;
    longitude?: number;
}

export interface Props {
    searchTerm: string;
    setSearchTerm: any;
    searchResults: SearchResult[];
    setSearchResults: Function;
    handleSubmit: Function;
    numberWithCommas: Function;
}

export interface CensusZipCodeRequest {
    zipcode: string;
    state: string;
    api_key: string;
    base_url: string;
    api_url: string;
    url: string;

    get_median_household_income(): Promise<{ "Median Household Income": number }>;

    get_population(): Promise<{ Population: number }>;

    get_zipcode_info(): Promise<{
        Population: number;
        "Median Household Income": number;
        "Average home value": number;
    }>;

    get_median_age(): Promise<{ "Median Age": number }>;

    get_average_home_value(): Promise<{ "Average Home Value": number }>;


}

export interface BLSZipCodeRequest {
    zipcode: string;
    state: string;
    api_key: string;
    base_url: string;
    api_url: string;
    url: string;

    get_average_spent_on_home(): Promise<{ "Average Spent On Home": number }>;
}