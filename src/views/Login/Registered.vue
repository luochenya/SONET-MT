<template>
  <div class="Registered">
    <img class="Registered_img" src="@/assets/img/logo.png" alt="" />
    <h1 class="Registered_h1">
      註冊成為Dolfan會員
    </h1>
    <!-- 电子邮件 -->
    <div class="Registered_input Registered_inputs">
      <p>
        <i>*</i>
        電子郵件
      </p>
      <input
        type="text"
        v-model="dataForm.email"
        @change="verification('email')"
      />
      <div v-if="emailStatus">
        没有收到？<button @click="send()">再次傳送</button>
      </div>
      <div v-if="!emailStatus">
        <button @click="send()">寄送驗證信</button>
      </div>
      <span v-if="emailTitleStatus">電子郵件有誤</span>
    </div>
    <!-- 請輸入驗證碼 -->
    <div class="Registered_input">
      <p>
        <i>*</i>
        請輸入驗證碼
      </p>
      <input
        type="text"
        v-model="dataForm.code"
        @change="verification('code')"
      />
      <span v-if="codeTitleStatus">驗證碼有誤</span>
    </div>
    <!-- 請設定密碼 -->
    <div class="Registered_input">
      <p>
        <i>*</i>
        請設定密碼
      </p>
      <input
        type="password"
        v-model="dataForm.password"
        @change="verification('password')"
      />
      <span v-if="passwordTitleStatus">請輸入英數混合至少6位數的密碼</span>
    </div>
    <!-- 請再次輸入密碼 -->
    <div class="Registered_input">
      <p>
        <i>*</i>
        請再次輸入密碼
      </p>
      <input
        type="password"
        v-model="dataForm.password_confirmation"
        @change="verification('passwordConfirmation')"
      />
      <span v-if="passwordConfirmationTitleStatus">密碼不一致</span>
    </div>
    <!-- 昵称 -->
    <div class="Registered_box">
      <div class="Registered_box_input">
        <p>
          <i>*</i>
          暱稱
        </p>
        <input type="text" v-model="dataForm.nick_name" />
      </div>
      <!-- 按钮 -->
      <div class="Registered_box_div">
        <div
          class="Registered_box_div_top"
          @click="checkoutStatus = !checkoutStatus"
        >
          <div>
            <img v-if="checkoutStatus" src="@/assets/img/checkout.png" alt="" />
          </div>
          本人同意 Dolfan的 <i @click="privacyPolicyClick()">隱私政策</i>與<i @click="TermsClick()">使用條款</i>
        </div>
        <div class="Registered_box_div_bottom">
          <button @click="toLogin()">上一步</button>
          <button @click="createMember()">建立會員</button>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <van-popup
      class="Registered_popup"
      v-model="popupStatus"
      :close-on-click-overlay="false"
    >
      <h1 class="Registered_popup_h1">驗證碼已寄出</h1>
      <h2 class="Registered_popup_h2">驗證碼已寄至您填寫的信箱</h2>
      <h2 class="Registered_popup_h2">請前往收信</h2>
      <button class="Registered_popup_button" @click="popupClose()">
        確認
      </button>
    </van-popup>
  </div>
</template>

<script>
import { POST_SendEmailConfirmation, POST_Create } from "@/api/api";
export default {
  name: "Registered",
  data() {
    return {
      popupStatus: false,
      emailStatus: false,
      checkoutStatus: false,
      // 错误提示文字展示
      codeTitleStatus: false,
      emailTitleStatus: false,
      passwordTitleStatus: false,
      passwordConfirmationTitleStatus: false,
      dataForm: {
        email: "",
        code: "",
        password: "",
        password_confirmation: "",
        nick_name: ""
      }
    };
  },
  methods: {
    // 正则验证表达式验证封装
    verification(type) {
      // 邮箱验证
      if (type == "email") {
        let emailVerification = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!emailVerification.test(this.dataForm.email)) {
          this.emailTitleStatus = true;
        } else {
          this.emailTitleStatus = false;
        }
      }
      // 验证码验证
      if (type == "code") {
        this.codeTitleStatus = false;
      }
      // 密码验证
      if (type == "password") {
        let passwordVerification = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if (!passwordVerification.test(this.dataForm.password)) {
          this.passwordTitleStatus = true;
        } else {
          this.passwordTitleStatus = false;
        }
      }
      // 确认密码验证
      if (type == "passwordConfirmation") {
        if (this.dataForm.password == this.dataForm.password_confirmation) {
          this.passwordConfirmationTitleStatus = false;
        } else {
          this.passwordConfirmationTitleStatus = true;
        }
      }
    },
    // 寄送验证码
    send() {
      // email存在并正则验证通过时
      if (!this.emailTitleStatus && this.dataForm.email) {
        let form = {
          email: this.dataForm.email
        };
        // 发送验证码
        POST_SendEmailConfirmation(form).then(res => {
          if (res.code == 200) {
            console.log(res);
            // 发送成功打开寄送成功弹窗
            this.popupStatus = true;
          }
        });
      }
    },
    // 关闭确认弹窗
    popupClose() {
      this.popupStatus = false;
      // 切换寄送验证码状态，显示再次寄送
      this.emailStatus = true;
    },
    // 创建会员
    createMember() {
      // 邮箱为空
      if (!this.dataForm.email) {
        this.emailTitleStatus = true;
      }
      // 密码为空
      if (!this.dataForm.password) {
        this.passwordTitleStatus = true;
      }
      // 确认密码为空
      if (this.dataForm.password != this.dataForm.password_confirmation) {
        this.passwordConfirmationTitleStatus = true;
      }
      // 昵称为空  验证码为空
      if (!this.dataForm.nick_name || !this.dataForm.code) {
        return false;
      }
      // 隐私权未选择
      if (!this.checkoutStatus) {
        return false;
      }
      // 验证码、邮箱、密码、确认密码正则状态
      if (
        this.emailTitleStatus ||
        this.passwordTitleStatus ||
        this.passwordConfirmationTitleStatus ||
        this.codeTitleStatus
      ) {
        return false;
      }
      POST_Create(this.dataForm).then(res => {
        if (res.code == 200) {
          this.codeTitleStatus = false;
          sessionStorage.setItem("tokenType", res.data.token_type + " ");
          sessionStorage.setItem(
            "token",
            res.data.token_type + " " + res.data.token
          );
          this.$router.push("/InterestedContent");
        } else if (res.code == 401) {
          this.codeTitleStatus = true;
        }
      });
    },
    // 上一步
    toLogin() {
      this.$router.push("/Login");
    },
    // 使用条款点击
    TermsClick(e) {
      e = e || window.event;
      if (e.stopPropagation) {
        //W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法
      }
      window.open("http://sonet.twczw.website/privacy.html");
    },
    // 隐私政策点击
    privacyPolicyClick(e) {
      e = e || window.event;
      if (e.stopPropagation) {
        //W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法
      }
      window.open("http://sonet.twczw.website/privacy.html");
    }
  }
};
</script>

<style lang="scss" scoped>
.Registered {
  width: 100%;
  min-height: 100vh;
  padding: 70px 15px 0;
  text-align: center;
  background-image: url("../../assets/img/bjImg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .Registered_h1 {
    margin-bottom: 27px;
    margin-top: 10px;
    padding: 0 15px;
    font-size: 12px;
    font-weight: 400;
    color: #585858;
    line-height: 17px;
  }
  .Registered_input {
    padding: 20px 0;
    width: 100%;
    position: relative;
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
      }
    }
    input {
      padding: 0 15px;
      width: 100%;
      height: 32px;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #c64040;
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
    }
    span {
      position: absolute;
      right: 15px;
      bottom: 0;
      font-size: 12px;
      font-weight: 400;
      color: #c64040;
      line-height: 17px;
    }
  }
  .Registered_inputs {
    input {
      padding-right: 150px;
    }
    div {
      position: absolute;
      right: 15px;
      top: 26px;
      font-size: 14px;
      font-family: PingFangTC-Regular, PingFangTC;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
      button {
        padding: 0;
        color: #1db3ce;
        text-decoration: underline;
      }
    }
  }
  .Registered_box {
    margin-top: 8px;
    padding: 20px 0 40px;
    border-top: 2px solid #c0cad3;
    .Registered_box_input {
      padding-top: 20px;
      width: 100%;
      position: relative;
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
        }
      }
      input {
        padding: 0 15px;
        width: 100%;
        height: 32px;
        background: #ffffff;
        border-radius: 16px;
        border: 1px solid #c64040;
        font-size: 14px;
        font-weight: 400;
        color: #585858;
        line-height: 20px;
      }
    }
    .Registered_box_div {
      padding: 0 17px;
      text-align: left;
      .Registered_box_div_top {
        margin: 14px 0 27px;
        font-size: 13px;
        font-weight: 400;
        color: #585858;
        line-height: 18px;
        display: flex;
        align-items: center;
        div {
          margin-right: 5px;
          width: 14px;
          height: 14px;
          background: #ffffff;
          border-radius: 3px;
          border: 1px solid #1db3ce;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        i {
          color: #1db3ce;
          text-decoration: underline;
        }
      }
      .Registered_box_div_bottom {
        display: flex;
        justify-content: space-between;
        button {
          width: 138px;
          height: 32px;
          background: #1db3ce;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
        }
      }
    }
  }
  .Registered_popup {
    padding: 30px 0 24px;
    width: 300px;
    height: 191px;
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
    .Registered_popup_h1 {
      margin-bottom: 6px;
      font-size: 20px;
      font-weight: 500;
      color: #585858;
      line-height: 28px;
    }
    .Registered_popup_h2 {
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
    }
    .Registered_popup_button {
      margin-top: 29px;
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
