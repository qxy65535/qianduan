<template>
    <div id="floater">
      <div id="content">
        <div class="input-suffix">
          用户名：
          <el-input class="input" placeholder="请输入用户名" v-model="username" clearable>
          </el-input>
        </div>
        <div class="input-suffix">
          密&nbsp;&nbsp;&nbsp;&nbsp;码：
          <el-input class="input" placeholder="请输入密码" v-model="password" type="password" clearable>
          </el-input>
        </div>
        <el-button type="primary" round @click="login()">登录</el-button>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        var vm = this
        this.axios({
          url: '/login',
          method: 'post',
          data: {
            username: vm.username,
            password: vm.password
          },
          contentType: 'application/json'
  
        }).then((result) => {
            if (result.response) {
                alert(result);
                return;
            }
          if (result.data.success) {
            vm.$router.push({
              path: '/'
            })
          } else {
            alert(result.data.message)
          }
        }).catch((error) => {
          alert(error)
        })
      }
    }
  }
  </script>
  
  <style>
  #floater {
    height: 500px;
    position: relative;
  }
  
  #content {
    width: 300px;
    height: 400px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  
  .input-suffix {
    margin: 40px 0 40px 0;
  }
  
  .input {
    width: 210px;
  }
  </style>
  