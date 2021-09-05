const cron = require('node-cron');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const MESSENTE_USERNAME = '';
const MESSENTE_PASSWORD = '';

const GMAIL_RECEPIENT = '';
const MESSENTE_RECEPIENT = '';

const API_LINK = '';

const GMAIL_CREDENTIALS = {
    user: '',
    pass: ''
};

cron.schedule('5 * 8-21 * * *', () => {
    fetchProductList()
});

function sendMail(text) {
    log('Sending Mail')
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            ...GMAIL_CREDENTIALS
        }
    });

    transporter.sendMail(
        {
            from: GMAIL_CREDENTIALS.user,
            to: GMAIL_RECEPIENT,
            subject: 'PS5 Laos',
            text,
            priority: 'high'
        },
        (err, info) => {
            if (err) {
                log(err);
            } else {
                log('Email sent: ' + info.response);
            }
        }
    );
}

async function sendSms(text) {
    log('Sending SMS')
    const baseURL = 'https://api2.messente.com/send_sms/?';

    const params = {
        username: MESSENTE_USERNAME,
        password: MESSENTE_PASSWORD,

        to: MESSENTE_RECEPIENT,
        text,
    };

    const queryString = Object.keys(params)
        .map((key) => {
            return `${key}=${encodeURIComponent(params[key])}`;
        })
        .join('&');

    const url = `${baseURL}${queryString}`;

    const response = await fetch(url);
    const responseText = await response.text();

    console.log(response.status, response.statusText, responseText);
}

async function notify(text) {
    sendMail(text);
    await sendSms(text);
}

function getDateTimeTag() {
    let now = Date.now();
    let date = new Date(now);

    return (`[${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}] - `);
}

async function handleResponse(productsPromise) {
   log('Product list received. Attempting to find matches')
    let products = await productsPromise.json();

    products.forEach(p => {
        if (/PlayStation\s?5|PS\s?5/gi.test(p.name) || /PlayStation\s?5|PS\s?5/gi.test(p.displayName)) {
            let link = 'https://pood.telia.ee' + p.url + '';
            log('Found a match: ' + JSON.stringify({name: p.name, url: link}))
            notify(`PS5 Laos, link: ${link}`)
        }
    })
}

async function fetchProductList() {
    log('Fetching data')
    fetch(API_LINK).then(result => handleResponse(result));
}

function log(text) {
    console.log(getDateTimeTag() + text);
}

