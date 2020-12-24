<template>
  <div class="Login">
    <img class="Login_img" src="@/assets/img/logo.png" alt="" />
    <h1 class="Login_h1">
      歡迎進入Dolfan的世界
    </h1>
    <div class="Login_input">
      <p>電子郵件</p>
      <input type="text" v-model="dataForm.email" />
    </div>
    <div class="Login_input">
      <p>密碼</p>
      <input type="password" v-model="dataForm.password" />
    </div>
    <button class="Login_button" @click="loginSubmit()">登入</button>
    <div class="Login_box">
      <h2 class="Login_box_h2">第一次使用？使用第三方登入快速登入吧！</h2>
      <div class="Login_box_div">
        <!-- <img src="@/assets/img/login1.png" alt="" /> 
        <img src="@/assets/img/login2.png" alt="" /> -->
        <fb-signin-button
          class="Login_box_div_button1"
          :params="fbSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          <img src="@/assets/img/login11.png" alt="" />
          使用Facebook帳號登入
        </fb-signin-button>
        <button v-google-signin-button="clientId" class="google-signin-button Login_box_div_button2">
          <img src="@/assets/img/login22.png" alt="" />
          使用Google登入
        </button>
        <!-- <img src="@/assets/img/login3.png" alt="" />
        <img src="@/assets/img/login4.png" alt="" /> -->
        <div class="Login_box_div_box">
          <button class="Login_box_div_left" @click="toForgetPassword()">
            忘記密碼？
          </button>
          <button class="Login_box_div_right" @click="toRegistered()">
            +註冊帳號
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import jsonwebtoken from "jsonwebtoken";
import { POST_Login, POST_ThirdPartyLogin, GET_GetUserInfo } from "@/api/api";
export default {
  name: "Login",
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      fbSignInParams: {
        // scope: "email,user_likes",
        return_scopes: true
      },
      clientId:
        "1013532850136-tnqg9pau20ninqts0e70efq7ar6o2528.apps.googleusercontent.com",
      // 測試谷歌ID
      // "763411011541-2k3ndn3e9h1plo1ivcep0ckj9p46d5sk.apps.googleusercontent.com",
      dataForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    // fb登录成功
    onSignInSuccess(response) {
      let form = {
        open_id: response.authResponse.userID,
        type: "facebook"
      };
      POST_ThirdPartyLogin(form).then(res => {
        if (res.code == 200) {
          sessionStorage.setItem("tokenType", res.data.token_type + " ");
          sessionStorage.setItem(
            "token",
            res.data.token_type + " " + res.data.token
          );
          // 获取个人信息
          GET_GetUserInfo().then(res => {
            if (res.code == 200) {
              if (res.data.is_set_user_category == false) {
                this.$router.push("InterestedContent");
              } else {
                this.$router.push("/Home");
              }
            }
          });
        }
      });
    },
    // fb登录报错
    onSignInError(error) {
      console.log(error);
    },
    // 谷歌登录成功
    OnGoogleAuthSuccess(idToken) {
      var jwt = require("jsonwebtoken");
      var form = jwt.decode(idToken);
      let data = {
        open_id: form.sub,
        type: "google",
        nick_name: form.name,
        email: form.email
      };
      POST_ThirdPartyLogin(data).then(res => {
        if (res.code == 200) {
          sessionStorage.setItem("tokenType", res.data.token_type + " ");
          sessionStorage.setItem(
            "token",
            res.data.token_type + " " + res.data.token
          );
          // 获取个人信息
          GET_GetUserInfo().then(res => {
            if (res.code == 200) {
              if (res.data.is_set_user_category == false) {
                this.$router.push("InterestedContent");
              } else {
                this.$router.push("/Home");
              }
            }
          });
        }
      });
    },
    // 谷歌登录报错
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    // 路由跳忘记密码页面
    toForgetPassword() {
      this.$router.push("ForgetPassword");
    },
    // 路由跳注册账号页面
    toRegistered() {
      this.$router.push("/Registered");
    },
    // 登录提交
    loginSubmit() {
      POST_Login(this.dataForm).then(res => {
        if (res.code == 200) {
          sessionStorage.setItem("tokenType", res.data.token_type + " ");
          sessionStorage.setItem(
            "token",
            res.data.token_type + " " + res.data.token
          );
          // 获取个人信息
          GET_GetUserInfo().then(res => {
            if (res.code == 200) {
              if (res.data.is_set_user_category == false) {
                this.$router.push("InterestedContent");
              } else {
                this.$router.push("/Home");
              }
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Login {
  width: 100%;
  min-height: 100vh;
  padding: 70px 15px 0;
  text-align: center;
  background-image: url("../../assets/img/bjImg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .Login_h1 {
    margin-top: 10px;
    text-align: center;
    padding: 0 15px;
    font-size: 12px;
    font-weight: 400;
    color: #585858;
    line-height: 17px;
  }
  .Login_input {
    margin-top: 40px;
    width: 100%;
    height: 32px;
    text-align: left;
    position: relative;
    p {
      position: absolute;
      left: 15px;
      top: -20px;
      font-size: 14px;
      font-family: PingFangTC-Medium, PingFangTC;
      font-weight: 500;
      color: #585858;
      line-height: 20px;
    }
    input {
      padding: 0 15px;
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #c0cad3;
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
    }
  }
  .Login_button {
    margin-top: 36px;
    margin-bottom: 80px;
    width: 100%;
    height: 32px;
    background: #1db3ce;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    line-height: 32px;
  }
  .Login_box {
    border-top: 2px solid #c0cad3;
    // padding: 0 13px;
    .Login_box_h2 {
      // text-align: left;
      margin: 20px 0;
      font-size: 12px;
      font-weight: 400;
      color: #585858;
      line-height: 17px;
    }
    .Login_box_div {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .Login_box_div_button1 {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 48%;
        height: 32px;
        background: #4267B2;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 16px;
        img {
          width: 18px;
          height: 18px;
        }
      }
      .Login_box_div_button2 {
        display: flex;
        align-items: center;
        width: 48%;
        height: 32px;
        background: #4267B2;
        border-radius: 1px;
        font-size: 11px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 16px;
        img {
          margin-left: 1px;
          margin-right: 21px;
          width: 31px;
          height: 30px;
        }
      }
      .Login_box_div_box {
        padding: 30px 15px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        .Login_box_div_left {
          font-size: 12px;
          font-weight: 500;
          color: #c64040;
          line-height: 17px;
        }
        .Login_box_div_right {
          text-decoration: underline;
          font-size: 12px;
          font-weight: 500;
          color: #1db3ce;
          line-height: 17px;
        }
      }
    }
  }
}
</style>
