const fetch = require('node-fetch')

handler = async (event) => {

    const teilaResponse = await fetch('https://pood.telia.ee/api/products/mangukonsoolid/list/?clientType=private', {
        method: 'POST',
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json;charset=UTF-8',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15'
        },
        body: JSON.stringify({
            featureFilter: {},
            sliderFilter: {},
            commonFeatureFilter: [],
            tags: [],
            manufacturers: ['Sony'],
            price: { min: 300, max: 1000 },
            offset: 0,
            limit: 5,
            orderBy: 'priceMax', // Possible values: null, priceMax, priceMin, new
        }),
        timeout: 5000
    });

    const body = await teilaResponse.json();
    console.log(body.products);

    return body.products;
};

handler();
