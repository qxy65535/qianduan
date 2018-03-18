<template>
    <main class="main">
        <article class="post" v-for="post in postlist" :key="post.id">
            <header class="post__head archive">
                <a :href="['/artical/detail/' + post.id]">
                    <time class="post__time" :datetime="post.datetime">{{ post.datetime }}</time>
                </a>
                <h1 class="post__title archive">
                    <a :href="['/artical/detail/' + post.id]">{{ post.title }}</a>
                </h1>
            </header>
            <footer class="post__foot u-cf">
                <ul class="post__tag u-fl">
                    <li class="post__tag__item" v-for="tag in post.tags">
                        <a class="post__tag__link" href="/posts">{{ tag }}</a>
                    </li>
                </ul>
            </footer>
        </article>

    </main>
</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    export default {
        name: 'PostLists',
        data() {
            return {
                postlist: [
                    {
                        id: 1,
                        datetime: new Date().toDateString(),
                        title: "hello",
                        tags: ["tag1", "tag2", "tag3"]
                    },
                    {
                        id: 2,
                        datetime: new Date().toDateString(),
                        title: "hello2",
                        tags: ["tag4", "tag5", "tag6"]
                    },
                ],
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>