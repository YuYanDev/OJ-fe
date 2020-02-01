<template>
  <div class="login">
    <el-header>DjangoZ OJ</el-header>
    <el-main>
      <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <p class="note" v-show="message">{{ message }}</p>
        <div>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" size="small" @keyup.enter.native="logIn"></el-input>
        </el-form-item>
        </div>
        <div>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" size="small" @keyup.enter.native="logIn"></el-input>
        </el-form-item>
        </div>
        <div class='btn'>
        <!-- <el-form-item class="btn"> -->
          <el-button type="primary" size="small" @click="logIn">登录</el-button>
        <!-- </el-form-item> -->
        </div>
      </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data(){
    return {
      message: '',
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    }
  },
  methods:{
    logIn() {
      window.console.log("username:",this.form.username,"password:",this.form.password)
    }
  }
}
</script>

<style>
.login {
  padding: 0 20px;
  height: 100%;
  background: #6cb7f5;
  flex-direction: column;
}
.el-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  line-height: 60px;
  font-size: 20px;
  font-weight: 500;
  color: rgb(252, 248, 248);
}
.el-form {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -240px;
  margin-top: -200px;
  width: 400px;
  padding: 50px 40px 40px;
  height: 200px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
}
.note {
  position: absolute;
  text-align: center;
  color: black;
  font-size: 15px;
  width: 100%;
  top: 10px;
  left: 0;
}
.btn {
  text-align: center;
}
.el-button {
  margin-left: -80px;
}
.bg {
  position: absolute;
  background: darkcyan;
  height: 50%;
  width: 100%;
  z-index: -1;
  left: 0;
}
.el-footer {
  font-size: 12px;
  color: #999;
  padding: 0 12px;
  position: relative;
}
ul {
  list-style: none;
  display: flex;
  justify-content: center;
}
ul li a {
  color: #999;
}
ul li a:hover {
  color: #0000cc;
}
ul li a:visited {
  color: #0000cc;
}
</style>