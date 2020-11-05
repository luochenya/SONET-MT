<template>
  <div class="SendInvitationCodeExamine">
    <div class="SendInvitationCodeExamine_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        查看禮物發送
      </div>
    </div>
    <div class="SendInvitationCodeExamine_content">
      <div class="SendInvitationCodeExamine_content_top">
        <p>
          發送時間
          <span>2020.01.01  23:00</span>
        </p>
        <p class="SendInvitationCodeExamine_content_top_margin">邀請碼名稱</p>
        <input type="text" />
        <p class="SendInvitationCodeExamine_content_top_margin">邀請碼類型</p>
        <input type="text" />
        <p class="SendInvitationCodeExamine_content_top_margin">兜幣</p>
        <input type="text" />
      </div>
      <div class="SendInvitationCodeExamine_content_bottom">
        <p>備註</p>
        <textarea></textarea>
      </div>
    </div>
    <div class="SendInvitationCodeExamine_button">
      <button>儲存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendInvitationCodeExamine",
  methods: {
    // 返回上一页
    returnClick() {
      this.$router.push('/SendInvitationCode')
    }
  }
}
</script>

<style lang="scss" scoped>
.SendInvitationCodeExamine {
  padding: 52px 15px 20px;
  .SendInvitationCodeExamine_header {
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
  .SendInvitationCodeExamine_content {
    .SendInvitationCodeExamine_content_top {
      margin: 30px 0;
      padding: 30px 20px;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0px 8px 32px -2px rgba(155, 161, 169, 0.1);
      border-radius: 10px;
      border: 1px solid #C0CAD3;
      .SendInvitationCodeExamine_content_top_margin {
        margin-top: 20px;
      }
      p {
        padding: 0 15px 5px;
        font-size: 14px;
        font-weight: bold;
        color: #585858;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #9BA1A9;
          line-height: 20px;
        }
      }
      input {
        padding: 0 15px;
        width: 100%;
        height: 32px;
        background: #EEF1F6;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 400;
        color: #585858;
        line-height: 20px;
      }
    }
    .SendInvitationCodeExamine_content_bottom {
      margin-top: 30px;
      p {
        padding: 0 15px;
        font-size: 14px;
        font-weight: bold;
        color: #585858;
        line-height: 20px;
      }
      textarea {
        padding: 10px 15px;
        width: 100%;
        min-height: 90px;
        background: #FFFFFF;
        border-radius: 16px;
        border: 1px solid #C0CAD3;
        font-size: 14px;
        font-weight: 400;
        color: #585858;
        line-height: 20px;
      }
    }
  }
  .SendInvitationCodeExamine_button {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    button {
      width: 125px;
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