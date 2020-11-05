<template>
  <div class="BottomMenu">
    <div class="BottomMenu_box">
      <!-- <img class="BottomMenu_box_SelectAll1" src="@/assets/img/bottomSelectAll1.png" alt="" /> -->
      <div class="BottomMenu_box_content">
        <img src="@/assets/img/bottom1.png" alt="" />
        <!-- <p>會員中心</p> -->
      </div>
    </div>
    <div class="BottomMenu_box">
      <!-- <img class="BottomMenu_box_SelectAll1" src="@/assets/img/bottomSelectAll1.png" alt="" /> -->
      <div class="BottomMenu_box_content">
        <img src="@/assets/img/bottom2.png" alt="" />
        <!-- <img src="@/assets/img/bottomSelect2.png" alt="" /> -->
        <!-- <p>聊聊</p> -->
      </div>
    </div>
    <div class="BottomMenu_box">
      <img class="BottomMenu_box_SelectAll1" v-if="$route.path == '/Home'" src="@/assets/img/bottomSelectAll1.png" alt="" />
      <div class="BottomMenu_box_content" @click="toRouter('/Home')">
        <img v-if="$route.path != '/Home'" src="@/assets/img/bottom3.png" alt="" />
        <img v-if="$route.path == '/Home'" src="@/assets/img/bottomSelect3.png" alt="" />
        <p v-if="$route.path == '/Home'">首頁</p>
      </div>
    </div>
    <div class="BottomMenu_box">
      <!-- <img class="BottomMenu_box_SelectAll1" src="@/assets/img/bottomSelectAll1.png" alt="" /> -->
      <div class="BottomMenu_box_content">
        <img src="@/assets/img/bottom4.png" alt="" />
        <!-- <img src="@/assets/img/bottomSelect4.png" alt="" /> -->
        <!-- <p>遊樂</p> -->
      </div>
    </div>
    <div class="BottomMenu_box">
      <img class="BottomMenu_box_SelectAll2" v-if="$route.path == '/MemberCentre'" src="@/assets/img/bottomSelectAll2.png" alt="" />
      <div class="BottomMenu_box_content" @click="toRouter('/MemberCentre')">
        <img v-if="$route.path != '/MemberCentre'" src="@/assets/img/bottom5.png" alt="" />
        <img v-if="$route.path == '/MemberCentre'" src="@/assets/img/bottomSelect5.png" alt="" />
        <p v-if="$route.path == '/MemberCentre'">會員中心</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomMenu",
  methods: {
    toRouter(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.BottomMenu {
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .BottomMenu_box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 20%;
    position: relative;
    .BottomMenu_box_content {
      text-align: center;
      z-index: 1;
      img {
        width: 25px;
        height: 25px;
      }
      p {
        text-align: center;
        margin-top: 5px;
        font-size: 12px;
        font-weight: 500;
        color: #1DB3CE;
        line-height: 17px;
      }
    }
    .BottomMenu_box_SelectAll1 {
      width: 108px;
      height: 61px;
      position: absolute;
      left: 50%;
      top: -24px;
      transform: translate(-50%, 0);
    }
    .BottomMenu_box_SelectAll2 {
      width: 90px;
      height: 61px;
      position: absolute;
      right: 0;
      top: -24px;
    }
  }
}
</style>