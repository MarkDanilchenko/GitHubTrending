<template>
  <div class="container">
    <!-- header - navbar -->
    <!-- header - navbar -->
    <!-- header - navbar -->
    <Navbar />
    <!-- body -->
    <!-- body -->
    <!-- body -->
    <router-view v-slot="{ Component }">
      <transition name="APP_fadeComponent" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- footer -->
    <!-- footer -->
    <!-- footer -->
    <Footer v-if="$route.path !== '/'" />
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Footer,
    Navbar
  }
}
</script>
<style scoped lang="scss"></style>