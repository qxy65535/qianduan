<template>

</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    // import axios from 'axios'

    export default {
        name: 'Logout',

        mounted() {
            var vm = this;
            this.axios({
                url: '/logout',
                method: 'post',
            }).then((result) => {
                if (result.response) {
                    alert(result);
                    return;
                }
                if (result.data.success) {
                    alert(result.data.message)
                    vm.$router.push({
                    path: '/'
                    })
                }
            }).catch((error) => {
                alert(error);
            })
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