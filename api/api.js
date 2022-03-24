import {currencies, commissions} from './static.js';
import {generateExchangeRates, generateCurrenciesPairs} from '@/api/generate';

/**
 * Mock api
 */

const pairs = generateCurrenciesPairs();

const api = {
    async get(url) {
        switch (url) {
            case '/exchange/currencies':
                return currencies;
            case '/exchange/pairs':
                return pairs;
            case '/exchange/rates':
                return generateExchangeRates(pairs);
        }
    },
};

export default api;