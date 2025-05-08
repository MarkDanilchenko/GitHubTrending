<template>
  <div class="container">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Bottom v-if="$route.path !== '/'" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Bottom from "#/components/Bottom.vue";
import Navbar from "#/components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar, Bottom },
  data() {
    return {
      colorMode: localStorage.getItem("colorMode"),
    };
  },
  beforeMount() {
    if (!this.colorMode) {
      localStorage.setItem("colorMode", "light");
      document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "light");
      this.setColorMode("light");
    } else {
      document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", this.colorMode);
      this.setColorMode(this.colorMode);
    }
  },
  methods: {
    ...mapMutations({
      setColorMode: "setColorMode",
    }),
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
