const fs = require('fs');


// Table for routes
const routes = {
    //======================
    //      GET Routes
    //======================

    // Static pages
    '/': {
        path: 'index.html',
        method: 'GET',
        status: 200,
        type: 'text/html'
    },
    '/documentation': {
        path: 'docs.html',
        method: 'GET',
        status: 200,
        type: 'text/html'
    },
    '/reset.css': {
        path: 'reset.css',
        method: 'GET',
        status: 200,
        type: 'text/css'
    },
    '/styles.css': {
        path: 'styles.css',
        method: 'GET',
        status: 200,
        type: 'text/css'
    },
    '/bundle.js': {
        path: 'reset.css',
        method: 'GET',
        status: 200,
        type: 'text/javascript'
    },

    // API requests

    //=======================
    //      POST Routes
    //=======================

    //========================
    //      Error Routes
    //========================
    badRequest: {
        content: {
            message: 'A bad request was made.',
            id: 'badRequest'
        },
        status: 400,
        type: 'application/json'
    },
    notFound: {
        content: {
            message: 'This page does not exist. Make sure you are entering the correct url.',
            id: 'notFound'
        },
        status: 404,
        type: 'application/json'
    },
    internal: {
        content: {
            message: 'An internal server error has occurred.',
            id: 'internal'
        },
        status: 500,
        type: 'application/json'
    }
}

const get = (req, res, url) => {

}

const post = (req, res, url) => {

}


const respondError = (req, res, errorData) => {

}


module.exports = {
    get,
    post,
    respondError
}