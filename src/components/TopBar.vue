<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal">
            <div class="logo">
                <span>HBUT OJ</span>
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
                    <div v-if="!isAuthenticated">
                        <el-menu-item index="4-1">
                            <el-button @click="login">登录</el-button>
                        </el-menu-item>
                    </div>
                    <div v-else>
                        <el-submenu index="4-1">
                            <template slot="title">{{user.username}}</template>
                            <el-menu-item index="4-1">主页</el-menu-item>
                            <div v-if="isAdminRole">
                                <el-menu-item index="4-2">Admin</el-menu-item>
                            </div>
                            <el-menu-item index="4-3" @click="logout">登出</el-menu-item>
                        </el-submenu>
                    </div>
                </el-menu-item>
            </div>
        </el-menu>
        <h1>{{user.username}}, {{user.last_login_at}}</h1>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {logout} from "../api";

    export default {
        name: "TopBar",
        props: {
            msg: String
        },
        methods: {
            ...mapActions(['clearProfile']),
            login() {
                this.$router.push({path: "/login"});
            },
            logout() {
                logout().then(res => {
                    window.console.log(res)
                    this.clearProfile()
                })
            }
        },
        computed: {
            ...mapGetters(['user', 'isAuthenticated', 'isAdminRole']),
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