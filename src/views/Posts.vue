<template>
    <div class="body">
        <transition name="header-footer-fade" appear>
            <blog-header></blog-header>
        </transition>
        <transition name="post-list-fade" appear>
            <post-list></post-list>
        </transition>
        <transition name="header-footer-fade" appear>
            <blog-footer></blog-footer>
        </transition>

    </div>
</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    import Header from '../components/Header'
    import PostLists from '../components/PostLists'
    import Footer from '../components/Footer'
    export default {
        name: 'Post',
        data() {
            return {
            }
        },
        components: {
            'blog-header': Header,
            'post-list': PostLists,
            'blog-footer': Footer
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .post-list-fade-enter-active {
        transition: all .8s ease;
    }
    /* .post-list-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    } */
    .post-list-fade-enter, .post-list-fade-leave-to{
        transform: translateX(30px);
        opacity: 0;
    }
    .header-footer-fade-enter-active {
        transition: all .5s ease;
    }
    /* .header-footer-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    } */
    .header-footer-fade-enter, .post-list-fade-leave-to{
        transform: scale(0.9);
        opacity: 0;
    }

</style>