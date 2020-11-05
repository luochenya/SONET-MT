<template>
  <div class="ForgetPassword">
    <img class="ForgetPassword_img" src="@/assets/img/logo.png" alt="" />
    <h1 class="ForgetPassword_h1">
      忘記Dolfan密碼
    </h1>
    <div class="ForgetPassword_input">
      <p><i>*</i>電子郵件</p>
      <input
        type="text"
        placeholder="請輸入您的電子郵件，我們將傳送新密碼給您。"
        v-model="email"
      />
    </div>
    <button class="ForgetPassword_button" @click="submit()">沒有收到嗎？<em>再次傳送</em></button>
    <button class="ForgetPassword_submit" @click="submit()">傳送</button>

    <van-popup
      class="ForgetPassword_popup"
      v-model="show"
      :close-on-click-overlay="false"
    >
      <h1 class="ForgetPassword_popup_h1">密碼已寄出</h1>
      <h2 class="ForgetPassword_popup_h2">新密碼已寄至您填寫的信箱</h2>
      <h2 class="ForgetPassword_popup_h2">請前往收信</h2>
      <button class="ForgetPassword_popup_button" @click="show = false">
        確認
      </button>
    </van-popup>
  </div>
</template>

<script>
import { POST_ForgotPassword } from "@/api/api";
export default {
  name: "ForgetPassword",
  data() {
    return {
      email: "",
      show: false
    };
  },
  methods: {
    // 传送
    submit() {
      // 判断不能为空
      if (!this.email) {
        return this.$toast({
          message: "郵箱不能為空！",
          position: "top"
        });
      }
      // 判断正则格式
      let emailVerification = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailVerification.test(this.email)) {
        return this.$toast({
          message: "郵箱格式錯誤！",
          position: "top"
        });
      }
      let form = {
        email: this.email
      };
      POST_ForgotPassword(form).then(res => {
        if (res.code == 200) {
          this.show = true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ForgetPassword {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 70px 15px 0;
  text-align: center;
  background-image: url("../../assets/img/bjImg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .ForgetPassword_h1 {
    margin-top: 10px;
    padding: 0 15px;
    font-size: 12px;
    font-weight: 400;
    color: #585858;
    line-height: 17px;
  }
  .ForgetPassword_input {
    margin-top: 35px;
    position: relative;
    width: 100%;
    padding-top: 20px;
    p {
      position: absolute;
      left: 15px;
      top: 0;
      font-size: 14px;
      font-family: PingFangTC-Medium, PingFangTC;
      font-weight: 500;
      color: #585858;
      line-height: 20px;
      i {
        color: #d51901;
        margin-right: 5px;
      }
    }
    input {
      width: 100%;
      height: 32px;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #c0cad3;
      padding: 0 15px;
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
    }
    input::-webkit-input-placeholder {
      color: #c6c6c6;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .ForgetPassword_button {
    margin-top: 32px;
    display: flex;
    margin-left: auto;
    font-size: 12px;
    font-weight: 500;
    color: #1db3ce;
    line-height: 17px;
    em {
      text-decoration: underline;
    }
  }
  .ForgetPassword_submit {
    position: absolute;
    bottom: 40px;
    left: calc(50% - 69px);
    width: 138px;
    height: 32px;
    background: #1db3ce;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    line-height: 20px;
  }
  .ForgetPassword_popup {
    padding: 30px 0;
    width: 240px;
    height: 204px;
    background: #ffffff;
    box-shadow: 0px 0px 54px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: 1px solid;
    border-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0)
      )
      1 1;
    .ForgetPassword_popup_h1 {
      margin-bottom: 6px;
      font-size: 20px;
      font-weight: 500;
      color: #1db3ce;
      line-height: 28px;
    }
    .ForgetPassword_popup_h2 {
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
    }
    .ForgetPassword_popup_button {
      margin-top: 36px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      line-height: 20px;
      width: 138px;
      height: 32px;
      background: #1db3ce;
      border-radius: 16px;
    }
  }
}
</style>
