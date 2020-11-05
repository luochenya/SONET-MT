<template>
  <div class="Home">
    <h1>首頁暫未開放</h1>
    <BottomMenu />
  </div>
</template>
<script>
import BottomMenu from "@/components/BottomMenu";
import { GET_GetUserInfo } from "@/api/api";
export default {
  name: "Home",
  components: {
    BottomMenu
  },
  created() {
    // this.getUserInfo();
  },
  methods: {
    // 获取个人信息
    getUserInfo() {
      GET_GetUserInfo().then(res => {
        if (res.code == 200) {
          if (res.data.is_set_user_category == false) {
            this.$router.push("InterestedContent");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Home {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 30px;
  }
}
</style>
