<template>
    <div>
        <div class="title">
            <span>标题：</span>
            <input id="title" type="text" name="name" v-model="title" />
        </div>
        <div class="tag">
            <span>标签：</span>
            <tag-input :source.sync="tags"></tag-input>
        </div>
        <div class="private_choice">
            <span>可见性：</span>
            <label>
                <input type="radio" name="privacy" v-model="privacy" value=false>公开&nbsp;&nbsp;
            </label>
            <label>
                <input type="radio" name="privacy" v-model="privacy" value=ture>私有
            </label>
            <button class="button" @click="publish">发表</button>
        </div>
        <div id="editor">
            <mavon-editor style="height: 100%" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel">
            </mavon-editor>
        </div>
    </div>
</template>

<!--[if lt IE 9]><script>(function(a,b){a="abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video".split(" ");for(b=a.length-1;b>=0;b--)document.createElement(a[b])})()</script><![endif]-->

<script>
    import { mavonEditor } from 'mavon-editor'
    import tag from './TagInput'
    import 'mavon-editor/dist/css/index.css'
    import axios from 'axios'
    


    export default {
        name: 'editor',
        components: {
            mavonEditor,
            "tag-input": tag
            // or 'mavon-editor': mavonEditor
        },
        props: {
            newly: {
                default: true
            }
        },
        data() {
            return {
                tags: [],
                title: "",
                privacy: false,
            }
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

            },
            publish() {
                var vm = this;
                // console.log(vm.title)
                // var a = vm.tags
                // alert(['啊', '饿', '的'])
                // console.log(vm.privacy)
                // console.log(vm.$refs.md.d_value)
                if (vm.title.length == 0) {
                    alert("取个题目吧 :)");
                    return;
                }
                if (vm.tags.length == 0) {
                    alert("建个标签吧 :)");
                    return;
                }
                if (vm.$refs.md.d_value.length == 0) {
                    alert("写点内容吧 :)");
                    return;
                }
                axios({
                    url: '/publish',
                    method: 'post',
                    data: {
                        "title": vm.title,
                        "tag": vm.tags,
                        "privacy": vm.privacy,
                        "article": vm.$refs.md.d_value
                    },
                    contentType : "application/json" ,

                }).then((result) => {
                    if (result.data.success) {
                        vm.$router.push({
                            path: '/article/detail', 
                            query: {id: result.data.res.id}
                        });
                    } else {
                        alert(result.data.message);
                    }
                }).catch((error) => {
                    alert(error);
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

    span {
        float: left;
        ;
    }

    .title,
    .tag,
    .private_choice {
        margin: 30px auto;
        width: 80%;
    }

    #title {
        width: 500px;
    }



    .button {
        border: none;
        color: #fff;
        text-shadow: 1px 1px 0 rgba(0, 0, 0, .5);
        cursor: pointer;
    }

    .button:active {
        position: relative;
        top: 1px;
    }

    /* supprime la bordure de sélection 
*:focus{
  outline:none;
}*/

    .button {
        width: 80px;
        height: 40px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        box-shadow: inset 0 0 0 1px #617586, inset 0 0 40px 5px rgba(0, 0, 0, .3), 0 0 2px 1px rgba(0, 0, 0, .5);
        display: block;
        float: right;
        background: #4a5e6f;
        text-align: center;
        line-height: 40px;
    }

    .button:hover {
        box-shadow: inset 0 0 0 1px #617586, inset 0 0 40px 5px rgba(0, 0, 0, .25), 0 0 2px 1px rgba(0, 0, 0, .5);
    }

    .button:focus {
        outline: 0;
    }
</style>