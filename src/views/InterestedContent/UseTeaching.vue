<template>
  <div class="UseTeaching">
    <van-swipe class="UseTeaching_swipe" :loop="false" @change="swiperChange">
      <van-swipe-item v-for="(item, index) in dataFormList" :key="index">
        <img class="UseTeaching_swipe_img" :src="item.img" alt="" />
        <h1 class="UseTeaching_swipe_h1">{{ item.title }}</h1>
        <h2 class="UseTeaching_swipe_h2">{{ item.content }}</h2>
      </van-swipe-item>
    </van-swipe>
    <div class="UseTeaching_button">
      <button @click="toInterestedContent()">上一步</button>
      <button @click="toHome()">開始使用</button>
    </div>
  </div>
</template>

<script>
import { GET_GetNewUserTeaching } from "@/api/api"
export default {
  name: "UseTeaching",
  data() {
    return {
      dataFormList: [
        {
          imgUrl: require("@/assets/img/InterestedContent6s.png"),
          name: "劉花花",
          content: "歡迎您使用 Dolfan APP"
        },
        {
          imgUrl: require("@/assets/img/InterestedContent6s.png"),
          name: "劉花花2",
          content: "歡迎您使用 Dolfan APP"
        },
        {
          imgUrl: require("@/assets/img/InterestedContent6s.png"),
          name: "劉花花3",
          content: "歡迎您使用 Dolfan APP"
        }
      ]
    };
  },
  created() {
    this.getNewUserTeaching()
  },
  methods: {
    getNewUserTeaching() {
      GET_GetNewUserTeaching().then(res => {
        if (res.code == 200) {
          console.log(res);
          this.dataFormList = res.data.list;
        }
      })
    },
    // 上一步
    toInterestedContent() {
      this.$router.push("/InterestedContent");
    },
    // 开始使用
    toHome() {
      this.$router.push("/Home");
    },
    // 轮播切换
    swiperChange(index) {
      console.log(index);
    }
  }
};
</script>

<style lang="scss">
.UseTeaching {
  width: 100%;
  min-height: 100vh;
  padding: 45px 32px;
  text-align: center;
  background-image: url("../../assets/img/bjImg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .UseTeaching_swipe {
    padding-bottom: 28px;
    .van-swipe-item {
      padding-top: 67px;
      width: 100%;
      height: 480px;
      background: #ffffff;
      border-radius: 5px;
    }
    .van-swipe__indicator {
      width: 8px;
      height: 8px;
      background-color: #1db3ce;
      opacity: 0.2;
    }
    .van-swipe__indicator--active {
      opacity: 1;
    }
    .van-swipe__indicators {
      bottom: 0;
    }
    .UseTeaching_swipe_img {
      max-width: 100%;
      max-height: 210px;
    }
    .UseTeaching_swipe_h1 {
      margin: 60px 0 10px;
      font-size: 24px;
      font-weight: 600;
      color: #585858;
      line-height: 33px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .UseTeaching_swipe_h2 {
      font-size: 12px;
      font-weight: 400;
      color: #585858;
      line-height: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .UseTeaching_button {
    margin-top: 65px;
    display: flex;
    justify-content: space-between;
    button {
      width: 138px;
      height: 32px;
      background: #1DB3CE;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 20px;
    }
  }
}
</style>
