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
            <span class="text-small">
              Repositories based on
              <b>
                JavaScript
                <img
                  src="/img/JavaScript_logo.png"
                  width="20"
                  height="20"
                  alt="JavaScript logo"
                  title="JavaScript logo"
                />, Ruby <img src="/img/Ruby_logo.png" width="20" height="20" alt="Ruby logo" title="Ruby logo" /> or
                Python <img src="/img/Python_logo.png" width="20" height="20" alt="Python logo" title="Python logo" />
              </b>
            </span>
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
        <!-- Start/stop/status control block -->
        <div class="sideControlBox shadow-sm p-3 mb-3 border border-1 rounded rounded-3">
          <div class="text-center mb-3 me-md-0 me-3">
            <span class="text-center text-small">
              {{ autoSyncStatus ? "&#128994;" : "&#128308;" }} Auto synchronization is
              <b :class="{ 'text-green': autoSyncStatus, 'text-danger': !autoSyncStatus }">
                {{ autoSyncStatus ? "enabled" : "disabled" }}</b
              >
            </span>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-outline-green-custom btn-sm me-1" @click="autoSyncEnable">Enable</button>
            <button class="btn btn-outline-danger btn-sm" @click="autoSyncDisable">Disable</button>
          </div>
        </div>
        <!-- Manual sync block -->
        <div class="sideControlBox shadow-sm p-3 mb-3 border border-1 rounded rounded-3">
          <div class="text-center mb-3 me-md-0 me-3">
            <span class="text-center text-small"><b>Manual</b> synchronization</span>
          </div>
        </div>
        <!-- Search block -->
        <div class="sideControlBox shadow-sm p-3 mb-3 border border-1 rounded rounded-3">
          <div class="text-center mb-3 me-md-0 me-3">
            <span class="text-center text-small">Search through recently <b>pulled repositories</b></span>
          </div>
          <div class="d-flex flex-column align-items-center justify-content-center">
            <input
              id="queryRepositories"
              v-model="queryRepositories"
              type="text"
              class="form-control form-control-sm"
              aria-describedby="queryRepositoriesInput"
              placeholder="&#128269;"
            />
            <button class="btn btn-outline-green-custom btn-sm me-1 mt-1" :disabled="!queryRepositories" @click="">
              Search
            </button>
          </div>
        </div>
        <!-- All repositories block -->
        <div class="sideControlBox shadow-sm p-3 mb-3 border border-1 rounded rounded-3">
          <div class="text-center mb-3 me-md-0 me-3">
            <span class="text-center text-small">Browse <b>all repositories</b></span>
          </div>
          <div class="d-flex justify-content-center">
            <button id="getReposBtn" class="btn btn-outline-green-custom btn-sm me-1" @click="">
              All repositories
            </button>
          </div>
        </div>
      </div>
      <!-- Content displaying block -->
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
import animationGetReposBtn from "#/mixins/animationGetReposBtn.js";
import RepositoriesTemplate from "#/components/RepositoriesTemplate.vue";

export default {
  name: "Home",
  components: { RepositoriesTemplate },
  mixins: [animationScrollDownArrows, animationDescriptionCardLogos, animationGetReposBtn],
  data() {
    return {
      autoSyncRemainingTime: import.meta.env.VITE_AUTO_SYNC_REMAINING,
      queryRepositories: null,
      activeComponent: null,
    };
  },
  computed: {
    ...mapState({
      autoSyncStatus: (state) => state.synchronization.autoSyncStatus,
    }),
  },
  mounted() {
    const scroll = document.getElementById("scroll");

    document.addEventListener("scroll", () => {
      if (scroll && !scroll.hidden && window.scrollY > 200) {
        scroll.hidden = true;
      }
      if (scroll && scroll.hidden && window.scrollY < 200) {
        scroll.removeAttribute("hidden");
      }
    });
    this.activeComponent = "RepositoriesTemplate";
    this.getAutoSyncStatus();
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
      autoSyncEnable: "synchronization/autoSyncEnable",
      autoSyncDisable: "synchronization/autoSyncDisable",
      // getExactRepo: "synchronization/getExactRepo",
      // getRepos: "synchronization/getRepos",
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
