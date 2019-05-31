<template>
    <div class="body">
        <transition name="header-footer-fade" appear>
            <blog-header></blog-header>
        </transition>
        <transition name="article-fade" appear>
            <main class="main">
                <article class="post">

                    <mavon-editor style="height: 100%;" ref=md :toolbarsFlag="toolbarsFlag" 
                    :subfield="subfield" :defaultOpen="defaultOpen">
                    </mavon-editor>

                </article>
            </main>
        </transition>
        <transition name="header-footer-fade" appear>
            <blog-footer></blog-footer>
        </transition>

    </div>
</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    import Header from '../components/Header'
    import Footer from '../components/Footer'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: 'AboutMe',
        data() {
            return {
                toolbarsFlag: false , 
                subfield: false, 
                defaultOpen: "preview",
            }
        },
        components: {
            mavonEditor,
            'blog-header': Header,
            'blog-footer': Footer
        },
        props: {

        },

        computed: {
            compiledMarkdown() {
                // return marked(this.source.detail, { sanitize: true })
            }
        },
        mounted() {
            var vm = this;
            // var formdata = new FormData();
            // formdata.append("id", vm.id);
            this.axios({
                url: '/aboutme',
                method: 'post',
            }).then((result) => {
                if (result.response && result.response.status == 404) {
                    vm.$refs.md.d_value = result.response.data.res;
                    return;
                }
                if (result.data.success) {
                    // alert(pos)
                    var res = result.data.res;
                    // vm.source.detail = res.detail;
                    vm.$refs.md.d_value = res.detail;
                }
                else
                    alert(result.data.message);
            }).catch((error) => {
                // console.log(error)
                // if (error.response.status == 404){

                //     vm.source.title = "找不到这篇文章！";
                //     vm.$refs.md.d_value = error.response.data.res;
                    
                // }
            })
        },
        methods: {
            reward: function(){
                var $reward = $('.reward-wrapper');
                    $reward.slideToggle();
            }
        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .article-fade-enter-active {
        transition: all .8s ease;
    }

    /* .post-list-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        } */

    .article-fade-enter,
    .article-fade-leave-to {
        transform: translateX(30px);
        opacity: 0;
    }

    .header-footer-fade-enter-active {
        transition: all .5s ease;
    }

    /* .header-footer-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        } */

    .header-footer-fade-enter,
    .post-list-fade-leave-to {
        transform: scale(0.9);
        opacity: 0;
    }

    .markdown {
        margin: 30px 20px;
    }
    .post__title {
        font-size: 200%;
        margin: 0 10px;
    }
    .post__time {
        font-size: 100%;
        margin: 0 15px;
    }
    .post__head {
        margin: 17px;
    }

</style>