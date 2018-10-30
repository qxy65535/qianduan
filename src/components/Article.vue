<template>
        <main class="main">
                <article class="post">
                    <header class="post__head archive">
                        <time class="post__time" :datetime="source.datetime">{{ source.datetime }}</time>
                        <h1 class="post__title archive">
                            {{ source.title }}
                        </h1>
                        <!-- <div class="markdown" v-html="compiledMarkdown"></div> -->

                    </header>
                    <mavon-editor style="height: 100%;" ref=md :toolbarsFlag="toolbarsFlag" 
                    :subfield="subfield" :defaultOpen="defaultOpen">
                    </mavon-editor>
                    <footer class="post__foot u-cf">
                        <ul class="post__tag u-fl">
                            <li class="post__tag__item" v-for="tag in source.tags">
                                <router-link class="post__tag__link" to="/posts">{{ tag }}</router-link>
                            </li>
                        </ul>
                    </footer>

                </article>
                <section class="reward">
                        <a id="btn-reward" class="btn-reward" style="cursor:default" @click="reward">打赏</a>
                        <div class="reward-wrapper clearfix">
                            <img src="../assets/wechat.png" title="微信">
                        </div>
                    </section>
            </main>

</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    // var marked = require('marked');
    // import 'highlight.js/styles/default.css';
    // import hljs from 'highlight.js'
    import { mavonEditor } from 'mavon-editor'
    // import tag from './TagInput'
    import 'mavon-editor/dist/css/index.css'
    import axios from 'axios'


    // marked.setOptions({
    //     renderer: new marked.Renderer(),
    //     gfm: true,
    //     tables: true,
    //     breaks: false,
    //     pedantic: false,
    //     sanitize: false,
    //     smartLists: true,
    //     smartypants: false,
    //     highlight: function (code, lang) {
    //         if (lang && hljs.getLanguage(lang)) {
    //             return hljs.highlight(lang, code, true).value;
    //         } else {
    //             return hljs.highlightAuto(code).value;
    //         }
    //     }
    // });

    export default {
        name: 'Article',
        props: {

        },
        components: {
            mavonEditor,

        },
        data() {
            return {
                toolbarsFlag: false , 
                subfield: false, 
                defaultOpen: "preview",
                // detail: "",
                source: {
                    datetime: '',
                    title: '',
                    tags: [],
                    detail: ""
                },
            }
        },
        computed: {
            compiledMarkdown() {
                // return marked(this.source.detail, { sanitize: true })
            }
        },
        mounted() {
            var vm = this;
            vm.id = vm.$route.query.id.toString();
            // var formdata = new FormData();
            // formdata.append("id", vm.id);
            axios({
                url: '/article/detail',
                method: 'post',
                data: {
                    "id": vm.id
                },
                contentType : "application/json" ,
            }).then((result) => {
                if (result.data.success) {
                    // alert(pos)
                    var res = result.data.res;
                    vm.source.datetime = res.datetime;
                    vm.source.title = res.title;
                    // vm.source.detail = res.detail;
                    vm.$refs.md.d_value = res.detail;
                    vm.source.tags = res.tags;
                }
                else
                    alert(result.data.message);
            }).catch((error) => {
                if (error.response.status == 404){

                    vm.source.title = "找不到这篇文章！";
                    vm.$refs.md.d_value = error.response.data.res;
                    
                }
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