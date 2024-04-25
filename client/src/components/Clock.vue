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

<style scoped lang="scss">
@import '@/assets/scss/colors.scss';
.custom-timer {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-shadow: 15px 5px 5px $grey_color;
}
</style>