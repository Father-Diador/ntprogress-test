<template>
    <select v-model="value" @change="selectValue">
        <option disabled value="">Select application</option>
        <option
            v-for="currency in currencies" 
            :key="currency.id" 
            :value="currency.value"
        >
            {{currency.value}}
        </option>
    </select>
</template>

<script>
export default {
    props: {
        currencies: {
            type: Array,
            required: true,
        },
    },
    methods: {
        selectValue(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    },
}
</script>