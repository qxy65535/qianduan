<template>
        <main class="main">
                <article class="post">
                    <header class="post__head archive">
                        <time class="post__time" :datetime="source.datetime">{{ source.datetime }}</time>
                        <h1 class="post__title archive">
                            {{ source.title }}
                        </h1>
                        <div class="markdown" v-html="compiledMarkdown"></div>
                    </header>
                    <footer class="post__foot u-cf">
                        <ul class="post__tag u-fl">
                            <li class="post__tag__item" v-for="tag in source.tags">
                                <router-link class="post__tag__link" to="/posts">{{ tag }}</router-link>
                            </li>
                        </ul>
                    </footer>
                    <section class="reward">
                        <a class="btn-reward" href="#">打赏</a>
                        <div class="reward-wrapper clearfix">
                            <img src="/img/wechat.png" title="微信">
                        </div>
                    </section>
                </article>
            </main>

</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    var marked = require('marked');
    import 'highlight.js/styles/default.css';
    import hljs from 'highlight.js'


    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(lang, code, true).value;
            } else {
                return hljs.highlightAuto(code).value;
            }
        }
    });

    export default {
        name: 'Article',
        props: {
            source: {
                id: '',
                datetime: '',
                title: '',
                tags: [],
                detail: ""
            }
        },
        data() {
            return {

            }
        },
        computed: {
            compiledMarkdown() {
                return marked(this.source.detail, { sanitize: true })
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
        font-size: 300%;
        margin: 0 20px;
    }
    .post__time {
        font-size: 120%;
        margin: 0 20px;
    }
</style>