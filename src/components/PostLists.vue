<template>
    <main class="main">
        <article class="post" v-for="post in postlist" :key="post.id">
            <header class="post__head archive">
                <router-link :to="{
                    path: '/article/detail', 
                    query: {
                        id: post.id
                    }}">
                    <time class="post__time" :datetime="post.datetime">{{ post.datetime }}</time>
                </router-link>
                <h1 class="post__title archive">
                    <router-link :to="{
                            path: '/article/detail', 
                            query: {
                                id: post.id
                            }}">
                            {{ post.title }}
                    </router-link>
                </h1>
            </header>
            <footer class="post__foot u-cf">
                <ul class="post__tag u-fl">
                    <li class="post__tag__item" v-for="tag in post.tags">
                        <router-link class="post__tag__link" to="/posts">{{ tag }}</router-link>
                    </li>
                </ul>
            </footer>
        </article>
        <div class="page">
            <ul class="pagination">
                <li v-show="current != 1" @click="current-- && goto(current)">
                    <a href="#">上一页</a>
                </li>
                <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                    <a href="#">{{index}}</a>
                </li>
                <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)">
                    <a href="#">下一页</a>
                </li>
            </ul>
        </div>

    </main>
</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    import axios from 'axios'

    export default {
        name: 'PostLists',
        data() {
            return {
                postlist: [],
                current: 1,
                showItem: 5,
                allpage: 13
            }
        },
        computed: {
            pages: function () {
                var pag = [];
                if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while (i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2),//从哪里开始
                        i = this.showItem;
                    if (middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while (i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        mounted() {
            var vm = this;
            axios({
                url: 'http://localhost:8081/postlist',
                method: 'post',
                data: {
                    "page": 1
                },
                contentType: "application/json",
            }).then((result) => {
                if (result.data.success) {
                    // alert(pos)
                    var res = result.data.res;
                    vm.allpage = res.totalpage;
                    vm.postlist = res.postlist;
                }
                else
                    alert(result.data.message);
            }).catch((error) => {
                alert(error);
            })
        },
        methods: {
            goto: function (index) {
                if (index == this.current) return;
                this.current = index;
                //这里可以发送ajax请求
                var vm = this;
                axios({
                    url: 'http://localhost:8081/postlist',
                    method: 'post',
                    data: {
                        "page": index
                    },
                    contentType: "application/json",
                }).then((result) => {
                    if (result.data.success) {
                        // alert(pos)
                        var res = result.data.res;
                        vm.allpage = res.totalpage;
                        vm.postlist = res.postlist;
                    }
                    else
                        alert(result.data.message);
                }).catch((error) => {
                    alert(error);
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        font-family: "Segoe UI";
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    .page {
        text-align: right;
    }

    .pagination {
        position: relative;
        margin: 20px;

    }

    .pagination li {
        display: inline-block;
        margin: 0 5px;
    }

    .pagination li a {
        padding: .5rem 1rem;
        display: inline-block;
        border: 1px solid #ddd;
        background: #fff;

        color: #7FDBB0;
    }

    .pagination li a:hover {
        background: #eee;
    }

    .pagination li.active a {
        background: #7FDBB0;
        color: #fff;
    }
</style>