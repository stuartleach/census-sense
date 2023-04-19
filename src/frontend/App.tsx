import React, {useState} from 'react';
import './styles/App.css';
import listOfZipCodes from '../backend/zipcodeLists/targetZipCodes';
import {CensusZipCodeRequest, Props, SearchResult} from "../shared/types/types";
import axios from "axios";

const SearchBar = (props: Props) => {
    const {searchTerm, setSearchTerm, handleSubmit} = props;
    const onChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div>
            <input type="text" value={searchTerm} onChange={onChange}/>
            <button onClick={() => handleSubmit()}>Search</button>
        </div>
    );
};

function TableRow(props: SearchResult & { numberWithCommas: Function }) {
    return (
        <tr key={props.searchTerm}>
            <td>{props.searchTerm}</td>
            <td>{props.numberWithCommas(props.population)}</td>
            <td>${props.numberWithCommas(props.medianHouseholdIncome)}</td>
            <td>{props.numberWithCommas(props.medianAge)}</td>
            <td>${props.numberWithCommas(props.averageHomeValue)}</td>
        </tr>
    );
}

const SearchResults = (props: Props) => {
    const {searchResults, numberWithCommas, setSearchResults} = props;
    const clearResults = () => {
        setSearchResults([]);
    }
    return (
        <div>
            <button onClick={() => clearResults()}>Clear Results</button>
            <table style={styling.table}>
                <thead style={styling.thead}>
                <tr>
                    <th>Zipcode</th>
                    <th>Population</th>
                    <th>Median Household Income</th>
                    <th>Median Age</th>
                    <th>Average Home Value</th>
                </tr>
                </thead>
                <tbody>

                {searchResults.map((result, k) => (
                    <TableRow key={result.searchTerm} {...result} numberWithCommas={numberWithCommas}/>
                ))}

                </tbody>
            </table>
        </div>
    );
};


const styling = {
    table: {
        margin: '0 auto',
        border: '1px solid black',
        width: '200px',
        padding: '10px',
        marginTop: '10px',
        overflow: 'scroll',
    },
    thead: {
        fontWeight: 'bold',
    },
};

const App = () => {
    const numberWithCommas = (x: number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const [searchTerm, setSearchTerm] = useState(listOfZipCodes[0].toString());
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const getAllZipCodes = async () => {
        for (let i = 0; i < listOfZipCodes.length; i++) {
            const newResult = await getZipCodeInfo(listOfZipCodes[i].toString());
            if (newResult == null) {
                return;
            }
            setSearchResults((prevResults) => prevResults.concat(newResult));
        }
    }


    const getZipCodeInfo = async (searchTerm: string) => {
        const getZipCodeData = async (searchTerm: string) => {
            const response = await axios.get(`http://localhost:3000/api/zipcodes?zipcode=${searchTerm}`)
            console.log(response.request)
            console.log(response.data)
            return response.data;
        }
        try {
            const zipInfo = await getZipCodeData(searchTerm);
            if (zipInfo == null) {
                return null;
            }
            const newResult: SearchResult = {
                searchTerm,
                population: zipInfo.population || 0,
                medianHouseholdIncome: zipInfo.income || 0,
                medianAge: zipInfo.age || 0,
                averageHomeValue: zipInfo.average_home_value || 0,
            }
            return newResult
        } catch (error) {
            console.error('Failed to get zip code info:', error);
        }
    }
    const handleSubmit = async () => {
        const newResult = await getZipCodeInfo(searchTerm);
        if (newResult == null) {
            return;
        }
        setSearchResults((prevResults) => prevResults.concat(newResult));
    };



    const props: Props = {
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        handleSubmit,
        numberWithCommas,
    };

    return (
        <div className="App">
            <button onClick={() => getAllZipCodes()}>Get All Zip Codes</button>
            <SearchBar {...props} />
            <SearchResults {...props} />
        </div>
    )
}


export default App;
