<template>
  <section class="my-clock">
    <div class="custom-clock">{{ clock }}</div>
  </section>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      clock: null,
    };
  },
  methods: {
    timer() {
      this.clock = new Date().toLocaleTimeString();
      setTimeout(this.timer, 1000);
    },
  },
  mounted() {
    this.timer();
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="scss" scoped></style>
