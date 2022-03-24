import Vue from 'vue';
import api from '~/api/api';
import exchangeHelper from '~/helpers/exchage';


export const state = () => ({
    currencies: [],
    pairs: {},
});

export const mutations = {
    SET_CURRENCIES_BY_PAIRS(state, value) {
        let result = new Set();
        value.forEach(pair => result.add(pair.base_currency));
        state.currencies = Array.from(result);
    },
    SET_PAIRS(state, value) {
        value.forEach(pair => {
            let name = exchangeHelper.getPairName(pair.base_currency, pair.quote_currency);
            Vue.set(state.pairs, name, pair);
        });
    },
    SET_RATES(state, value) {
        value.forEach(rateObj => {
            if (state.pairs[rateObj.pair]) Vue.set(state.pairs[rateObj.pair], 'rate', rateObj.rate)
        });
    },
};

export const actions = {
    async fetchPairsRates({commit}) {
        const [pairs, rates] = await Promise.all([
            api.get('/exchange/pairs'),
            api.get('/exchange/rates'),
        ]);

        if (pairs) {
            commit('SET_PAIRS', pairs);
            commit('SET_CURRENCIES_BY_PAIRS', pairs);
            if (rates) commit('SET_RATES', rates);
        }
    },

    async fetchPairs({commit}) {
        const result = await api.get('/exchange/pairs');
        if (result) {
            commit('SET_PAIRS', result);
            commit('SET_CURRENCIES_BY_PAIRS', result);
        }
    },

    async fetchRates({commit}) {
        const result = await api.get('/exchange/rates');
        if (result) commit('SET_RATES', result);
    },

    setUpdateRatesInterval({commit, dispatch}, interval = 30000) {
        // для реального проекта лучше сделать на socket.io
        // или хотя бы переписать на рекурсивный таймаут, чтобы новый цикл интервала начинался после выполнения запроса
        // и, если необходимо, сделать отдельный метод для прерывания
        return setInterval(function () {
            dispatch('fetchRates');
        }, interval);
    }
};