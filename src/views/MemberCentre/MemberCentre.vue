<template>
  <div class="MemberCentre">
    <div class="MemberCentre_header">
      <h1>會員中心</h1>
      <button>建立FC</button>
    </div>
    <div class="MemberCentre_box">
      <div class="MemberCentre_box_button">
        <div @click="SocialClick(index)" v-for="(item, index) in SocialList" :key="index">
          <span>
            <img v-if="!item.type" :src="item.imgUrl" alt="" />
            <img v-if="item.type" :src="item.imgUrlCheckout" alt="" />
          </span>
          <em v-if="item.type">{{item.title}}</em>
          <p v-if="!item.type">未綁定</p>
        </div>
      </div>
      <p class="MemberCentre_box_p">
        <img src="@/assets/img/MemberCentre.png" alt="" />
        什麼是熱情指數？
      </p>
    </div>
    <div class="MemberCentre_content">
      <h1>基本功能</h1>
      <div class="MemberCentre_content_div">
        <div v-for="(item, index) in FeaturesList" :key="index" @click="toRouter(item.router)">
          <img :src="item.imgUrl" alt="" />
          {{item.title}}
        </div>
      </div>
      <div class="MemberCentre_content_SignOut" @click="SignOut()">
        <img src="@/assets/img/Features15.png" alt="" />
        登出帳號
      </div>
    </div>
    <!-- 取消綁定社交平臺 -->
    <van-popup v-model="popupStatus" class="MemberCentre_popup">
      <h1>確定取消</h1>
      <h2>取消綁定後，社群軟體上的行為將不適用點數贈與條款</h2>
      <div>
        <button @click="popupStatus = false">取消</button>
        <button @click="UnbindSubmit()" class="button">確定</button>
      </div>
    </van-popup>
    <BottomMenu />
  </div>
</template>

<script>
import BottomMenu from "@/components/BottomMenu";
export default {
  name: "MemberCentre",
  components: {
    BottomMenu
  },
  data() {
    return {
      popupStatus: false,
      SocialCheckout: "",
      SocialList: [
        {
          imgUrl: require("@/assets/img/spotify.png"),
          imgUrlCheckout: require("@/assets/img/spotifySelect.png"),
          title: "Spotify",
          type: true
        },
        {
          imgUrl: require("@/assets/img/instagram.png"),
          imgUrlCheckout: require("@/assets/img/instagramSelect.png"),
          title: "instagram",
          type: true
        },
        {
          imgUrl: require("@/assets/img/facebook.png"),
          imgUrlCheckout: require("@/assets/img/facebookSelect.png"),
          title: "Facebook",
          type: false
        },
        {
          imgUrl: require("@/assets/img/youtube.png"),
          imgUrlCheckout: require("@/assets/img/youtubeSelect.png"),
          title: "YouTube",
          type: true
        }
      ],
      FeaturesList: [
        {
          imgUrl: require("@/assets/img/Features1.png"),
          title: "帳號設定",
          router: "/AccountSettings"
        },
        {
          imgUrl: require("@/assets/img/Features2.png"),
          title: "變更密碼",
          router: "/ChangePassword"
        },
        {
          imgUrl: require("@/assets/img/Features3.png"),
          title: "訂閱管理",
          router: "/SubscriptionManagement"
        },
        {
          imgUrl: require("@/assets/img/Features4.png"),
          title: "點數記錄",
          router: ""
        },
        {
          imgUrl: require("@/assets/img/Features5.png"),
          title: "通知設定",
          router: "/NotificationSettings"
        },
        {
          imgUrl: require("@/assets/img/Features6.png"),
          title: "偏好設定",
          router: "/Preferences"
        },
        {
          imgUrl: require("@/assets/img/Features7.png"),
          title: "點數商品",
          router: ""
        },
        {
          imgUrl: require("@/assets/img/Features8.png"),
          title: "購物記錄",
          router: ""
        },
        {
          imgUrl: require("@/assets/img/Features9.png"),
          title: "轉蛋收藏",
          router: ""
        },
        {
          imgUrl: require("@/assets/img/Features10.png"),
          title: "動態收藏",
          router: ""
        },
        {
          imgUrl: require("@/assets/img/Features11.png"),
          title: "平台公告",
          router: "/SystemNotification"
        },
        {
          imgUrl: require("@/assets/img/Features12.png"),
          title: "電子票夾",
          router: ""
        },
        {
          imgUrl: require("@/assets/img/Features13.png"),
          title: "二手商品",
          router: ""
        },
        {
          imgUrl: require("@/assets/img/Features14.png"),
          title: "使用Q & A",
          router: "/UseQA"
        }
      ]
    }
  },
  methods: {
    // 跳转路由
    toRouter(url) {
      if (!url) {
        return false
      }
      this.$router.push(url);
    },
    // 社交平台解綁
    SocialClick(index) {
      if (this.SocialList[index].type) {
        this.SocialCheckout = index
        this.popupStatus = true
      }
    },
    // 確認取消綁定
    UnbindSubmit() {
      this.SocialList[this.SocialCheckout].type = false
      this.popupStatus = false
    },
    // 退出登錄
    SignOut() {
      // 清空token
      sessionStorage.removeItem("token");
      // 跳转登录
      this.$router.push("Login");
    }
  }
}
</script>

<style lang="scss" scoped>
.MemberCentre {
  width: 100%;
  padding: 52px 15px 100px;
  .MemberCentre_header {
    position: fixed;
    left: 0;
    top: 0;
    background: #FFFFFF;
    height: 52px;
    width: 100%;
    border-bottom: 2px solid #EEF1F6;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 16px;
      font-weight: bold;
      color: #1DB3CE;
      line-height: 22px;
    }
    button {
      position: absolute;
      right: 15px;
      top: 13px;
      width: 65px;
      height: 24px;
      background: #1DB3CE;
      border-radius: 12px;
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 20px;
    }
  }
  .MemberCentre_box {
    margin: 14px 0 20px;
    padding: 17px 0;
    background: #FFFFFF;
    box-shadow: 0px 8px 32px -2px rgba(155, 161, 169, 0.1);
    border-radius: 2px;
    border: 1px solid #C0CAD3;
    .MemberCentre_box_button {
      margin-bottom: 23px;
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 25%;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 34px;
          height: 34px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          width: 100%;
          text-align: center;
          margin-top: 6px;
          font-size: 12px;
          font-weight: 400;
          color: #9BA1A9;
          line-height: 17px;
        }
        em {
          display: block;
          width: 100%;
          text-align: center;
          margin-top: 6px;
          font-size: 12px;
          font-weight: 400;
          color: #000000;
          line-height: 17px;
        }
      }
    }
    .MemberCentre_box_p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 400;
      color: #585858;
      line-height: 17px;
      text-decoration: underline;
      img {
        height: 13px;
        width: 13px;
        margin-right: 6px;
      }
    }
  }
  .MemberCentre_content {
    padding: 0 16px;
    h1 {
      font-size: 14px;
      font-weight: bold;
      color: #585858;
      line-height: 20px;
      margin-bottom: 10px;
    }
    .MemberCentre_content_div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      div {
        margin-bottom: 15px;
        width: 50%;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #585858;
        line-height: 20px;
        img {
          margin-right: 10px;
          width: 32px;
          height: 32px;
        }
      }
    }
    .MemberCentre_content_SignOut {
      margin-top: 5px;
      padding-top: 20px;
      border-top: 1px solid #EEF1F6;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
    }
  }
  .MemberCentre_popup {
    width: 300px;
    padding: 30px 40px 24px;
    background: #FFFFFF;
    box-shadow: 0px 0px 84px 0px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    border: 1px solid;
    border-image: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)) 1 1;
    h1 {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #585858;
      line-height: 28px;
    }
    h2 {
      margin: 12px 0 28px;
      text-align: center;
      font-size: 15px;
      font-weight: 400;
      color: #585858;
      line-height: 24px;
    }
    div {
      display: flex;
      justify-content: space-between;
      button {
        font-size: 14px;
        font-weight: bold;
        color: #1DB3CE;
        line-height: 20px;
        width: 98px;
        height: 32px;
        background: rgba(29,179,206,0.2);
        border-radius: 16px;
      }
      .button {
        color: #FFFFFF;
        background: rgba(29,179,206,1);
      }
    }
  }
}
</style>