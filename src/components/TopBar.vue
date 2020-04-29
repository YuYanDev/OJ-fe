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
            <div class="user-bg">
                <div v-if="!isAuthenticated">
                    <el-menu-item index="4">
                        <el-button @click="dialogFormVisible = true">登录</el-button>
                        <el-dialog :visible.sync="dialogFormVisible" center :lock-scroll="false" :show-close=true
                                   width="30%"
                                   top="20%">
                            <Login></Login>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                            </div>
                        </el-dialog>
                    </el-menu-item>
                </div>
                <div v-else>
                    <el-submenu index="4">
                        <template slot="title">{{user.username}}</template>
                        <el-menu-item index="4-1">主页</el-menu-item>
                        <div v-if="isAdminRole">
                            <el-menu-item index="4-2">Admin</el-menu-item>
                        </div>
                        <el-menu-item index="4-3" @click="logout">登出</el-menu-item>
                    </el-submenu>
                </div>
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


    export default {
        name: "TopBar",
        components: {Login},
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
                dialogFormVisible: false
            }
        },
        methods: {
            ...mapActions(['clearProfile', 'getProfile', 'setProfile']),
            logout() {
                logout().then(() => {
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

    .user-bg {
        float: right;
        right: 10px;
    }
</style>