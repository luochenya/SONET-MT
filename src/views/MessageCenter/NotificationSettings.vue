<template>
  <div class="NotificationSettings">
    <div class="NotificationSettings_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        通知設定
      </div>
    </div>
    <div class="NotificationSettings_content">
      <h1>
        <span>APP推播</span>
        <van-switch v-model="appChecked" active-color="#1DB3CE" inactive-color="#9BA1A9" size="24px" />
      </h1>
      <h2>系統通知</h2>
      <h3>
        <span>官方活動推播</span>
        <van-switch v-model="officialChecked" active-color="#1DB3CE" inactive-color="#9BA1A9" size="24px" />
      </h3>
      <h4>FC通知</h4>
      <div class="NotificationSettings_content_fc" v-for="(item, index) in dataForm.fan_club_notice" :key="index">
        <img class="NotificationSettings_content_fc_img" :src="item.avatar" alt="" />
        <div class="NotificationSettings_content_fc_box">
          <p class="NotificationSettings_content_fc_box_p">{{item.name}}</p>
          <div class="NotificationSettings_content_fc_box_div">
            <span>私聊通知</span>
            <van-switch v-model="item.is_private_chat_notice" active-color="#1DB3CE" inactive-color="#9BA1A9" size="24px" />
          </div>
          <div class="NotificationSettings_content_fc_box_div">
            <span>群聊通知(偶像發言時)</span>
            <van-switch v-model="item.is_group_chat_notice" active-color="#1DB3CE" inactive-color="#9BA1A9" size="24px" />
          </div>
          <div class="NotificationSettings_content_fc_box_div">
            <span>動態通知</span>
            <van-switch v-model="item.is_fc_content_notice" active-color="#1DB3CE" inactive-color="#9BA1A9" size="24px" />
          </div>
        </div>
      </div>
    </div>
    <!-- 儲存變更 -->
    <div class="NotificationSettings_button">
      <button @click="submit()">儲存變更</button>
    </div>
  </div>
</template>
 
<script>
import { GET_GetNotice, POST_NoticeUpdate, POST_NoticeUpdateFc } from "@/api/api";
export default {
  name: "NotificationSettings",
  data() {
    return {
      appChecked: false,
      officialChecked: false,
      dataForm: "",
    }
  },
  created() {
    this._getNotice();
  },
  methods: {
    // 获取通知设定列表
    _getNotice() {
      GET_GetNotice().then(res => {
        if (res.code == 200) {
          res.data.fan_club_notice.forEach((item, index) => {
            if (item.is_fc_content_notice == 0) {
              res.data.fan_club_notice[index].is_fc_content_notice = false
            } else {
              res.data.fan_club_notice[index].is_fc_content_notice = true
            }
            if (item.is_group_chat_notice == 0) {
              res.data.fan_club_notice[index].is_group_chat_notice = false
            } else {
              res.data.fan_club_notice[index].is_group_chat_notice = true
            }
            if (item.is_private_chat_notice == 0) {
              res.data.fan_club_notice[index].is_private_chat_notice = false
            } else {
              res.data.fan_club_notice[index].is_private_chat_notice = true
            }
          })
          this.dataForm = res.data;
          // app推送打開
          if (res.data.is_open_firebase_push == 1) {
            this.appChecked = true
          } else {
            this.appChecked = false
          }
          // app推送打開
          if (res.data.is_open_app_push == 1) {
            this.officialChecked = true
          } else {
            this.officialChecked = false
          }
        }
      });
    },
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    },
    // 儲存變更
    submit() {
      let form = {
        is_open_firebase_push: this.appChecked ? 1 : 0,
        is_open_app_push: this.officialChecked ? 1 : 0
      }
      POST_NoticeUpdate(form).then(res => {
        if (res.code == 200) {
          
        }
      })
      this.dataForm.fan_club_notice.forEach((item, index) => {
        if (item.is_fc_content_notice) {
          this.dataForm.fan_club_notice[index].is_fc_content_notice = 1
        } else {
          this.dataForm.fan_club_notice[index].is_fc_content_notice = 0
        }
        if (item.is_group_chat_notice) {
          this.dataForm.fan_club_notice[index].is_group_chat_notice = 1
        } else {
          this.dataForm.fan_club_notice[index].is_group_chat_notice = 0
        }
        if (item.is_private_chat_notice) {
          this.dataForm.fan_club_notice[index].is_private_chat_notice = 1
        } else {
          this.dataForm.fan_club_notice[index].is_private_chat_notice = 0
        }
        POST_NoticeUpdateFc(item).then(res => {
          if (res.code == 200) {
            this._getNotice();
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.NotificationSettings {
  padding: 52px 15px 20px;
  .NotificationSettings_header {
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
  .NotificationSettings_content {
    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #C0CAD3;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-weight: bold;
        color: #585858;
        line-height: 20px;
      }
    }
    h2 {
      padding: 16px 0;
      font-size: 14px;
      font-weight: bold;
      color: #1DB3CE;
      line-height: 20px;
    }
    h3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-weight: bold;
        color: #585858;
        line-height: 20px;
      }
    }
    h4 {
      margin-top: 25px;
      font-size: 14px;
      font-weight: bold;
      color: #1DB3CE;
      line-height: 20px;
    }
    .NotificationSettings_content_fc {
      padding: 20px 0;
      border-bottom: 1px solid #C0CAD3;
      display: flex;
      .NotificationSettings_content_fc_img {
        width: 52px;
        height: 52px;
        margin-right: 10px;
      }
      .NotificationSettings_content_fc_box {
        width: 100%;
        .NotificationSettings_content_fc_box_p {
          font-size: 16px;
          font-weight: bold;
          color: #585858;
          line-height: 22px;
        }
        .NotificationSettings_content_fc_box_div {
          width: 100%;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 400;
            color: #585858;
            line-height: 20px;
          }
        }
      }
    }
    .NotificationSettings_content_fc:last-child {
      border-bottom: none;
    }
  }
  .NotificationSettings_button {
    margin-top: 20px;
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