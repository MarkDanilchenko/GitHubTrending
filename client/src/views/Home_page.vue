<template>
    <section class="my-home-page">
        <router-link to="/main" class="nav-link" alt="Main page" title="Main page">
            <div class="d-flex  justify-content-center align-items-center">
                <!-- .dots animation -->
                <!-- .dots animation -->
                <!-- .dots animation -->
                <div class="text-center lead">
                    <div class="mod">
                        <div class="cube">
                            <div class="faces f1">
                                <div class="dot p1"></div>
                                <div class="dot p2"></div>
                                <div class="dot p3"></div>
                                <div class="dot p4"></div>
                                <div class="dot p5"></div>
                                <div class="dot p6"></div>
                                <div class="dot p7"></div>
                                <div class="dot p8"></div>
                                <div class="dot p9"></div>
                            </div>
                            <div class="faces f2">
                                <div class="dot p10"></div>
                                <div class="dot p11"></div>
                                <div class="dot p12"></div>
                                <div class="dot p13"></div>
                            </div>
                            <div class="faces f3">
                                <div class="dot p1"></div>
                                <div class="dot p2"></div>
                                <div class="dot p3"></div>
                                <div class="dot p4"></div>
                                <div class="dot p5"></div>
                                <div class="dot p6"></div>
                                <div class="dot p7"></div>
                                <div class="dot p8"></div>
                                <div class="dot p9"></div>
                            </div>
                            <div class="faces f4">
                                <div class="dot p10"></div>
                                <div class="dot p11"></div>
                                <div class="dot p12"></div>
                                <div class="dot p13"></div>
                            </div>
                            <div class="faces f5">
                                <div class="dot p1"></div>
                                <div class="dot p2"></div>
                                <div class="dot p3"></div>
                                <div class="dot p4"></div>
                                <div class="dot p5"></div>
                                <div class="dot p6"></div>
                                <div class="dot p7"></div>
                                <div class="dot p8"></div>
                                <div class="dot p9"></div>
                            </div>
                            <div class="faces f6">
                                <div class="dot p10"></div>
                                <div class="dot p11"></div>
                                <div class="dot p12"></div>
                                <div class="dot p13"></div>
                            </div>
                            <div class="faces f7">
                                <div class="dot p1"></div>
                                <div class="dot p2"></div>
                                <div class="dot p3"></div>
                                <div class="dot p4"></div>
                                <div class="dot p5"></div>
                                <div class="dot p6"></div>
                                <div class="dot p7"></div>
                                <div class="dot p8"></div>
                                <div class="dot p9"></div>
                            </div>
                            <div class="faces f8">
                                <div class="dot p10"></div>
                                <div class="dot p11"></div>
                                <div class="dot p12"></div>
                                <div class="dot p13"></div>
                            </div>
                            <div class="faces f9">
                                <div class="dot p1"></div>
                                <div class="dot p2"></div>
                                <div class="dot p3"></div>
                                <div class="dot p4"></div>
                                <div class="dot p5"></div>
                                <div class="dot p6"></div>
                                <div class="dot p7"></div>
                                <div class="dot p8"></div>
                                <div class="dot p9"></div>
                            </div>
                            <div class="faces f10">
                                <div class="dot p10"></div>
                                <div class="dot p11"></div>
                                <div class="dot p12"></div>
                                <div class="dot p13"></div>
                            </div>
                            <div class="faces f11">
                                <div class="dot p1"></div>
                                <div class="dot p2"></div>
                                <div class="dot p3"></div>
                                <div class="dot p4"></div>
                                <div class="dot p5"></div>
                                <div class="dot p6"></div>
                                <div class="dot p7"></div>
                                <div class="dot p8"></div>
                                <div class="dot p9"></div>
                            </div>
                        </div>
                        <div class="project-name">
                            <p><span class="text-green">Find out</span> <br /> the most trending projects on GitHub</p>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name: 'Label_page',
    computed: {
        ...mapState({
            colorMode: state => state.color_mode.colorMode
        }),
    },
    mounted() {
        if (this.colorMode === 'dark') {
            $('.dot').css('color', '#ffffff');
        } else {
            $('.dot').css('color', '#000000');
        }
    },
    watch: {
        colorMode: {
            handler(newValue) {
                if (newValue === 'dark') {
                    $('.dot').css('color', '#ffffff');
                } else {
                    $('.dot').css('color', '#000000');
                }
            },
            deep: true
        }
    }
}
</script>

<style scoped lang="scss">
p {
    font-size: 25px;
    line-height: 1.5;

    span {
        font-size: 50px;
    }
}
</style>