const db = require('./countries.json');


const objInQueryParams = (query, obj) => {
    if (!query.name || obj.name.includes(query.name))
        if (!query.region || obj.region === query.region)
            if (!query.subregion || obj.subregion === query.subregion)
                if (!query.currency || obj.finance.currency === query.currency)
                    if (!query.timezone)
                        return true
                    else {
                        for (let zone in obj.timezones) {
                            if (zone.gmtOffsetName === query.timezone) {
                                return true
                            }
                        }
                    }
    return false;
}


const getCountries = (query) => {
    const data = [];
    // Check all countries for ones that meet the query parameters
    for (const country in db) {
        // Add country to list of data to return if it meets query parameters
        // JSON parse/stringify is an easy way to deep copy an object
        if (objInQueryParams(query, country)) data.push(JSON.parse(JSON.stringify(country)));
    }
    return data;
}


const getCapitals = (query) => {
    const data = [];
    // Check all countries for ones that meet the query parameters
    for (const country in db) {
        // Add country to list of data to return if it meets query parameters
        // JSON parse/stringify is an easy way to deep copy an object
        if (objInQueryParams(query, country)) data.push({ name: country.name, capital: country.capital });
    }
    return data;
}


const getCurrencies = (query) => {
    const data = [];
    // Check all countries for ones that meet the query parameters
    for (const country in db) {
        // Add country to list of data to return if it meets query parameters
        // JSON parse/stringify is an easy way to deep copy an object
        if (objInQueryParams(query, country)) data.push({ name: country.name, currency: country.finance.currency });
    }
    return data;
}


const getCountriesInArea = (query) => {

}


const addCountry = (body) => {

}


const replaceCountryData = (body) => {

}


module.exports = {
    getCountries,
    getCapitals,
    getCurrencies,
    getCountriesInArea,
    addCountry,
    replaceCountryData
};