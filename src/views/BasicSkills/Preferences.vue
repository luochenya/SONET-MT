<template>
  <div class="Preferences">
    <div class="Preferences_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        偏好設定
      </div>
    </div>
    <div class="Preferences_box">
      <div
        class="Preferences_box_div"
        v-for="(item, index) in dataFormList"
        :key="index"
        @click="checkoutClick(index)"
      >
        <span></span>
        <img :class="checkoutList[index] ? '' : 'gray'" :src="item.img" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <!-- 儲存變更 -->
    <div class="Preferences_button">
      <button @click="toUseTeaching()">儲存變更</button>
    </div>
  </div>
</template>

<script>
import { GET_GetCategoryLists, POST_SetUserCategory } from "@/api/api";
export default {
  name: "Preferences",
  data() {
    return {
      category_ids: [],
      checkoutList: [],
      dataFormList: []
    };
  },
  created() {
    this.getCategoryLists();
  },
  methods: {
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    },
    getCategoryLists() {
      GET_GetCategoryLists().then(res => {
        if (res.code == 200) {
          this.dataFormList = res.data.list;
          res.data.list.forEach((item, index) => {
            if (item.is_user_category) {
              this.checkoutList.splice(index, 0, true);
            } else {
              this.checkoutList.splice(index, 0, false);
            }
          });
        }
      });
    },
    // 选择感兴趣的内容（选中或取消选中）
    checkoutClick(index) {
      this.checkoutList.splice(index, 1, !this.checkoutList[index]);
    },
    // 儲存變更
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
          this.getCategoryLists();
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.Preferences {
  padding: 72px 15px 20px;
  .Preferences_header {
    z-index: 5;
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
  .Preferences_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .Preferences_box_div {
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
  }
  .Preferences_button {
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