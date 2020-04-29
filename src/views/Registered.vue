<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="el-form2">
        <div>
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" size="small" @keyup.enter.native="sign_up"></el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
                <el-input v-model="form.email" size="small" @keyup.enter.native="sign_up"></el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="密码" prop="password">
                <el-input
                        v-model="form.password"
                        type="password"
                        size="small"
                        @keyup.enter.native="sign_up"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input
                        v-model="form.checkPass"
                        type="password"
                        size="small"
                        @keyup.enter.native="sign_up"
                ></el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item :inline="true" label="验证码" prop="auth_code">
                <div style="width: 72%">
                    <el-input label-position="left"
                              v-model="form.auth_code"
                              size="small"
                              @keyup.enter.native="sign_up"
                    ></el-input>
                    <img label-position="right" :src="captcha" @click="getCaptchaSrc">
                </div>

            </el-form-item>
        </div>
        <div class="btn">
            <el-button type="primary" size="small" @click="sign_up">注册</el-button>
        </div>
    </el-form>

</template>

<script>

    import * as api from "../api";
    import Vue from "vue";

    export default {
        name: "Registered",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    username: "",
                    email: "",
                    password: "",
                    checkPass: "",
                    auth_code: "",
                },
                message: "",
                captcha: "",
                rules: {
                    username: [{required: true, message: "请输入账户", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码", validator: validatePass, trigger: "blur"}],
                    email: [{required: true, message: "请输入email", trigger: "blur"}],
                    auth_code: [{required: true, message: "请输入验证码", trigger: "blur"}],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            getCaptchaSrc() {
                api.getCaptcha().then(v => {
                    this.captcha = v.data.data
                })
            },
            sign_up() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        let {username, password, email, auth_code} = this.form
                        const data = {
                            username: username,
                            password: password,
                            email: email,
                            auth_code: auth_code,
                        }
                        api.sign_up(data).then(res => {
                            if (res.data.status === 0) {
                                Vue.prototype.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'success'
                                });
                                this.$emit('update:dialog',false)
                            }
                        })
                    }
                })
            }
        },
        created() {
            this.getCaptchaSrc();
        }
    }
</script>

<style scoped>
    .el-form2 {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -240px;
        margin-top: -200px;
        width: 400px;
        padding: 50px 40px 40px;
        height: 330px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
    }

</style>