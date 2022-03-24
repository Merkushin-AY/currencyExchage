import {currencies, commissions} from './static.js';


function getRandomInt (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}


function generateCurrenciesPairs () {
    const pairs = [];

    currencies.forEach((baseCurrency, baseIndex) => {
        currencies.forEach((quoteCurrency, quoteIndex) => {
            if (baseIndex === quoteIndex) return false;
            let commissionIndex = getRandomInt(0, commissions.length - 1);
            pairs.push({
                base_currency: baseCurrency,
                quote_currency: quoteCurrency,
                commission: commissions[commissionIndex],
            });
        })
    })

    return pairs;
}


function generateExchangeRates (pairs) {
    const rates = [];
    const oppositeRates = {};
    pairs.forEach((pair) => {
        let pairName = `${pair.base_currency}/${pair.quote_currency}`;
        let rateValue;

        if (oppositeRates[pairName]) {
            rateValue = oppositeRates[pairName];
        } else {
            let oppositeName = `${pair.quote_currency}/${pair.base_currency}`;
            rateValue = getRandomInt(10, 100);
            oppositeRates[oppositeName] = parseFloat((1 / rateValue).toFixed(4));
        }

        rates.push({
            pair: pairName,
            rate: rateValue,
        });
    });

    return rates;

}

export {
    generateCurrenciesPairs,
    generateExchangeRates
}
