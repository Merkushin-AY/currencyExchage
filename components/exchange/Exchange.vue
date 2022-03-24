<template>
    <div class="exchange">
        <div class="exchange_block">
            <h3 class="exchange_blockTitle">
                Exchange
            </h3>
            <div class="exchange_separator"></div>
            <ExchangeInput
                class="exchange_input"
                label="You pay"
                :value="values[0]"
                @input="changeValue(0, $event)"
                :currencies="baseCurrencies"
                :selectedCurrency="currencies[0]"
                @change:currency="changeCurrency(0, $event)"
            />
            <ExchangeInput
                class="exchange_input"
                label="You get"
                :value="values[1]"
                @input="changeValue(1, $event)"
                :currencies="currentQuoteCurrencies"
                :selectedCurrency="currencies[1]"
                @change:currency="changeCurrency(1, $event)"
            />
            <div class="exchange_info">
                <p>Rate: {{currentRate}}</p>
                <p>Commission: {{currentCommission}}</p>
            </div>
            <div class="exchange_separator"></div>
            <div class="exchange_buttonContainer">
                <BaseButton @click="submitExchange">
                    Exchange
                </BaseButton>
                <p v-if="errorText" class="exchange_error">
                    {{ errorText }}
                </p>
            </div>
        </div>
        <BaseModal
            id="successExchange"
        >
            <div class="exchange_success">
                Success exchange
            </div>
        </BaseModal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import exchangeHelper from '~/helpers/exchage'


    /**
     * Компонент для обмена валют
     * Получает данные из стора
     */
    export default {
        name: 'Exchange',
        data: () => ({
            values: ['0.00', '0.00'],
            currencies: ['', ''],
            errorText: '',
        }),
        computed: {
            ...mapState('exchange', {
                baseCurrencies: 'currencies',
                pairs: 'pairs',
            }),
            currentQuoteCurrencies() {
                let result = [];
                for (const pairName in this.pairs) {
                    const pair = this.pairs[pairName];
                    if (pair.base_currency === this.currencies[0]) {
                        result.push(pair.quote_currency);
                    } else if (result.length) {
                        break; // предполагается, что объект с парами всегда отсортирован
                    }
                }
                return result;
            },
            currentPairName() {
                return exchangeHelper.getPairName(this.currencies[0], this.currencies[1]);
            },
            currentPair() {
                return this.pairs[this.currentPairName];
            },
            currentRate() {
                return this.currentPair?.rate || 0;
            },
            currentCommission() {
                return this.currentPair?.commission || 0;
            },
        },
        beforeMount() {
            this.currencies[0] = this.baseCurrencies[0];
            this.currencies[1] = this.currentQuoteCurrencies[0];
            this.$watch('currentRate', () => {
                this.calcQuoteValue();
            });
        },
        methods: {

            /**
             * Меняем базовое или котируемое значение, обновляем зависимости
             * @param {(0 | 1)} type - тип значения 0 - базовое, 1 - котируемое
             * @param value
             */
            changeValue(type, value) {
                this.$set(this.values, type, value);
                if (type) {
                    this.calcBaseValue();
                } else {
                    this.calcQuoteValue();
                }
            },
            /**
             * Меняем базовую или котируемую валюты, обновляем зависимости
             * @param {( 0 | 1 )} type - тип валюты 0 - базовая, 1 - котируемая
             * @param value
             */
            changeCurrency(type, value) {
                // если выбранная валюта такая же как и противоположная, то меняем их местами.
                // если предполагается, что не у каждой валюты есть противоположная пара, то тут надо будет добавить проверку
                if (value === this.currencies[+!type]) this.$set(this.currencies, +!type, this.currencies[type]);
                this.$set(this.currencies, type, value);

                // Если для новой базовой валюты не существует пары с уже выбранной ранее котируемой валютой, то меняем котируемую на первую доступную для базовой
                if (type === 0 && !this.currentQuoteCurrencies.includes(this.currencies[1])) {
                    this.$set(this.currencies, 1, this.currentQuoteCurrencies[0]);
                }

                this.calcQuoteValue();
            },
            calcBaseValue() {
                let res = exchangeHelper.parseMoney((+this.values[1] + +this.currentCommission) / +this.currentRate);
                this.$set(this.values, 0, res);
            },
            calcQuoteValue() {
                let res = exchangeHelper.parseMoney(+this.values[0] * +this.currentRate - +this.currentCommission);
                this.$set(this.values, 1, res);
            },
            submitExchange() {
                if (!this.validate()) return false;
                this.$root.$emit('openModal', 'successExchange');
            },
            validate() {
                if (!+this.values[0] || !+this.values[0] || +this.values[0] <= 0 || +this.values[1] <= 0) {
                    this.errorText = 'Values are not valid';
                    return false;
                }
                this.errorText = '';
                return true;
            },
        },
    };
</script>

<style lang="scss">
    .exchange {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 32px;
        gap: 24px;

        &_block {
            display: flex;
            flex-flow: column nowrap;
            padding: 32px;
            border: 2px solid $accentBorderColor;
            border-radius: 14px;
            background: $blockGradient;
        }

        &_blockTitle {
            width: 100%;
            margin-bottom: 0;
            text-align: center;
        }

        &_separator {
            width: 100%;
            height: 2px;
            margin-top: 16px;
            background: $separatorGradient;
        }

        &_input {
            margin-top: 16px;
        }

        &_info {
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
            margin-top: 16px;
        }

        &_buttonContainer {
            display: flex;
            flex-flow: column;
            justify-content: center;
            margin-top: 16px;
        }

        &_success {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-size: 30px;
            text-align: center;
            text-transform: uppercase;
        }

        &_error {
            width: 100%;
            text-align: center;
            margin-top: 8px;
            margin-bottom: 0;
            color: $error;
        }
    }

</style>