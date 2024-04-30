<template>
    <section class="my-main-page">
        <div id="block__description" class="row">
            <div class="col-md-8 offset-md-2 col-10 offset-1 d-flex flex-column align-items-center mt-3">
                <div class="px-5 text-center">
                    Check <span class="text-green">GitHub API</span> and pull <span class="text-green">trending
                        repositories</span>.
                </div>
                <div id="logos">
                    <img src="@/assets/IMG/GitHub_logo.png" alt="GitHub logo" title="GitHub logo">
                    <img src="@/assets/IMG/Python_logo.png" alt="Python logo" title="Python logo">
                    <img src="@/assets/IMG/JavaScript_logo.png" alt="JavaScript logo" title="JavaScript logo">
                    <img src="@/assets/IMG/Ruby_logo.png" alt="Ruby logo" title="Ruby logo">
                </div>
                <div id="description__card" class="border border-2 rounded rounded-3 shadow p-3">
                    <h3 class="text-center mb-3">App description</h3>
                    <ol>
                        <li>What is defined under trending repositories?</li>
                        <ul>
                            <li>First 💯 repositories with the highest amount of ✰✰✰.</li>
                        </ul>
                        <li>What kind of repositories are used to be pulled?</li>
                        <ul>
                            <li>Any kind of repositories with only one exeption: Language of repository should be in
                                [JavaScript, Ruby, Python].
                            </li>
                        </ul>
                        <li>Does the auto synchronization implemented in the service?</li>
                        <ul>
                            <li>Yes.</li>
                        </ul>
                        <li>What is the recovery time of auto synchronization?</li>
                        <ul>
                            <li>By default, recovery time of auto synchronization with GitAPI is 1 hour. You also
                                can change it for your own purpose in file: ./.env (param: AUTO_SYNC_TIME).</li>
                        </ul>
                        <li>Repositories based on what of the three languages (mentioned above) the auto synchronization
                            does itself?</li>
                        <ul>
                            <li>Auto synchronization consecutively pulled perositories in sequence: [python > ruby >
                                javascript].</li>
                        </ul>
                        <li>Is it possible to choose, which of three repository to pull manually?</li>
                        <ul>
                            <li>Yes, one of three repositories, which is mentioned above.
                                Request should contain body data, as in example:
                                { "language": "python" }.</li>
                        </ul>
                        <li>Is it possible to stop/start auto synchronization?</li>
                        <ul>
                            <li>Yes.</li>
                        </ul>
                        <li class="text-end">Enjoy the service! &#128515; &#128521; &#128578;</li>
                    </ol>
                </div>
            </div>
        </div>
        <div id="block__scroll" class="row">
            <div class="col-12 d-flex justify-content-center align-items-center d-sm-block d-none">
                <div id="scrollDownBtn" @click="scrollDown">
                    <img src="@/assets/IMG/Arrow_down.png" alt="Scroll down" title="Scroll down">
                    <img src="@/assets/IMG/Arrow_down.png" alt="Scroll down" title="Scroll down">
                </div>
            </div>
        </div>
        <div id="block__content" class="row mt-5">
            <hr style="width: 50%; margin-left: 25%;">
            <div
                class="col-md-4 offset-md-0 col-10 offset-1 d-flex flex-column align-items-center justify-content-start">
                <div class="control_box shadow-sm p-3 mb-3">
                    <div class="text-center mb-3 me-md-0 me-3">
                        <span v-if="autoSyncStatus" class="text-center text-small">&#128994; Auto synchronization is
                            <br><b class="text-green">enabled</b></span>
                        <span v-else-if="!autoSyncStatus" class="text-center text-small">&#128308; Auto synchronization
                            is
                            <br><b class="text-danger">disabled</b></span>
                        <span v-else class="text-center text-small">Auto
                            synchronization status...</span>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-outline-green-custom btn-sm me-1" @click="startAutoSync">Enable</button>
                        <button class="btn btn-outline-danger btn-sm" @click="stopAutoSync">Disable</button>
                    </div>
                </div>
                <div class="control_box shadow-sm p-3 mb-3">
                    <div class="text-center mb-3 me-md-0 me-3">
                        <span class="text-center text-small"><b>Manual</b> synchronization</span>
                    </div>
                    <div class="d-flex flex-column align-items-start">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                id="inlineRadio_python" value="python" v-model="languageToSync">
                            <label class="form-check-label text-small" for="inlineRadio_python">
                                <img src="@/assets/IMG/Python_logo.png" alt="Python logo" title="Python logo" width="15"
                                    height="15">
                                <span class="ms-1">Python</span>
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                id="inlineRadio_javascript" value="javascript" v-model="languageToSync">
                            <label class="form-check-label text-small" for="inlineRadio_javascript">
                                <img src="@/assets/IMG/JavaScript_logo.png" alt="JavaScript logo"
                                    title="JavaScript logo" width="15" height="15">
                                <span class="ms-1">JavaScript</span>
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio_ruby"
                                value="ruby" v-model="languageToSync">
                            <label class="form-check-label text-small" for="inlineRadio_ruby">
                                <img src="@/assets/IMG/Ruby_logo.png" alt="Ruby logo" title="Ruby logo" width="15"
                                    height="15">
                                <span class="ms-1">Ruby</span>
                            </label>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-outline-green-custom btn-sm me-1" @click="manualSync"
                            :disabled="languageToSync === 'Select language...'">Sync</button>
                        <div id="manualSyncStatus" class="text-center text-small border-start border-5 ps-3"><i
                                class="text-muted"> {{
                    languageToSync }} </i></div>
                    </div>
                </div>
                <div class="control_box shadow-sm p-3 mb-3">
                    <button class="btn btn-outline-green-custom btn-sm me-1" @click="sync">Sync</button>
                </div>
                <div class="control_box shadow-sm p-3 mb-3">
                    <button class="btn btn-outline-green-custom btn-sm me-1" @click="sync">Sync</button>
                </div>
            </div>
            <div class="col-sm-8 offset-sm-0 col-10 offset-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Rem quaerat quos nam nihil dolorem omnis molestiae in cumque nesciunt itaque dolorum maxime amet, earum
                quisquam fugit aperiam cupiditate at quas?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
                dolore ratione dignissimos vero quaerat perferendis delectus architecto, voluptate enim nesciunt cumque
                nemo, aperiam ipsam ut inventore aliquam, temporibus officia? Impedit!
                Eligendi eveniet perspiciatis expedita culpa mollitia dolorem omnis cum delectus et debitis aspernatur
                corporis quia quod in cupiditate, facere quam unde placeat officia atque? Deleniti unde aperiam
                voluptatum explicabo facere!
                Expedita laudantium error eos praesentium! Est quibusdam eveniet aperiam cum amet quis molestias ipsam,
                quidem neque mollitia explicabo odio consectetur accusantium inventore magnam voluptatibus pariatur ex
                tempore. Tenetur, ipsa quasi?
                Neque minima nihil odio commodi tenetur enim. Aperiam odio accusantium facere doloremque minus,
                exercitationem illo dolor alias odit quis sequi ipsum ullam soluta quam, adipisci libero, minima animi
                pariatur repellat.
                Esse illo perferendis, quas id quisquam unde accusamus vel eius, repudiandae recusandae quam animi
                explicabo ex ut, quidem reprehenderit. Vero nihil laborum amet corrupti necessitatibus ea quibusdam,
                enim error recusandae?</div>
        </div>
    </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import animation_scrollDown from '@/mixins/animation_scrollDown.js';
import animation_descriptionCardLogos from '@/mixins/animation_descriptionCardLogos.js';
export default {
    name: 'Main_page',
    data() {
        return {
            languageToSync: 'Select language...',
        }
    },
    mixins: [animation_scrollDown, animation_descriptionCardLogos],
    computed: {
        ...mapState({
            autoSyncStatus: state => state.git_autoSync.autoSyncStatus
        }),
        ...mapGetters({}),
    },
    methods: {
        ...mapActions({
            startAutoSync: 'git_autoSync/startAutoSync',
            stopAutoSync: 'git_autoSync/stopAutoSync',
            statusAutoSync: 'git_autoSync/statusAutoSync',
            syncTrendingRepos: 'git_autoSync/syncTrendingRepos',
        }),
        ...mapMutations({}),
        manualSync() {
            document.getElementById('manualSyncStatus').innerHTML = `
            <div class="spinner-border spinner-border-sm text-green" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `;
            this.syncTrendingRepos({
                language: `${this.languageToSync}`
            }).then((response) => {
                document.getElementById('manualSyncStatus').innerHTML = `&#10004;<br>${response.data.message}`;
            }).then(() => {
                setTimeout(() => {
                    this.languageToSync = 'Select language...';
                    document.getElementById('manualSyncStatus').innerHTML = `<i class="text-muted">${this.languageToSync}</i>`;
                }, 5000);
            }).catch((error) => {
                document.getElementById('manualSyncStatus').innerHTML = `&#10060;<br>${error.response.data.message}`;
            });
        },
        scrollDown() {
            document.getElementById('block__content').scrollIntoView({
                behavior: 'smooth'
            })
        },
    },
    mounted() {
        this.statusAutoSync();
        document.addEventListener('scroll', () => {
            if (document.getElementById('block__scroll') && window.scrollY > 200) {
                document.getElementById('block__scroll').setAttribute('hidden', 'true');
            }
            if (document.getElementById('block__scroll') && window.scrollY <= 200) {
                document.getElementById('block__scroll').removeAttribute('hidden');
            }
        })
    },
    unmounted() {
        document.removeEventListener('scroll', () => {
            if (document.getElementById('block__scroll') && window.scrollY > 200) {
                document.getElementById('block__scroll').setAttribute('hidden', 'true');
            }
            if (document.getElementById('block__scroll') && window.scrollY <= 200) {
                document.getElementById('block__scroll').removeAttribute('hidden');
            }
        })
    },
}
</script>

<style scoped lang="scss"></style>