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
import colorModeInit from "#/mixins/colorModeInit.js";
import Bottom from "#/components/Bottom.vue";
import Navbar from "#/components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar, Bottom },
  mixins: [colorModeInit],
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
