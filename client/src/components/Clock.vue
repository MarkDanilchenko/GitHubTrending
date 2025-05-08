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
  mounted() {
    this.timer();
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    timer() {
      this.clock = new Date().toLocaleTimeString();
      setTimeout(this.timer, 1000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
