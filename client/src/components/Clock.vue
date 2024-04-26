<template>
    <section class="my-clock">
        <div class="custom-timer">{{ currentTime }}</div>
    </section>
</template>

<script>
export default {
    name: 'Clock',
    data() {
        return {
            currentTime: null
        }
    },
    mounted() {
        this.timer();
    },
    beforeUnmount() {
        clearTimeout(this.timer);
    },
    methods: {
        timer() {
            this.currentTime = new Date().toLocaleTimeString();
            setTimeout(this.timer, 1000);
        }
    }
}
</script>

<style scoped lang="scss"></style>