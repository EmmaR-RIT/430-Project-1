// Div that holds the output text
const outputText = document.querySelector('#outputText');


// Get header data out of the response, display it
// and pass the response json on if it has it
const handleResponse = (res) => {
    const headers = Object.fromEntries(res.headers);
    outputText.innerHTML = `<p><strong>status: </strong>${res.status} ${res.statusText}</p>
        ${Object.keys(headers).map(h => `<p><strong>${h}: </strong>${headers[h]}</p>`).join('')}`;
    if (res.body) return res.json();
    return false;
}


// Display response json data
const displayJSON = (json) => {
    if (json) outputText.innerHTML += `${json.map(c => `<p>${JSON.stringify(c)}</p>`).join('')}`;
}


// Form submission for /getCountries
const getCountriesForm = document.querySelector('#getCountriesForm');
getCountriesForm.onsubmit = (e) => {
    // Prevent default form behavior
    e.preventDefault();

    // Parse form parameters
    let urlParams = [];
    urlParams.push(['name', getCountriesForm.querySelector('#getCountriesName').value]);
    urlParams.push(['region', getCountriesForm.querySelector('#getCountriesRegion').value]);
    urlParams.push(['subregion', getCountriesForm.querySelector('#getCountriesSubregion').value]);
    urlParams.push(['currency', getCountriesForm.querySelector('#getCountriesCurrency').value]);
    urlParams.push(['timezone', getCountriesForm.querySelector('#getCountriesTimezone').value]);
    urlParams = urlParams.filter((param) => { return (param[1] && param[1] !== 'NULL') });

    // build url and headers
    const url = encodeURI(`${getCountriesForm.action}${urlParams.length > 0 ? '?' : ''}${urlParams.map(p => p.join('=')).join('&')}`);
    const params = {
        method: getCountriesForm.querySelector('#getCountriesRequestType').value,
        headers: { 'Accept': 'application/json' }
    }

    // fetch and handle
    fetch(url, params).then(handleResponse).then(displayJSON);
    return false;
}


// Form submission for /getCapitals
const getCapitalsForm = document.querySelector('#getCapitalsForm');
getCapitalsForm.onsubmit = (e) => {
    // Prevent default form behavior
    e.preventDefault();

    // Parse form parameters
    let urlParams = [];
    urlParams.push(['name', getCapitalsForm.querySelector('#getCapitalsName').value]);
    urlParams.push(['region', getCapitalsForm.querySelector('#getCapitalsRegion').value]);
    urlParams.push(['subregion', getCapitalsForm.querySelector('#getCapitalsSubregion').value]);
    urlParams.push(['currency', getCapitalsForm.querySelector('#getCapitalsCurrency').value]);
    urlParams.push(['timezone', getCapitalsForm.querySelector('#getCapitalsTimezone').value]);
    urlParams = urlParams.filter((param) => { return (param[1] && param[1] !== 'NULL') });

    // build url and headers
    const url = encodeURI(`${getCapitalsForm.action}${urlParams.length > 0 ? '?' : ''}${urlParams.map(p => p.join('=')).join('&')}`);
    const params = {
        method: getCapitalsForm.querySelector('#getCapitalsRequestType').value,
        headers: { 'Accept': 'application/json' }
    }

    // fetch and handle
    fetch(url, params).then(handleResponse).then(displayJSON);
    return false;
}


// Form submission for /getCurrencies
const getCurrenciesForm = document.querySelector('#getCurrenciesForm');
getCurrenciesForm.onsubmit = (e) => {
    // Prevent default form behavior
    e.preventDefault();

    // Parse form parameters
    let urlParams = [];
    urlParams.push(['name', getCurrenciesForm.querySelector('#getCurrenciesName').value]);
    urlParams.push(['region', getCurrenciesForm.querySelector('#getCurrenciesRegion').value]);
    urlParams.push(['subregion', getCurrenciesForm.querySelector('#getCurrenciesSubregion').value]);
    urlParams.push(['currency', getCurrenciesForm.querySelector('#getCurrenciesCurrency').value]);
    urlParams.push(['timezone', getCurrenciesForm.querySelector('#getCurrenciesTimezone').value]);
    urlParams = urlParams.filter((param) => { return (param[1] && param[1] !== 'NULL') });

    // build url and headers
    const url = encodeURI(`${getCurrenciesForm.action}${urlParams.length > 0 ? '?' : ''}${urlParams.map(p => p.join('=')).join('&')}`);
    const params = {
        method: getCurrenciesForm.querySelector('#getCurrenciesRequestType').value,
        headers: { 'Accept': 'application/json' }
    }

    // fetch and handle
    fetch(url, params).then(handleResponse).then(displayJSON);
    return false;
}


// Form submission for /getCountriesInArea
const getCountriesInAreaForm = document.querySelector('#getCountriesInAreaForm');
getCountriesInAreaForm.onsubmit = (e) => {
    // Prevent default form behavior
    e.preventDefault();

    // Parse form parameters
    let urlParams = [];
    urlParams.push(['minLat', getCountriesInAreaForm.querySelector('#getCountriesInAreaMinLat').value]);
    urlParams.push(['maxLat', getCountriesInAreaForm.querySelector('#getCountriesInAreaMaxLat').value]);
    urlParams.push(['minLon', getCountriesInAreaForm.querySelector('#getCountriesInAreaMinLon').value]);
    urlParams.push(['maxLon', getCountriesInAreaForm.querySelector('#getCountriesInAreaMaxLon').value]);
    urlParams = urlParams.filter((param) => { return (param[1] && param[1] !== 'NULL') });

    // build url and headers
    const url = encodeURI(`${getCountriesInAreaForm.action}${urlParams.length > 0 ? '?' : ''}${urlParams.map(p => p.join('=')).join('&')}`);
    const params = {
        method: getCountriesInAreaForm.querySelector('#getCountriesInAreaRequestType').value,
        headers: { 'Accept': 'application/json' }
    }

    // fetch and handle
    fetch(url, params).then(handleResponse).then(displayJSON);
    return false;
}


// Form submission for /addCountry
const addCountryForm = document.querySelector('#addCountryForm');
addCountryForm.onsubmit = (e) => {
    // Prevent default form behavior
    e.preventDefault();

    // Get data type
    const dataType = addCountryForm.querySelector('#addCountryMIMEType').value;

    // Build body data with the correct type
    let bodyData;
    if (dataType === 'json') {
        bodyData = JSON.stringify({
            name: addCountryForm.querySelector('#addCountryName').value || undefined,
            capital: addCountryForm.querySelector('#addCountryCapital').value || undefined,
            currency: addCountryForm.querySelector('#addCountryCurrency').value || undefined,
            currencyName: addCountryForm.querySelector('#addCountryCurrencyName').value || undefined,
            currencySymbol: addCountryForm.querySelector('#addCountryCurrencySymbol').value || undefined,
            region: addCountryForm.querySelector('#addCountryRegion').value || undefined,
            subregion: addCountryForm.querySelector('#addCountrySubregion').value || undefined,
            nationality: addCountryForm.querySelector('#addCountryNationality').value || undefined,
            latitude: addCountryForm.querySelector('#addCountryLatitude').value || undefined,
            longitude: addCountryForm.querySelector('#addCountryLongitude').value || undefined
        })
    }
    else if (dataType === 'x-www-form-urlencoded') {
        // get all params
        const params = [];
        params.push(['name', addCountryForm.querySelector('#addCountryName').value]);
        params.push(['capital', addCountryForm.querySelector('#addCountryCapital').value]);
        params.push(['currency', addCountryForm.querySelector('#addCountryCurrency').value]);
        params.push(['currencyName', addCountryForm.querySelector('#addCountryCurrencyName').value]);
        params.push(['currencySymbol', addCountryForm.querySelector('#addCountryCurrencySymbol').value]);
        params.push(['region', addCountryForm.querySelector('#addCountryRegion').value]);
        params.push(['subregion', addCountryForm.querySelector('#addCountrySubregion').value]);
        params.push(['nationality', addCountryForm.querySelector('#addCountryNationality').value]);
        params.push(['latitude', addCountryForm.querySelector('#addCountryLatitude').value]);
        params.push(['longitude', addCountryForm.querySelector('#addCountryLongitude').value]);

        // filter and parse params into bodyData
        bodyData = params.filter(p => p[1] && p[1] !== 'NULL').map(p => p.join('=')).join('&');
    }

    // build url and request
    const url = encodeURI(`${addCountryForm.action}`);
    const params = {
        method: addCountryForm.method,
        headers: {
            'Content-Type': `application/${dataType}`,
            'Accept': 'application/json'
        },
        body: bodyData
    }

    // fetch and handle
    fetch(url, params).then(handleResponse).then(displayJSON);
    return false;
}


// Form submission for /replaceCountryData
const replaceCountryDataForm = document.querySelector('#replaceCountryDataForm');
replaceCountryDataForm.onsubmit = (e) => {
    // Prevent default form behavior
    e.preventDefault();

    // Get data type
    const dataType = replaceCountryDataForm.querySelector('#replaceCountryDataMIMEType').value;

    // Build body data with the correct type
    let bodyData;
    if (dataType === 'json') {
        bodyData = JSON.stringify({
            oRegion: replaceCountryDataForm.querySelector('#replaceCountryDataOldRegion').value || undefined,
            nRegion: replaceCountryDataForm.querySelector('#replaceCountryDataNewRegion').value || undefined,
            oSubregion: replaceCountryDataForm.querySelector('#replaceCountryDataOldSubregion').value || undefined,
            nSubregion: replaceCountryDataForm.querySelector('#replaceCountryDataNewSubregion').value || undefined,
            oCurrency: replaceCountryDataForm.querySelector('#replaceCountryDataOldCurrency').value || undefined,
            nCurrency: replaceCountryDataForm.querySelector('#replaceCountryDataNewCurrency').value || undefined,
            oCurrencyName: replaceCountryDataForm.querySelector('#replaceCountryDataOldCurrencyName').value || undefined,
            nCurrencyName: replaceCountryDataForm.querySelector('#replaceCountryDataNewCurrencyName').value || undefined,
            oCurrencySymbol: replaceCountryDataForm.querySelector('#replaceCountryDataOldCurrencySymbol').value || undefined,
            nCurrencySymbol: replaceCountryDataForm.querySelector('#replaceCountryDataNewCurrencySymbol').value || undefined
        })
    }
    else if (dataType === 'x-www-form-urlencoded') {
        // get all params
        const params = [];
        params.push(['oRegion', replaceCountryDataForm.querySelector('#replaceCountryDataOldRegion').value]);
        params.push(['nRegion', replaceCountryDataForm.querySelector('#replaceCountryDataNewRegion').value]);
        params.push(['oSubregion', replaceCountryDataForm.querySelector('#replaceCountryDataOldSubregion').value]);
        params.push(['nSubregion', replaceCountryDataForm.querySelector('#replaceCountryDataNewSubregion').value]);
        params.push(['oCurrency', replaceCountryDataForm.querySelector('#replaceCountryDataOldCurrency').value]);
        params.push(['nCurrency', replaceCountryDataForm.querySelector('#replaceCountryDataNewCurrency').value]);
        params.push(['oCurrencyName', replaceCountryDataForm.querySelector('#replaceCountryDataOldCurrencyName').value]);
        params.push(['nCurrencyName', replaceCountryDataForm.querySelector('#replaceCountryDataNewCurrencyName').value]);
        params.push(['oCurrencySymbol', replaceCountryDataForm.querySelector('#replaceCountryDataOldCurrencySymbol').value]);
        params.push(['nCurrencySymbol', replaceCountryDataForm.querySelector('#replaceCountryDataNewCurrencySymbol').value]);

        // filter and parse params into bodyData
        bodyData = params.filter(p => p[1] && p[1] !== 'NULL').map(p => p.join('=')).join('&');
    }

    // build url and request
    const url = encodeURI(`${replaceCountryDataForm.action}`);
    const params = {
        method: replaceCountryDataForm.method,
        headers: {
            'Content-Type': `application/${dataType}`,
            'Accept': 'application/json'
        },
        body: bodyData
    }

    // fetch and handle
    fetch(url, params).then(handleResponse).then(displayJSON);
    return false;
}