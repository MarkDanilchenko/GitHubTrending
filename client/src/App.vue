<template>
  <div class="container">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="fadeComponent" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
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
<style scoped lang="scss">
.fadeComponent-enter-active,
.fadeComponent-leave-active {
  transition: opacity .5s ease;
}

.fadeComponent-enter-from,
.fadeComponent-leave-to {
  opacity: 0;
}
</style>