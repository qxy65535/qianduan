<template>
    <div style="margin: 0 30px">
        <div style="float:left">
        <header>
            <div class="current-tool">
                <i :class="currentTool"></i>
                <input type="hidden" name="currentTool" v-model="currentToolNum">
            </div>
            <ul class="tool-info clearfix">
                <li class="lineWidth">
                    <p>手写数字识别</p>
                </li>
            </ul>
            <div class="downloadImage" @click="downloadImage()">确认</div>
            <div class="clearScreen" @click="clearScreen()">清屏</div>
        </header>
        <main class="clearfix">
            <div style="width:300px; margin:0 auto">
                <canvas id="drawing-board" width="300px" height="300px" @mousedown="painting($event)"></canvas>
            </div>
        </main>
    </div>
        
        <div class="clearfix" style="width:550px; margin:30px auto; float:left">
            <predict-table :recoResult="recoResult" :probability="probability" > </predict-table>
        </div>

        <!--公用透明背景遮罩，作用：防止其他元素相应事件-->

    </div>
</template>


<script>
    import axios from "axios"
    import Predict from "../components/Predict"

    export default {
        name: 'HandwtReco',
        components: {
            'predict-table': Predict
        },
        data() {
            return {
                currentTool: 'iconfont icon-maobi',
                currentToolNum: '1',
                tools: [
                    { dataTool: '1', toolClass: 'iconfont icon-maobi' },
                ],
                selectedToolIndex: '0',
                lineWidth: '30',
                startx: 999,
                starty: 999,
                endx: 0,
                endy: 0,
                recoResult: [],
                probability: [],
            }

        },
        mounted() {
            var canvas = $(document).find('canvas'),
                ctx = canvas[0].getContext('2d');
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width(), canvas.height());
            for (var i=0; i<10; i++)
                this.probability.push({"index": i, "gl121":"", "sgl1":"", "mlp":""})
        },
        methods: {

            //画板 ~绘制
            painting: function (e) {
                var _self = this,
                    canvas = $(e.target),
                    ctx = canvas[0].getContext('2d'),
                    canvasAttribute = {
                        width: parseInt(this.getAttrValue(canvas, 'width', 'px')),
                        height: parseInt(this.getAttrValue(canvas, 'height', 'px')),
                        left: parseInt(canvas.position().left),
                        top: parseInt(canvas.position().top)
                    },
                    moving = false;
                $(document).on('mousedown', 'canvas', function (e) {
                    e.stopImmediatePropagation();

                    moving = true;

                    ctx.beginPath();
                    ctx.lineCap = "round";
                    ctx.strokeStyle = '#' + _self.pageLineColor;
                    ctx.lineWidth = _self.lineWidth;
                    var x = e.pageX - canvas.offset().left;
                    var y = e.pageY - canvas.offset().top;
                    ctx.moveTo(x, y);

                });
                $(document).on('mousemove', 'canvas', function (e) {
                    e.stopImmediatePropagation();

                    if (!moving) return false;
                    var x = e.pageX - canvas.offset().left;
                    var y = e.pageY - canvas.offset().top;
                    ctx.lineTo(x, y);
                    ctx.stroke();

                    if (x < _self.startx)
                        _self.startx = x;
                    if (y < _self.starty)
                        _self.starty = y;
                    if (x > _self.endx)
                        _self.endx = x;
                    if (y > _self.endy)
                        _self.endy = y;
                    // console.log(_self.startx, _self.starty, _self.endx, _self.endy)
                });
                $(document).on('mouseup', function (e) {
                    e.stopImmediatePropagation();

                    moving = false;
                    ctx.closePath();

                });
            },
            //画板 ~下载
            downloadImage: function () {
                var canvas = $(document).find('canvas');
                var context = canvas[0].getContext('2d');

                var type = 'png';
                var imageData = canvas[0].toDataURL(type).replace(this.fixType(type), 'image/octet-stream');
                var vm = this;
                axios({
                    url: '/recognition',
                    method: 'post',
                    data: {
                        "imageData": imageData,
                        "x": Math.round(vm.startx - 30) > 0 ? Math.round(vm.startx - 30) : 0,
                        "y": Math.round(vm.starty - 30) > 0 ? Math.round(vm.starty - 30) : 0,
                        "endx": Math.round(vm.endx + 30) < 300 ? Math.round(vm.endx + 30) : 300,
                        "endy": Math.round(vm.endy + 30) < 300 ? Math.round(vm.endy + 30) : 300
                    },
                    contentType: "application/json",
                }).then((result) => {
                    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    // $vm.$img2Url 详情见本页末尾

                    if (result.data.success) {
                        // alert(pos)
                        vm.recoResult = result.data.res.result;
                        vm.probability = result.data.res.probability;
                        vm.feature = result.data.res.feature;
                    }
                    else
                        alert(result.data.message);
                }).catch((error) => {
                    alert(error);
                })
                // this.saveFile(imageData, filename);
            },
            fixType: function (type) {
                type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
                var r = type.match(/png|jpeg|bmp|gif/)[0];
                return 'image/' + r;
            },

            // 画板 ~清屏
            clearScreen: function () {
                var canvas = $(document).find('canvas'),
                    ctx = canvas[0].getContext('2d');
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width(), canvas.height());
                this.startx = 999;
                this.starty = 999;
                this.endx = 0;
                this.endy = 0;
                this.recoResult = [];
                this.probability = [];
                this.feature = []
                for (var i=0; i<10; i++)
                    this.probability.push({"index": i, "gl121":"", "sgl1":"", "mlp":""})
            },
            //=========== 方法区 ===========
            // 获取属性的具体数值 #
            getAttrValue: function (target, attr, unit) {
                unit = unit || "";
                return '' + target.css(attr).replace(unit, '');
            },



        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @font-face {
        font-family: "iconfont";
        src: url('../assets/style/css/fonts/iconfont.eot?t=1491041968319');
        /* IE9*/
        src: url('../assets/style/css/fonts/iconfont.eot?t=1491041968319#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../assets/style/css/fonts/iconfont.woff?t=1491041968319') format('woff'), /* chrome, firefox */
        url('../assets/style/css/fonts/iconfont.ttf?t=1491041968319') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        url('../assets/style/css/fonts/iconfont.svg?t=1491041968319#iconfont') format('svg');
        /* iOS 4.1- */
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }


    .icon-maobi:before {
        content: "\e632";
    }

    * {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
    }




    header {
        width: 400px;
        height: 45px;
        margin: 0 auto;
        margin-top: 30px;
        background-color: rgb(81, 81, 81);
    }

    .current-tool {
        float: left;
        width: 34px;
        height: 34px;
        margin: 5px;
        border: 1px solid #dddddd;
    }

    .current-tool>i {
        display: block;
        font-size: 25px;
        color: rgb(213, 213, 213);
        line-height: 34px;
        text-align: center;
    }

    .tool-info {
        float: left;
        margin-left: 32px;
        line-height: 45px;
        color: #e2f0f0;
    }





    .tool-info>li p {
        float: left;
        font-size: 16px;
    }

    .tool-info .lineWidth input {
        float: left;
        -webkit-appearance: none;
        border: 1px solid #666666;
        outline: none;
        margin-top: 14px;
        margin-left: 10px;
        width: 46px;
        height: 16px;
        border-radius: 2px;
        color: #fff;
        background-color: #454545;
    }



    .clearScreen {
        float: right;
        margin-right: 20px;
        line-height: 45px;
        font-size: 16px;
        color: #e2f0f0;
        user-select: none;
        cursor: pointer;
    }

    .downloadImage {
        float: right;
        margin-right: 10px;
        line-height: 45px;
        font-size: 16px;
        color: #e2f0f0;
        user-select: none;
        cursor: pointer;
    }

    main {
        width: 500px;
        margin: 0 auto;
        margin-top: 10px;
    }

    #drawing-board {
        display: block;
        float: left;
        background-color: #fff;
        user-select: none;
        border: 5px solid #c3c3c3;
    }

    .clearfix {
        zoom: 1;
    }

    .clearfix:after {
        clear: both;
        content: ".";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
    }

</style>