# Countries API - IGME430 Project 1

## GET Routes

### /getCountries

Returns full country objects of every country meeting the given query parameters. If no paramters are given, returns all countries. Valid query parameters are listed later in the documentation.

### /getCapitals

Returns full country objects of every country meeting the given query parameters. If no paramters are given, returns all countries. Valid query parameters are listed later in the documentation.

### /getCurrencies

Returns full country objects of every country meeting the given query parameters. If no paramters are given, returns all countries. Valid query parameters are listed later in the documentation.

### /getCountriesInArea

Returns full country objects of every country within the queried area. Requires 4 query parameters:

- minLat (minimum latitude)
- maxLat (maximum latitude)
- minLon (minimum longitude)
- maxLon (maximum longitude)

## POST Routes

### /addCountry

Add a new country to the database or update an existing country.

To create a new country, you need to upload an object that meets the Country Object structure as listed below.

To update an existing country, you must provide a name of an existing country and any of the data you want to update

### /replaceCountryData

Replace all instances of some data in the database with something else. Useful for renaming things.

## Generic Query Parameters for GET Routes

### name, region, subregion, currency, timezone

#### Valid Regions:

Africa, Americas, Asia, Europe, Oceania, Polar

#### Valid Subregions:

Australia and New Zealand, Caribbean, Central America, Central Asia, Eastern Africa, Eastern Asia, Eastern Europe, Melanesia, Micronesia, Middle Africa, Northern Africa, Northern America, Northern Europe, Polynesia, South America, South-Eastern Asia, Southern Africa, Southern Asia, Southern Europe, Western Africa, Western Asia, Western Europe

#### Valid Currency Codes:

AFN, EUR, ALL, DZD, USD, AOA, XCD, AAD, ARS, AMD, AWG, AUD, AZN, BHD, BDT, BBD, BYN, BZD, XOF, BMD, BTN, BOB, BAM, BWP, NOK, BRL, BND, BGN, BIF, KHR, XAF, CAD, CVE, KYD, CLP, CNY, COP, KMF, NZD, CRC, HRK, CUP, ANG, CZK, CDF, DKK, DJF, DOP, EGP, ERN, SZL, ETB, FKP, FJD, XPF, GEL, GHS, GIP, GTQ, GBP, GNF, GYD, HTG, HNL, HKD, HUF, ISK, INR, IDR, IRR, IQD, ILS, JMD, JPY, JOD, KZT, KES, KWD, KGS, LAK, LBP, LSL, LRD, LYD, CHF, MOP, MGA, MWK, MYR, MVR, MRO, MUR, MXN, MDL, MNT, MAD, MZN, MMK, NAD, NPR, NIO, NGN, KPW, MKD, OMR, PKR, PAB, PGK, PYG, PEN, PHP, PLN, QAR, RON, RUB, RWF, SHP, WST, STD, SAR, RSD, SCR, SLL, SGD, SBD, SOS, ZAR, KRW, SSP, LKR, SDG, SRD, SEK, SYP, TWD, TJS, TZS, THB, BSD, GMD, TOP, TTD, TND, TRY, TMT, UGX, UAH, AED, UYU, UZS, VUV, VES, VND, YER, ZMW, ZWL

### Valid Timezone Codes

UTC+01:00, UTC+02:00, UTC+03:00, UTC+03:30, UTC+04:00, UTC+04:30, UTC+05:00, UTC+05:30, UTC+05:45, UTC+06:00, UTC+06:30, UTC+07:00, UTC+08:00, UTC+08:45, UTC+09:00, UTC+09:30, UTC+10:00, UTC+10:30, UTC+11:00, UTC+12:00, UTC+13:00, UTC+13:45, UTC+14:00, UTC-01:00, UTC-02:00, UTC-03:00, UTC-03:30, UTC-04:00, UTC-05:00, UTC-06:00, UTC-07:00, UTC-08:00, UTC-09:00, UTC-09:30, UTC-10:00, UTC-11:00, UTC±00

## Country Object Structure

```
{
    "name": string,
    "capital": string,
    "finance": {
        "currency": string,
        "currency_name": string,
        "currency_symbol": string
    },
    "region": string,
    "subregion": string,
    "nationality": string,
    "timezones": [
        {
            "zoneName": string,
            "gmtOffset": number,
            "gmtOffsetName": string,
            "abbreviation": string,
            "tzName": string
        }
    ],
    "latitude": number,
    "longitude": number
},
```
