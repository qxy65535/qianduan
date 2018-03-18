<template>
    <div class="index">
        <div class="body">
            <div class="hide" id="particles-oli-wrapper"></div>
            <div class="index-wrapper">
                <header class="head index hide">
                    <h1 class="head-title u-fl">
                        <a href="/">qxy</a>
                    </h1>
                    <nav class="head-nav u-fr">
                        <ul class="head-nav__list">
                            <li class="head-nav__item">
                                <a class="head-nav__link" href="/posts">Posts</a>
                            </li>
                            <li class="head-nav__item">
                                <a class="head-nav__link" href="/archives">Archives</a>
                            </li>
                            <li class="head-nav__item">
                                <a class="head-nav__link" href="/aboutme">About me</a>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        </div>
    </div>
</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    import '../assets/style/js/particles.min.js'
    import '../assets/style/js/particles.oli.js'
    export default {
        name: 'Home',
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