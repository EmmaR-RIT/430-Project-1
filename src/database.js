const db = require('./countries.json');


// Check if a country object meets the query parameters
const objInQueryParams = (query, obj) => {
    if (!query.name || obj.name.includes(query.name))
        if (!query.region || obj.region === query.region)
            if (!query.subregion || obj.subregion === query.subregion)
                if (!query.currency || obj.finance.currency === query.currency)
                    if (!query.timezone) return true
                    else {
                        for (let zone in obj.timezones) {
                            if (zone.gmtOffsetName === query.timezone) return true
                        }
                    }
    return false;
}


// Return full country objects that meet query parameters
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


// Return countries and capitals that meet query parameters
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


// Return countries and currencies that meet query parameters
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


// Return full country objects that are in the queried area
const getCountriesInArea = (query) => {
    const data = [];
    // check for all query parameters given
    if (!query.maxLat || !query.minLat || !query.maxLon || !query.minLon) {
        return { code: 400, message: 'Missing query parameters' };
    }
    // Check for countries within area
    for (const country in db) {
        if (country.latitude <= query.maxLat && country.latitude >= query.minLat &&
            country.longitude < query.maxLon && country.longitude > - query.minLon)
            data.push(JSON.parse(JSON.stringify(country)));
    }
    return data;
}



// Add a new country or update an existing country
const addCountry = (body) => {
    // Make body obj in vars
    const {
        name,
        capital,
        finance,
        region,
        subregion,
        nationality,
        timezones,
        latitude,
        longitude } = body;
    const { currency, currencyName, currencySymbol } = finance || body.finance;

    // If country already exists, update data
    for (let country in db) {
        if (name && country.name === name) {
            if (capital && country.capital !== capital) country.capital = capital;
            if (finance) {
                if (currency && country.finance.currency !== currency) country.finance.currency = currency;
                if (currencyName && country.finance.currency_name !== currencyName) country.finance.currency_name = currencyName;
                if (currencySymbol && country.finance.currency_symbol !== currencySymbol) country.finance.currency_symbol = currencySymbol;
            }
            if (region && country.region !== region) country.region = region;
            if (subregion && country.subregion !== subregion) country.subregion = subregion;
            if (nationality && country.nationality !== nationality) country.nationality = nationality;
            if (timezones) {
                for (let tz in country.timezones) {
                    for (const newtz in timezones) {
                        if (tz.zoneName === newtz.zoneName || tz.tzName === newtz.tzName) {
                            if (tz.zoneName === newtz.zoneName && tz.tzName !== newtz.tzName) tz.tzName = newtz.tzName;
                            else if (tz.zoneName !== newtz.zoneName && tz.tzName === newtz.tzName) tz.zoneName = newtz.zoneName;
                            if (newtz.gmtOffset && tz.gmtOffset !== newtz.gmtOffset) tz.gmtOffset = newtz.gmtOffset;
                            if (newtz.gmtOffsetName && tz.gmtOffsetName !== newtz.gmtOffsetName) tz.gmtOffsetName = newtz.gmtOffsetName;
                            if (newtz.abbreviation && tz.abbreviation !== newtz.abbreviation) tz.abbreviation = newtz.abbreviation;
                        }
                    }
                }
            }
            if (latitude && country.latitude !== latitude) country.latitude = latitude;
            if (longitude && country.longitude !== longitude) country.longitude = longitude;
            return { code: 204 }
        }
    }

    // If new country, need to verify data

    // Check for missing parameters
    const missingParams = [];
    if (!name) missingParams.push('Name');
    if (!capital) missingParams.push('Capital');
    if (!finance) missingParams.push('Finance');
    if (!currency) missingParams.push('Finance/Currency');
    if (!currencyName) missingParams.push('Finance/Currency Name');
    if (!currencySymbol) missingParams.push('Finance/Currency Symbol');
    if (!region) missingParams.push('Region');
    if (!subregion) missingParams.push('Subregion');
    if (!nationality) missingParams.push('Nationality');
    if (!timezones) missingParams.push('Timezones');
    if (!latitude) missingParams.push('Latitude');
    if (!longitude) missingParams.push('Longitude');

    // If missing parameters, return error
    if (missingParams.length > 0) return { code: 400, message: `Missing Parameters: ${missingParams.join(', ')}` };

    // Verify submitted timezones
    for (const tz in timezones) {
        if (!tz.zoneName || !tz.gmtOffset || !tz.gmtOffsetName || !tz.abbreviation || !tz.tzName)
            return { code: 400, message: `Timezone ${tz.tzName || tz.zoneName || 'unknown'} is missing parameters.` };
    }

    // Add data to db and update 
    db.push({
        name,
        capital,
        finance,
        region,
        subregion,
        nationality,
        timezones,
        latitude,
        longitude
    });
    return { code: 201 };
}


// Replace all existing instances of some kind of data
const replaceCountryData = (body) => {
    const {
        oRegion,
        nRegion,
        oSubregion,
        nSubregion,
        oCurrency,
        nCurrency,
        oCurrencyName,
        nCurrencyName,
        oCurrencySymbol,
        nCurrencySymbol
    } = body;

    // Check if all replacements have a pair (ie both exist or neither exist)
    const mismatches = [];
    if ((oRegion && !nRegion) || (nRegion && !oRegion)) mismatches.push('Region');
    if ((oSubregion && !nSubregion) || (nSubregion && !oSubregion)) mismatches.push('Subregion');
    if ((oCurrency && !nCurrency) || (nCurrency && !oCurrency)) mismatches.push('Currency');
    if ((oCurrencyName && !nCurrencyName) || (nCurrencyName && !oCurrencyName)) mismatches.push('Currency Name');
    if ((oCurrencySymbol && !nCurrencySymbol) || (nCurrencySymbol && !oCurrencySymbol)) mismatches.push('Currency Symbol');

    if (mismatches.length > 0) return { code: 400, message: `All parameters to change need an old and new: ${mismatches.join(', ')}` };

    // Do replacements
    for (let country in db) {
        if (oRegion && country.region === oRegion) country.region = nRegion;
        if (oSubregion && country.subregion === oSubregion) country.subregion = nSubregion;
        if (oCurrency && country.finance.currency === oCurrency) country.finance.currency = nCurrency;
        if (oCurrencyName && country.finance.currency_name === oCurrencyName) country.finance.currency_name = nCurrencyName;
        if (oCurrencySymbol && country.finance.currency_symbol === oCurrencySymbol) country.finance.currency_symbol = nCurrencySymbol;
    }
    return { code: 204 }
}


module.exports = {
    getCountries,
    getCapitals,
    getCurrencies,
    getCountriesInArea,
    addCountry,
    replaceCountryData
};