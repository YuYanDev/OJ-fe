<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal" menu-trigger="click">
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
            <div v-if="!isAuthenticated" class="user-bg">
                <div class="user-bg-item">
                    <el-button @click="dialogSignIn = true" round>注册</el-button>
                    <el-dialog :visible.sync="dialogSignIn" center :lock-scroll="true" :show-close=true
                                width="30%"
                                top="20%">
                        <Registered :dialog.sync="dialogSignIn"></Registered>
                    </el-dialog>
                </div>
                <div class="user-bg-item">
                    <el-button @click="dialogLogin = true" round>登录</el-button>
                    <el-dialog :visible.sync="dialogLogin" center :lock-scroll="true" :show-close=true
                                width="30%"
                                top="20%">
                        <Login :dialog.sync="dialogLogin"></Login>
                    </el-dialog>
                </div>
            </div>
            <div v-else>
                <el-submenu index="4" class="user-bg">
                    <template slot="title">{{user.username}}</template>
                    <el-menu-item index="4-1">主页</el-menu-item>
                    <div v-if="isAdminRole">
                        <el-menu-item index="4-2">Admin</el-menu-item>
                    </div>
                    <el-menu-item index="4-3" @click="logout">登出</el-menu-item>
                </el-submenu>
            </div>
        </el-menu>
        <h1>{{user.username}}, {{user.last_login_at}}</h1>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {logout} from "../api";
    import Login from "../views/Login";
    import storage from '@/utils/storage'
    import {STORAGE_KEY} from '@/utils/constants'
    import Registered from "../views/Registered";


    export default {
        name: "TopBar",
        components: {Login, Registered},
        props: {
            msg: String
        },
        created() {
            let profile = storage.get(STORAGE_KEY.AUTHED);
            if (profile) {
                this.setProfile(profile)
            }
        },
        data() {
            return {
                dialogLogin: false,
                dialogSignIn: false
            }
        },
        methods: {
            ...mapActions(['clearProfile', 'getProfile', 'setProfile']),
            logout() {
                logout().then(() => {
                    this.clearProfile()
                })
            },
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

    .user-bg:focus{
        outline:none
    }

    .user-bg-item {
        float: right;
        line-height: 60px;
    }
</style>