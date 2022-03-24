<template>
    <section>
        <div class="container">
            <Exchange/>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'MainPage',
        async asyncData({ store }) {
            await store.dispatch('exchange/fetchPairsRates')
            if (process.client) await store.dispatch('exchange/setUpdateRatesInterval')
        },
    };
</script>
