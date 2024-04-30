<template>
    <section class="my-detailed-repo">
        <div id="notFound_repo" v-if="detailedRepo.message">
            <div class="text-center">
                Oops! Seems like
                <br><span class="text-green">{{ detailedRepo.message }}</span><br>
                Please, specify Your request and try again.
            </div>
        </div>
        <div id="detailedCard_repo" v-else class="rounded rounded-3 shadow shadow-lg p-3">
            <h3 class="text-end mb-3"><span class="text-green">About</span> repository:</h3>
            <ul>
                <li>
                    <span class="text-green">{{ detailedRepo.name }}</span>, <span class="text-small">by {{
            detailedRepo.owner_login }}</span>
                </li>
                <li>Inner GitID: {{ detailedRepo.git_id }}</li>
                <li>Description: "{{ detailedRepo.description }}"</li>
                <li> Main language:
                    <img class="p-0 m-0" v-if="detailedRepo.language === 'JavaScript'"
                        src="@/assets/IMG/JavaScript_logo.png" alt="JavaScript logo" title="JavaScript logo" width="20"
                        height="20">
                    <img class="p-0 m-0" v-if="detailedRepo.language === 'Python'" src="@/assets/IMG/Python_logo.png"
                        alt="Python logo" title="Python logo" width="20" height="20">
                    <img class="p-0 m-0" v-if="detailedRepo.language === 'Ruby'" src="@/assets/IMG/Ruby_logo.png"
                        alt="Ruby logo" title="Ruby logo" width="20" height="20">
                    {{ detailedRepo.language }}
                </li>
                <li>Link on GitHub: <a class="nav-link d-inline-block" :href="detailedRepo.html_url"
                        target="_blank">Click</a>
                </li>
                <li>&#127775;&#127775;&#127775; amount: {{ detailedRepo.stargazers_count }}</li>
            </ul>
        </div>
    </section>
</template>

<script>
import animation_detailedRepoCard from '@/mixins/animation_detailedRepoCard.js';
export default {
    name: 'DetailedRepo',
    props: {
        detailedRepo: {
            type: Object
        }
    },
    mixins: [animation_detailedRepoCard]
}
</script>

<style scoped lang="scss"></style>