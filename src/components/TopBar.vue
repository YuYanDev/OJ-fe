<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <div class="logo">
        <span>DjangoZ OJ</span>
      </div>
      <el-menu-item index="1">
        <a href="/home">主页</a>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <div class="user-bg">
        <el-menu-item index="4">
          <div v-if="!login_state">
            <el-menu-item index="4-1">
              <el-button @click="login">登录</el-button>
            </el-menu-item>
          </div>
          <div v-else>
            <el-button>{{username}}</el-button>
            <el-menu-item index="4-2">
              <el-button @click="logout">登出</el-button>
            </el-menu-item>
          </div>
        </el-menu-item>
      </div>
    </el-menu>
    <h1>aaa {{username}}, {{login_state}}</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "TopBar",
  props: {
    msg: String
  },
  methods: {
    ...mapActions(["logOut"]),
    login() {
      this.$router.push({ path: "/login" });
    },
    logout() {
      window.console.log("logout");
      self.logOut().then(() => {
        window.console.log("logout");
      });
    }
  },
  computed: {
    ...mapState({
      login_state: state => state.user.login_state,
      username: state => state.user.username
    })
  }
};
</script>

<style>
.logo {
  margin-left: 2%;
  margin-right: 2%;
  font-size: 20px;
  float: left;
  line-height: 60px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.user-bg {
  float: right;
  margin-right: 30px;
  position: absolute;
  right: 10px;
}
</style>