<template>
    <input class="input" :name="name" :type="type" @input="onInput" v-model="realValue" v-mask="mask">
</template>

<script>
    /**
     * Компонент выводит стилизованный html инпут, поддерживает маски
     */
    export default {
        name: 'BaseInput',
        model: {
            prop: 'value',
            event: 'input',
        },
        props: {
            value: {
                type: String,
                default: '',
            },
            name: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'text',
            },
            mask: {
                default: '',
            },
        },
        data: (vm) => ({
            realValue: vm.value,
        }),
        methods: {
            onInput(event) {
                this.$emit('input', event.target.value);
            },
        },
        watch: {
            value(newValue) {
                this.realValue = newValue;
            },
        },
    };
</script>

<style lang="scss">
    .input {
        padding-left: 4px;
        border: 1px solid $borderColor!important;
        border-radius: 8px;
        color: $textColor;
        background: transparent;
        outline: none!important;
    }
</style>