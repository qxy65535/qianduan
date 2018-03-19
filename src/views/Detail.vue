<template>
        <div class="body">
            <transition name="header-footer-fade" appear>
                <blog-header></blog-header>
            </transition>
            <transition name="article-fade" appear>
                <article-detail :source="detail"></article-detail>
            </transition>
            <transition name="header-footer-fade" appear>
                <blog-footer></blog-footer>
            </transition>
    
        </div>
    </template>
    
    <!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->
    
    <script>
        import Header from '../components/Header'
        import Article from '../components/Article'
        import Footer from '../components/Footer'
        export default {
            name: 'Detail',
            data() {
                return {
                    detail: {
                        id: 1,
                        datetime: new Date().toDateString(),
                        title: "hello",
                        tags: ["tag1", "tag2", "tag3"],
                detail: "## 这里是要展示的markdown文字，也可以通过props传递"
                    }
                }
            },
            components: {
                'blog-header': Header,
                'article-detail': Article,
                'blog-footer': Footer
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
        .article-fade-enter, .article-fade-leave-to{
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