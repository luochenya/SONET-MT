<template>
  <div class="PointsRecord">
    <div class="PointsRecord_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        點數記錄
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PointsRecord",
  methods: {
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    }
  }
}
</script>

<style lang="scss" scoped>
.PointsRecord {
  padding: 52px 15px 0;
  .PointsRecord_header {
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
}
</style>