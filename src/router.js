const fs = require('fs');
const db = require('./database.js');


// Table for routes
const routes = {
    //======================
    //      GET Routes
    //======================

    // Static pages
    '/': {
        path: 'index.html',
        method: 'GET',
        type: 'text/html'
    },
    '/documentation': {
        path: 'docs.html',
        method: 'GET',
        type: 'text/html'
    },
    '/reset.css': {
        path: 'reset.css',
        method: 'GET',
        type: 'text/css'
    },
    '/styles.css': {
        path: 'styles.css',
        method: 'GET',
        type: 'text/css'
    },
    '/bundle.js': {
        path: 'reset.css',
        method: 'GET',
        type: 'text/javascript'
    },

    // API requests
    '/getCountries': {
        dbHandler: db.getCountries,
        method: 'GET',
        type: 'application/json'
    },
    '/getCapitals': {
        dbHandler: db.getCapitals,
        method: 'GET',
        type: 'application/json'
    },
    '/getCurrencies': {
        dbHandler: db.getCurrencies,
        method: 'GET',
        type: 'application/json'
    },
    '/getCountriesInArea': {
        dbHandler: db.getCountriesInArea,
        method: 'GET',
        type: 'application/json'
    },

    //=======================
    //      POST Routes
    //=======================

    '/addCountry': {
        dbHandler: db.addCountry,
        method: 'POST',
        type: 'application/json'
    },
    '/replaceCountryData': {
        dbHandler: db.replaceCountryData,
        method: 'POST',
        type: 'application/json'
    },

    //========================
    //      Error Routes
    //========================
    400: {
        content: {
            message: 'A bad request was made. ',
            id: 'badRequest'
        },
        type: 'application/json'
    },
    404: {
        content: {
            message: 'This page does not exist. Make sure you are entering the correct url. ',
            id: 'notFound'
        },
        type: 'application/json'
    },
    500: {
        content: {
            message: 'An internal server error has occurred. ',
            id: 'internal'
        },
        type: 'application/json'
    }
}


// General purpose (o7) function to serve content
const serve = (req, res, status, type, content) => {
    res.writeHead(status, {
        'Content-Type': type,
        'Content-Length': Buffer.byteLength(content, 'utf8')
    });
    if (req.method !== 'HEAD') res.write(content);
    res.end();
}


// Handle a GET request
const get = (req, res, path) => {
    // Find requested route
    const reqRoute = routes[path]
    // 404 if route doesnt exits
    if (!reqRoute) return respondError(req, res, { code: 404 });
    // If static route, load and serve file
    if (reqRoute.path) {
        // Load and handle file
        fs.readFile(`${__dirname}/../public${reqRoute.path}`, (err, file) => {
            // Handle internal errors
            if (err) {
                return respondError(req, res, {
                    message: 'File failed to load',
                    code: 500
                });
            }
            // Return requested file
            return serve(req, res, 200, reqRoute.type, file);
        });
    }
    // If API request, load and serve data from the database
    const queryData = JSON.stringify(reqRoute.dbHandler(req.query));
    return serve(req, res, 200, reqRoute.type, queryData);
}


// Handle a POST request
const post = (req, res, path) => {
    // Find requested route
    const reqRoute = routes[path]
    // 404 if route doesnt exits
    if (!reqRoute) return respondError(req, res, { code: 404 });
    // Send POST request body to database
    // dbHandler will return the status code to respond with
    const dbCode = reqRoute.dbHandler(req.body);
    // Return proper code after data processed
    switch (dbCode.code) {
        case 201:
            return serve(req, res, 201, reqRoute.type, JSON.stringify({ message: 'Successfully added to database.' }));
        case 204:
            return serve(req, res, 204, reqRoute.type, JSON.stringify({}));
        // Handle errors
        default: {
            const errorRoute = routes[dbCode];
            if (!errorRoute) return respondError(req, res, { code: 500, message: 'Database returned unknown error.' });
            else return respondError(req, res, { code: dbCode.code, message: `An error occurred in the database: ${dbCode.message}` });
        }
    }
}


// Handle sending an error response
const respondError = (req, res, errorData) => {
    // Get error route data
    const errorRoute = routes[errorData.code];
    // Add additional messaging
    let errorMessage = errorRoute.content.message
    if (errorData.message) errorMessage += errorData.message
    // Serve error response
    return serve(req, res, errorData.code, errorRoute.type, JSON.stringify({
        message: errorMessage,
        id: errorRoute.content.id
    }));
}


module.exports = {
    get,
    post,
    respondError
}