<template>
    <section class="my-main-page">
        <div id="block__description" class="row">
            <div class="col-md-8 offset-md-2 col-10 offset-1 d-flex flex-column align-items-center mt-3">
                <div class="px-5 text-center">
                    Check <span class="text-green">GitHub API</span> and pull <span
                        class="text-green">trending repositories</span>.
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
                    <hr style="width: 50%; margin-left: 25%;">
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
        <div id="block__content" class="row">
        </div>
    </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import animation_scrollDown from '@/mixins/animation_scrollDown.js';
import animation_descriptionCardLogos from '@/mixins/animation_descriptionCardLogos.js';
export default {
    name: 'Main_page',
    mixins: [animation_scrollDown, animation_descriptionCardLogos],
    methods: {
        scrollDown() {
            document.getElementById('block__content').scrollIntoView({
                behavior: 'smooth'
            })
        }
    },
    mounted() {
        document.addEventListener('scroll', (e) => {
            if (e.target.scrollingElement.scrollTop > 200 && document.querySelector('#block__scroll > div').classList.contains('d-sm-block')) {
                document.querySelector('#block__scroll > div').classList.remove('d-sm-block');
            }
            if (e.target.scrollingElement.scrollTop < 200 && !document.querySelector('#block__scroll > div').classList.contains('d-sm-block')) {
                document.querySelector('#block__scroll > div').classList.add('d-sm-block');
            }
        });
    }
}
</script>

<style scoped lang="scss"></style>