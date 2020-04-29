<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="el-form1">

            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" size="small" @keyup.enter.native="log_in"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                        v-model="form.password"
                        type="password"
                        size="small"
                        @keyup.enter.native="log_in"
                ></el-input>
            </el-form-item>
        <el-form-item :inline="true" label="验证码" prop="auth_code">
            <div style="width: 72%">
                <el-input label-position="left"
                          v-model="form.auth_code"
                          size="small"
                          @keyup.enter.native="log_in"
                ></el-input>
                <img label-position="right" :src="captcha" @click="getCaptchaSrc">
            </div>

        </el-form-item>
        <div class="btn">
            <el-button type="primary" size="small" @click="log_in">登录</el-button>
        </div>
    </el-form>
</template>

<script>
    import {mapActions} from "vuex";
    import * as api from "../api";

    export default {
        name: "Login",
        data() {
            return {
                message: "",
                form: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [{required: true, message: "请输入账户", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}],
                    auth_code: [{required: true, message: "请输入验证码", trigger: "blur"}]
                },
                captcha: '',
            };
        },
        methods: {
            ...mapActions(['getProfile']),
            log_in() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        let {username, password, auth_code} = this.form;
                        const data = {username: username.trim(), password: password, auth_code: auth_code.trim()}
                        api.login(data).then(v => {
                            let status = v.data.status;
                            if (status === 0) {
                                this.message = "登录成功";
                                this.getProfile().then(() => {
                                    this.$emit('update:dialog',false)
                                });
                            } else {
                                this.getCaptchaSrc()
                            }
                        })
                    }
                })
            },

            getCaptchaSrc() {
                api.getCaptcha().then(v => {
                    this.captcha = v.data.data
                })
            }
        },
        created() {
            // this.getData();
            this.getCaptchaSrc();
            window.console.log("created");
        }
    };
</script>

<style>

    .el-form1 {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -240px;
        margin-top: -200px;
        width: 400px;
        padding: 50px 40px 40px;
        height: 250px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
    }

    .btn {
        text-align: center;
    }
</style>