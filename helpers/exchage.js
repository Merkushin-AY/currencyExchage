export default {
    parseMoney(value) {
        if (value < 0 || !value) value = 0;
        return (+value).toFixed(2);
    },
    getPairName(base, quote) {
        return `${base}/${quote}`;
    }
};