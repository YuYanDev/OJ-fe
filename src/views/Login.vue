<template>
    <div class="login">
        <el-header>DjangoZ OJ</el-header>
        <el-main>
            <div>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="el-form">
                    <p class="note" v-show="message">{{ message }}</p>
                    <div>
                        <el-form-item label="账号" prop="username">
                            <el-input v-model="form.username" size="small" @keyup.enter.native="log_in"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="密码" prop="password">
                            <el-input
                                    v-model="form.password"
                                    type="password"
                                    size="small"
                                    @keyup.enter.native="log_in"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item :inline="true" label="验证码" prop="auth_code">
                            <el-input label-position="left"
                                      v-model="form.auth_code"
                                      size="small"
                                      @keyup.enter.native="log_in"
                            ></el-input>
                            <img label-position="right" :src="captcha" @click="getCaptchaSrc">
                        </el-form-item>
                    </div>
                    <div class="btn">
                        <!-- <el-form-item class="btn"> -->
                        <el-button type="primary" size="small" @click="log_in">登录</el-button>
                        <!-- </el-form-item> -->
                    </div>
                </el-form>
            </div>
        </el-main>
    </div>
</template>

<script>
    import {login, getCaptcha} from "../api/index";
    import {mapActions} from "vuex";

    export default {
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
            ...mapActions(['changeModalStatus', 'getProfile']),
            log_in() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        window.console.log(
                            "username:",
                            this.form.username,
                            "password:",
                            this.form.password
                        );
                        let {username, password, auth_code} = this.form;
                        const data = {username: username.trim(), password: password, auth_code: auth_code.trim()}
                        login(data).then(v => {
                            let status = v.data.status;
                            if (status === 0) {
                                this.message = "登录成功";
                                this.getProfile()
                                this.$router.push({path: "/home"});
                            } else {
                                this.getCaptchaSrc()
                            }
                        })
                    }
                })
            },

            getCaptchaSrc() {
                getCaptcha().then(v => {
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
    .el-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        line-height: 60px;
        font-size: 20px;
        font-weight: 500;
        color: rgb(252, 248, 248);
    }

    .login {
        padding: 0 20px;
        height: 100%;
        background: #6cb7f5;
        flex-direction: column;
    }

    .el-form {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -240px;
        margin-top: -200px;
        width: 400px;
        padding: 50px 40px 40px;
        height: 320px;
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
</style>