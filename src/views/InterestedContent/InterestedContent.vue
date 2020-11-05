<template>
  <div class="InterestedContent">
    <h1 class="InterestedContent_h1">請選擇您感興趣的內容？</h1>
    <div class="InterestedContent_box">
      <div
        class="InterestedContent_box_div"
        v-for="(item, index) in dataFormList"
        :key="index"
        @click="checkoutClick(index)"
      >
        <span></span>
        <img :class="checkoutList[index] ? '' : 'gray'" :src="item.img" alt="" />
        <!-- <img v-if="!checkoutList[index]" :src="item.img" alt="" />
        <img v-if="checkoutList[index]" :src="item.select_img" alt="" /> -->
        <p>{{ item.name }}</p>
      </div>
      <button class="InterestedContent_botton" @click="toUseTeaching()">
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import { GET_GetCategoryLists, POST_SetUserCategory } from "@/api/api";
export default {
  name: "InterestedContent",
  data() {
    return {
      category_ids: [],
      checkoutList: [],
      dataFormList: [
        {
          noCheckoutImg: require("@/assets/img/InterestedContent1.png"),
          checkoutImg: require("@/assets/img/InterestedContent1s.png"),
          title: "日本音樂"
        },
        {
          noCheckoutImg: require("@/assets/img/InterestedContent2.png"),
          checkoutImg: require("@/assets/img/InterestedContent2s.png"),
          title: "華語音樂"
        },
        {
          noCheckoutImg: require("@/assets/img/InterestedContent3.png"),
          checkoutImg: require("@/assets/img/InterestedContent3s.png"),
          title: "遊戲"
        },
        {
          noCheckoutImg: require("@/assets/img/InterestedContent4.png"),
          checkoutImg: require("@/assets/img/InterestedContent4s.png"),
          title: "動漫"
        },
        {
          noCheckoutImg: require("@/assets/img/InterestedContent5.png"),
          checkoutImg: require("@/assets/img/InterestedContent5s.png"),
          title: "CosPlay"
        },
        {
          noCheckoutImg: require("@/assets/img/InterestedContent6.png"),
          checkoutImg: require("@/assets/img/InterestedContent6s.png"),
          title: "直播"
        }
      ]
    };
  },
  created() {
    this.getCategoryLists();
  },
  methods: {
    getCategoryLists() {
      GET_GetCategoryLists().then(res => {
        if (res.code == 200) {
          this.dataFormList = res.data.list;
          this.dataFormList.forEach((item, index) => {
            this.checkoutList.splice(index, 0, false);
          });
        }
      });
    },
    // 选择感兴趣的内容（选中或取消选中）
    checkoutClick(index) {
      this.checkoutList.splice(index, 1, !this.checkoutList[index]);
    },
    // 下一步
    toUseTeaching() {
      // 获取拿到的偏好ID组成数组
      this.checkoutList.forEach((item, index) => {
        if (item) {
          this.category_ids.push(this.dataFormList[index].id);
        }
      });
      let category_ids = this.category_ids.join(",");
      if (!category_ids) {
        return this.$toast({
          message: "請選擇您的愛好！",
          position: "top"
        });
      }
      let form = {
        category_ids: category_ids
      };
      // 提交设置偏好
      POST_SetUserCategory(form).then(res => {
        if (res.code == 200) {
          this.$router.push("/UseTeaching");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.InterestedContent {
  width: 100%;
  padding: 72px 15px 40px;
  .InterestedContent_h1 {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #585858;
    line-height: 28px;
  }
  .InterestedContent_box {
    margin-top: 43px;
    border-top: 2px solid #eef1f6;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .InterestedContent_box_div {
      margin-top: 24px;
      border-radius: 10px;
      width: 158px;
      height: 110px;
      position: relative;
      .gray {
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        filter: gray;
      }
      span {
        border-radius: 10px;
        z-index: 2;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
      }
      p {
        z-index: 3;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        line-height: 22px;
        text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5);
      }
      img {
        width: 158px;
        height: 110px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .InterestedContent_botton {
      margin: 72px auto 0;
      width: 138px;
      height: 32px;
      background: #1db3ce;
      border-radius: 16px;
      font-size: 14px;
      font-family: PingFangTC-Medium, PingFangTC;
      font-weight: 500;
      color: #ffffff;
      line-height: 20px;
    }
  }
}
</style>
