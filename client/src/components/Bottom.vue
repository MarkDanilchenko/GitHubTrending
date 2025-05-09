<template>
  <section class="my-bottom">
    <div class="row">
      <footer class="col-12 mt-3">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link px-2" title="Preview page" alt="Preview page"
              ><b>Preview</b></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link px-2" title="Scroll to top" alt="Scroll to top" @click="scrollToTop"
              >&#9650; <b>Up</b></router-link
            >
          </li>
        </ul>
        <hr class="my-1 offset-3" style="width: 50%" />
        <p class="text-center text-body-secondary pb-4">2024 MyHomeworks, &#123; &#125;</p>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  name: "Bottom",
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped></style>
