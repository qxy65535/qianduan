<template>
    <div id="editor">
        <mavon-editor style="height: 100%" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel">
        </mavon-editor>
    </div>
</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import axios from 'axios'

    export default {
        name: 'editor',
        components: {
            mavonEditor
            // or 'mavon-editor': mavonEditor
        },
        methods: {
            // 绑定@imgAdd event
            $imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                var vm = this.$refs.md;
                axios({
                    url: '/imgAdd',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((result) => {
                    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    // $vm.$img2Url 详情见本页末尾

                    if (result.data.success) {
                        // alert(pos)
                        vm.$img2Url(pos, result.data.url);
                        vm.$refs.toolbar_left.$imgDelByFilename(pos);
                    }
                    else
                        alert(result.data.message);
                }).catch((error) => {
                    alert(error);
                })
            },
            $imgDel(filename) {
                // alert(filename)
                // var formdata = new FormData();
                // formdata.append('filename', filename);
                // var vm = this.$refs.md;
                // axios({
                //     url: 'http://localhost:8081/imgDel',
                //     method: 'post',
                //     data: formdata,
                //     headers: { 'Content-Type': 'multipart/form-data' },
                // }).then((result) => {
                //     alert(result.data.message);
                // }).catch((error) => {
                //     alert(error);
                // })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #editor {
        margin: auto;
        width: 80%;
        height: 580px;
    }
</style>