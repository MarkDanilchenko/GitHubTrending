<template>
    <section class="my-item-repo">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button v-if="index == 0" class="accordion-button" type="button" data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${index}`" aria-expanded="true" :aria-controls="`collapse${index}`">
                    <span>{{ repo.name }}</span><span class="text-small">, by {{ repo.owner_login }}</span>
                </button>
                <button v-else class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${index}`" aria-expanded="false" :aria-controls="`collapse${index}`">
                    <span>{{ repo.name }}</span><span class="text-small">, by {{ repo.owner_login }}</span>
                </button>
            </h2>
            <div v-if="index == 0" :id="`collapse${index}`" class="accordion-collapse collapse show"
                data-bs-parent="#reposAccordion">
                <div class="accordion-body d-flex flex-column">
                    <ul>
                        <li>Inner GitID: {{ repo.git_id }}</li>
                        <li>Description: "{{ repo.description }}"</li>
                        <li> Main language:
                            <img class="p-0 m-0" v-if="repo.language === 'JavaScript'"
                                src="@/assets/IMG/JavaScript_logo.png" alt="JavaScript logo" title="JavaScript logo"
                                width="20" height="20">
                            <img class="p-0 m-0" v-if="repo.language === 'Python'" src="@/assets/IMG/Python_logo.png"
                                alt="Python logo" title="Python logo" width="20" height="20">
                            <img class="p-0 m-0" v-if="repo.language === 'Ruby'" src="@/assets/IMG/Ruby_logo.png"
                                alt="Ruby logo" title="Ruby logo" width="20" height="20">
                            {{ repo.language }}
                        </li>
                        <li>Link on GitHub: <a class="nav-link d-inline-block" :href="repo.html_url"
                                target="_blank">Click</a>
                        </li>
                        <li>&#127775;&#127775;&#127775; amount: {{ repo.stargazers_count }}</li>
                    </ul>
                </div>
            </div>
            <div v-else :id="`collapse${index}`" class="accordion-collapse collapse" data-bs-parent="#reposAccordion">
                <div class="accordion-body d-flex flex-column">
                    <ul>
                        <li>Inner GitID: {{ repo.git_id }}</li>
                        <li>Description: "{{ repo.description }}"</li>
                        <li> Main language:
                            <img class="p-0 m-0" v-if="repo.language === 'JavaScript'"
                                src="@/assets/IMG/JavaScript_logo.png" alt="JavaScript logo" title="JavaScript logo"
                                width="20" height="20">
                            <img class="p-0 m-0" v-if="repo.language === 'Python'" src="@/assets/IMG/Python_logo.png"
                                alt="Python logo" title="Python logo" width="20" height="20">
                            <img class="p-0 m-0" v-if="repo.language === 'Ruby'" src="@/assets/IMG/Ruby_logo.png"
                                alt="Ruby logo" title="Ruby logo" width="20" height="20">
                            {{ repo.language }}
                        </li>
                        <li>Link on GitHub: <a class="nav-link d-inline-block" :href="repo.html_url"
                                target="_blank">Click</a>
                        </li>
                        <li>&#127775;&#127775;&#127775; amount: {{ repo.stargazers_count }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    name: 'ItemRepo',
    props: {
        repo: {
            type: Object,
            default: {}
        },
        index: {
            type: Number,
            default: 0
        }
    }
}
</script>


<style scoped lang="scss"></style>