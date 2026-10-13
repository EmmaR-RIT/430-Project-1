// Div that holds the output text
const outputText = document.querySelector('#outputText');


// Get header data out of the response, display it
// and pass the response json on if it has it
const handleResponse = (res) => {
    const headers = Object.fromEntries(res.headers);
    outputText.innerHTML = `<p><strong>status: </strong>${res.status} ${res.statusText}</p>
        ${Object.keys(headers).map(h => `<p><strong>${h}: </strong>${headers[h]}</p>`).join('')}`;
    if(res.body) return res.json();
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
    const url = encodeURI(`${getCurrenciesForm.action}${urlParams.length > 0 ? '?' : ''}${urlParams.map(p => p.join('=')).join('&')}`);
    const params = {
        method: getCurrenciesForm.querySelector('#getCountriesInAreaRequestType').value,
        headers: { 'Accept': 'application/json' }
    }

    // fetch and handle
    fetch(url, params).then(handleResponse).then(displayJSON);
    return false;
}