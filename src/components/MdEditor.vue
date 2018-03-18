<template>
    <div id="editor">
        <mavon-editor 
            style="height: 100%" 
            ref=md 
            @imgAdd="$imgAdd" 
            @imgDel="$imgDel">
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
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'http://localhost:8081/images',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
               // $vm.$img2Url 详情见本页末尾
               $vm.$img2Url(pos, url);
           })
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