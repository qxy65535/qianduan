<template>
    <div class="index">
        <div class="body">
            <div class="hide" id="particles-oli-wrapper"></div>
            <div class="index-wrapper">
                <header class="head index hide">
                    <h1 class="head-title u-fl">
                        <a href="/">saltyfish</a>
                    </h1>
                    <nav class="head-nav u-fr">
                        <ul class="head-nav__list">
                            <li class="head-nav__item">
                                <!-- <a class="head-nav__link" href="/posts">posts</a> -->
                                <router-link class="head-nav__link" to="/posts">Posts</router-link>
                            </li>
                            <li class="head-nav__item">
                                <router-link class="head-nav__link" to="/archives">Archives</router-link>
                                <!-- <a class="head-nav__link" href="/archives">Archives</a> -->
                            </li>
                            <li class="head-nav__item">
                                <router-link class="head-nav__link" to="/aboutme">About me</router-link>
                                <!-- <a class="head-nav__link" href="/aboutme">About me</a> -->
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
    import Header from '../components/Header'
    export default {
        name: 'Home',
        data() {
            return {
                msg: 'Hello :)'
            }
        },
        components: {
            'blog-header': Header
        },
        created: function () {
            $(function particlesanimate() {
                particlesJS("particles-oli-wrapper", {
                    "particles": {
                        "number": {
                            "value": 40,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#399c9c"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            // "image": {
                            //     "src": "img/github.svg",
                            //     "width": 100,
                            //     "height": 100
                            // }
                        },
                        "opacity": {
                            "value": 0.3,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.2,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 20,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 30,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 250,
                            "color": "#40afaf",
                            "opacity": 0.3,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 3,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": true,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "grab"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 140,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },

                        }
                    },
                    "retina_detect": true
                });

                var $particle = $('#particles-oli-wrapper').css({ display: 'none' }).removeClass('hide');
                var $navH1 = $('.index-wrapper header h1, .index-wrapper header nav').hide();

                var $header = $('.index-wrapper .hide')
                    .removeClass('hide')
                    .css({
                        height: 0
                    })
                    .animate({
                        height: 120
                    }, 800, function () {
                        $particle.fadeIn(600);
                        $navH1.fadeIn(600);
                    });

            });
            // this.tweenedColor = Object.assign({}, this.color)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>