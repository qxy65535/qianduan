<template>
    <header class="head">
        <h1 class="head-title u-fl">
            <a href="/">saltyfish</a>
        </h1>
        <nav class="head-nav u-fr">
            <ul class="head-nav__list">
                <li class="head-nav__item">
                    <!-- <a class="head-nav__link" href="/posts">posts</a> -->
                    <router-link class="headerlink" to="/posts">Posts</router-link>
                </li>
                <li class="head-nav__item">
                    <router-link class="headerlink" to="/archives">Archives</router-link>
                    <!-- <a class="head-nav__link" href="/archives">Archives</a> -->
                </li>
                <li class="head-nav__item">
                    <router-link class="headerlink" to="/aboutme">About me</router-link>
                    <!-- <a class="head-nav__link" href="/aboutme">About me</a> -->
                </li>
                <!-- <li class="head-nav__item">
                    <a class="headerlink" href="/posts">Posts</a>
                </li>
                <li class="head-nav__item">
                    <a class="headerlink" href="/archives">Archives</a>
                </li>
                <li class="head-nav__item">
                    <a class="headerlink" href="/aboutme">About me</a>
                </li> -->
            </ul>
        </nav>
    </header>
</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    export default {
        name: 'Header',
        data() {
            return {
                msg: 'Hello :)'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>