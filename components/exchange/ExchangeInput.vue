<template>
    <div class="exchangeInput">
        <p v-if="label" class="exchangeInput_label">
            {{ label }}
        </p>
        <div class="exchangeInput_main">
            <BaseInput
                :value="value"
                mask="9{1,10}[.99]"
                @input="$emit('input', $event)"
            />
            <ClientOnly>
                <VSelect
                    class="exchangeInput_select"
                    :value="selectedCurrency"
                    @input="$emit('change:currency', $event)"
                    :options="currencies"
                    :clearable="false"
                    :filterable="false"
                    :searchable="false"
                />
            </ClientOnly>
        </div>
    </div>
</template>

<script>
    /**
     * Компонент выводит input и select для выбора валюты и ввода значения
     */
    export default {
        name: 'ExchangeInput',
        model: {
            prop: 'value',
            event: 'input',
        },
        props: {
            value: {
                type: String,
                default: '',
            },
            label: {
                type: String,
                default: '',
            },
            currencies: {
                type: Array,
                required: true,
            },
            selectedCurrency: {
                type: String,
                default: '',
            },
        },
    };
</script>

<style lang="scss">
    .exchangeInput {
        &_label {
            font-weight: 700;
            margin-bottom: 8px;
        }
        &_main {
            display: flex;
        }
        &_select {
            margin-left: 8px;
            .vs__selected {
                position: initial!important;
                color: $textColor;
            }
            .vs__dropdown-toggle {
                border-radius: 8px;
                border: 1px solid $borderColor;
            }
            .vs__open-indicator {
                fill: $textColor;
            }
            .vs__dropdown-menu {
                width: 100%;
                min-width: auto;
                padding: 0;
                background: $blockGradient;
                @include customScroll;
            }
            .vs__dropdown-option {
                width: auto;
                padding: 8px 16px;
                transition: 0.2s text-shadow;

                &--highlight {
                    background: none!important;
                    text-shadow: $textColor 0 0 4px;
                }
            }
        }
    }
</style>