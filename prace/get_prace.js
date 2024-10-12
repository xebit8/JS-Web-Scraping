"use strict";


const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const base_url = "https://www.prace.cz/nabidky/";

const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
];
const ua = userAgents[Math.floor(Math.random() * userAgents.length)];
const headers = {
    "User-agent": ua,
};

(async function getPraceInfo()
{
    try
    {
        let response = await axios.get(base_url, {headers}).then(({ data }) => { return data; });
        console.log(response);

        const $ = cheerio.load(response.data);

        const vacTitle = $(".half-standalone").text();
        const vacEmployer = $(".search-result__advert__box__item--company").text();
        const vacCity = $(".search-result__advert__box__item--location").text();
        const vacIncome = $(".search-result__advert__box__item--salary").text();
        const vacEmploymentType = $(".search-result__advert__box__item--employment-type");

    } catch(error)
    {
        console.error(error);
    }
})();