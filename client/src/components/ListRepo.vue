<template>
    <section class="my-list-repo">
        <div class="text-center">
            <span class="text-green">All pulled</span><br> repositories
        </div>
        <div class="mt-5">
            <div class="d-flex justify-content-end align-items-center">
                <div class="me-3">
                    <span class="text-small text-muted">Items per page:</span>
                    <select class="form-select form-select-sm" aria-label="Select items' amount per page"
                        :onchange="changeItemsPerPage">
                        <option value="5">5</option>
                        <option selected value="10">10</option>
                        <option value="25">25</option>
                    </select>
                </div>
                <div>
                    <span class="text-small text-muted">Sort by:</span>
                    <select class="form-select form-select-sm" aria-label="Select items' sort method"
                        :onchange="changeSortMethod">
                        <option selected value="stargazers_count">Stars amount</option>
                        <option value="name">Name of the repository</option>
                        <option value="language">Main language of the repository</option>
                    </select>
                </div>
            </div>
            <hr style="width: 75%; margin-left: 25%;">
            <div v-if="notFound" class="notFound">
                <p class="text-center mt-5">No repositories found =\</p>
            </div>
            <div v-else>
                <p class="text-small text-end">Total amount of repositories: <span class="text-green"><b>{{ totalItems
                            }}</b></span></p>
                <div class="accordion" id="reposAccordion">
                    <ItemRepo v-for="repo, index in paginatedResult" :key="repo._id" :repo="repo" :index="index">
                    </ItemRepo>
                </div>
                <div class="d-flex justify-content-center my-3">
                    <Paginate v-model="page" :page-count="totalPages" :page-range="3" :margin-pages="1"
                        :break-view-text="'...'" :first-last-button="true" :prev-text="'<'" :next-text="'>'"
                        :first-button-text="'<<'" :last-button-text="'>>'" :container-class="'pagination'"
                        :page-class="'page-item'"></Paginate>
                    <!-- :click-handler="changePage" can be used in <Paginate> -->
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import ItemRepo from '@/components/ItemRepo.vue';
import Paginate from 'vuejs-paginate-next';
export default {
    name: 'ListRepo',
    components: {
        Paginate,
        ItemRepo
    },
    data() {
        return {
            page: null,
            limit: null,
            sortBy: null,
            paginatedResult: [],
            totalItems: null,
            totalPages: null,
            notFound: false
        }
    },
    methods: {
        ...mapActions({
            getTrendingRepos: 'git_autoSync/getTrendingRepos',
        }),
        changeItemsPerPage(event) {
            this.limit = event.target.value
        },
        changeSortMethod(event) {
            this.sortBy = event.target.value
        },
        changePerformanceSettingsAndPage() {
            this.getTrendingRepos({
                page: this.page,
                limit: this.limit,
                sortBy: this.sortBy
            })
                .then((response) => {
                    if (response.data.message) {
                        this.notFound = true;
                        return
                    }
                    this.paginatedResult = [...response.data.paginatedResult];
                    this.totalItems = response.data.pageInfo.totalItems;
                    this.totalPages = response.data.pageInfo.totalPages;
                }).catch((error) => {
                    console.log(error.response.data.message);
                    alert(error.response.data.message);
                });
        }
    },
    watch: {
        page: {
            handler(newValue) {
                this.changePerformanceSettingsAndPage();
            }
        },
        limit: {
            handler(newValue) {
                this.changePerformanceSettingsAndPage();
            }
        },
        sortBy: {
            handler(newValue) {
                this.changePerformanceSettingsAndPage();
            }
        }
    },
    mounted() {
        this.changePerformanceSettingsAndPage();
    }
}
</script>

<style scoped lang="scss"></style>