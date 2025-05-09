<template>
  <section class="my-home">
    <!-- Description card -->
    <div id="description" class="row">
      <div class="col-md-8 offset-md-2 col-10 offset-1 d-flex flex-column align-items-center mt-3">
        <div class="px-5 text-center">
          Check <span class="text-green">GitHub API</span> and pull
          <span class="text-green">trending repositories</span>.
        </div>
        <div id="logos">
          <img src="/img/GitHub_logo.png" alt="GitHub logo" title="GitHub logo" />
          <img src="/img/Python_logo.png" alt="Python logo" title="Python logo" />
          <img src="/img/JavaScript_logo.png" alt="JavaScript logo" title="JavaScript logo" />
          <img src="/img/Ruby_logo.png" alt="Ruby logo" title="Ruby logo" />
        </div>
        <div id="descriptionCard" class="border border-2 rounded rounded-3 shadow p-3">
          <h3 class="text-center mb-3">App <span class="text-green">description</span></h3>
          <ol>
            <li>What is trending repositories?</li>
            <span class="text-small">First &#128175; repositories with the highest &#127775;&#127775;&#127775;</span>
            <li>What kind of repositories are used to be pulled?</li>
            <span class="text-small">Repositories based on **JavaScript, Typescript Ruby or Python**</span>
            <li>Does the auto synchronization implemented in the service?</li>
            <span class="text-small">&#9989;</span>
            <li>What is auto synchronization interval ?</li>
            <span class="text-small">
              <b>By default</b> interval of <b>auto synchronization</b> with GitHub api =
              <b>{{ autoSyncRemainingTime }} sec</b>. <br />Changeable with envs:
              <code>VITE_AUTO_SYNC_REMAINING=</code>
            </span>
            <li>Is it possible to manually pull repositories of chosen language?</li>
            <span class="text-small">&#9989;</span>
            <li>Is it possible to stop/start auto synchronization?</li>
            <span class="text-small">&#9989;</span>
          </ol>
          <div class="d-flex justify-content-end">
            <span>Enjoy the service! &#128515; &#128521; &#128578;</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Scroll arrows -->
    <div id="scroll" class="row">
      <div class="col-12 d-flex justify-content-center align-items-center d-sm-block d-none">
        <div id="scrollDownBtn" @click="scrollDown">
          <img src="/img/Arrow_down.png" alt="Scroll down" title="Scroll down" />
          <img src="/img/Arrow_down.png" alt="Scroll down" title="Scroll down" />
        </div>
      </div>
    </div>
    <!-- Content -->
    <div id="content" class="row mt-3">
      <hr style="width: 50%; margin-left: 25%" />
      <!-- Side control panel -->
      <div class="col-md-4 offset-md-0 col-10 offset-1 d-flex flex-column align-items-center justify-content-start">
        <div class="sideControlBox shadow-sm p-3 mb-3">
          <div class="text-center mb-3 me-md-0 me-3">
            <span class="text-center text-small">
              {{ autoSyncStatus ? "&#128994;" : "&#128308;" }} Auto synchronization is
              <b :class="{ 'text-green': autoSyncStatus, 'text-danger': !autoSyncStatus }">
                {{ autoSyncStatus ? "enabled" : "disabled" }}</b
              >
            </span>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-outline-green-custom btn-sm me-1" @click="startAutoSync">Enable</button>
            <button class="btn btn-outline-danger btn-sm" @click="stopAutoSync">Disable</button>
          </div>
        </div>
      </div>
      <!-- Content block -->
      <div class="col-md-8 offset-md-0 col-10 offset-1 shadow-sm p-3">
        <transition name="fade" mode="out-in">
          <component :is="activeComponent" />
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import animationScrollDownArrows from "#/mixins/animationScrollDownArrows.js";
import animationDescriptionCardLogos from "#/mixins/animationDescriptionCardLogos.js";

export default {
  name: "Home",
  mixins: [animationScrollDownArrows, animationDescriptionCardLogos],
  data() {
    return {
      autoSyncRemainingTime: import.meta.env.VITE_AUTO_SYNC_REMAINING,
    };
  },
  computed: {
    ...mapState({
      autoSyncStatus: (state) => state.synchronization.autoSyncStatus,
    }),
  },
  mounted() {
    const scroll = document.getElementById("scroll");

    this.getAutoSyncStatus();
    document.addEventListener("scroll", () => {
      if (scroll && !scroll.hidden && window.scrollY > 200) {
        scroll.hidden = true;
      }
      if (scroll && scroll.hidden && window.scrollY < 200) {
        scroll.removeAttribute("hidden");
      }
    });
  },
  unmounted() {
    const scroll = document.getElementById("scroll");

    document.removeEventListener("scroll", () => {
      if (scroll && !scroll.hidden && window.scrollY > 200) {
        scroll.hidden = true;
      }
      if (scroll && scroll.hidden && window.scrollY < 200) {
        scroll.removeAttribute("hidden");
      }
    });
  },
  methods: {
    ...mapActions({
      getAutoSyncStatus: "synchronization/getAutoSyncStatus",
    }),
    scrollDown() {
      document.getElementById("content").scrollIntoView({
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
