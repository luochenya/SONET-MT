<template>
  <div class="ChangePassword">
    <div class="ChangePassword_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        變更密碼
      </div>
    </div>
    <!-- 輸入舊密碼 -->
    <div class="ChangePassword_oldPassword">
      <p class="ChangePasswordTitle">
        <i>*</i>
        輸入舊密碼
      </p>
      <input class="ChangePasswordInput" type="password" v-model="dataForm.old_password" />
    </div>
    <!-- 輸入新密碼 -->
    <div class="ChangePassword_newPassword">
      <p class="ChangePasswordTitle">
        <i>*</i>
        輸入新密碼
      </p>
      <input class="ChangePasswordInput" type="password" v-model="dataForm.password" />
    </div>
    <!-- 確認新密碼 -->
    <div class="ChangePassword_newPassword">
      <p class="ChangePasswordTitle">
        <i>*</i>
        確認新密碼
      </p>
      <input class="ChangePasswordInput" type="password" v-model="dataForm.password_confirmation" />
    </div>
    <!-- 儲存變更 -->
    <div class="ChangePassword_button">
      <button @click="changePassword()">儲存變更</button>
    </div>
  </div>
</template> 

<script>
import { POST_ChangePassword } from "@/api/api.js";
export default {
  name: "ChangePassword",
  data() {
    return {
      dataForm: {
        old_password: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    },
    // 儲存變更
    changePassword() {
      if (this.dataForm.password.length < 6) {
        return this.$toast({
          message: "請輸入至少6位數的密碼",
          position: "top"
        });
      }
      if (this.dataForm.password != this.dataForm.password_confirmation) {
        return this.$toast({
          message: "新密碼與舊密碼不一致",
          position: "top"
        });
      }
      POST_ChangePassword(this.dataForm).then(res => {
        if (res.code == 200) {
          this.$message({
            duration: 1500,
            message: "密碼修改成功，請重新登錄",
            type: "success"
          });
          // 清空token
          sessionStorage.removeItem("token");
          // 跳转登录
          this.$router.push("Login");
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.ChangePassword {
  padding: 62px 15px 20px;
  .ChangePassword_header {
    width: 100%;
    height: 52px;
    padding: 0 15px;
    position: fixed;
    left: 0;
    top: 0;
    border-bottom: 2px solid #EEF1F6;
    background: #ffffff;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #1DB3CE;
    line-height: 22px;
    img {
      width: 7px;
      height: 14px;
      margin-right: 10px;
    }
  }
  .ChangePasswordTitle {
    width: 100%;
    padding-left: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #585858;
    line-height: 20px;
    i {
      color: #C64040;
    }
  }
  .ChangePasswordInput {
    padding: 0 15px;
    width: 100%;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #C0CAD3;
    font-size: 14px;
    font-weight: 400;
    color: #585858;
    line-height: 20px;
  }
  .ChangePassword_oldPassword {
    padding-bottom: 30px;
    border-bottom: 2px solid #C0CAD3;
  }
  .ChangePassword_newPassword {
    padding-top: 20px;
  }
  .ChangePassword_button {
    margin-top: 60px;
    text-align: center;
    button {
      width: 105px;
      height: 32px;
      background: #1DB3CE;
      border-radius: 16px;
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 20px;
    }
  }
}
</style>