<template>
  <div class="AccountSettings">
    <div class="AccountSettings_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        帳號設定
      </div>
    </div>
    <!-- 頭像，昵稱 -->
    <div class="AccountSettings_headerImg">
      <van-uploader class="AccountSettings_headerImg_updateImg" :after-read="HeaderImgUpdate">
        <img class="DefaultAvatar" :src="dataForm.avatar ? dataForm.avatar : '@/assets/img/DefaultAvatar.png'" alt="" />
        <img class="imgUpdate" src="@/assets/img/imgUpdate.png" alt="" />
      </van-uploader>
      <div class="AccountSettings_headerImg_input">
        <p class="AccountSettingsTitle">
          <i>*</i>
          暱稱
        </p>
        <input class="AccountSettingsInput" type="text" v-model="dataForm.nick_name" />
      </div>
    </div>
    <!-- 電子郵件 -->
    <div class="AccountSettings_input">
      <p class="AccountSettingsTitle">
        <i>*</i>
        電子郵件
      </p>
      <input class="AccountSettingsInput" type="text" v-model="dataForm.email" disabled />
    </div>
    <!-- 真實姓名 -->
    <div class="AccountSettings_input">
      <p class="AccountSettingsTitle">
        真實姓名
      </p>
      <input class="AccountSettingsInput" type="text" v-model="dataForm.name" />
    </div>
    <!-- 性別 -->
    <div class="AccountSettings_input">
      <p class="AccountSettingsTitle">
        性別
      </p>
      <select class="AccountSettingsSelect" v-model="dataForm.sex">
        <option v-for="(item, index) in ageList" :key="index" :value="item.value">{{item.label}}</option>
      </select>
    </div>
    <!-- 生日 -->
    <div class="AccountSettings_input">
      <p class="AccountSettingsTitle">
        生日
      </p>
      <input class="AccountSettingsInput" type="text" @click="showPicker = true" v-model="dataForm.birthday" />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
    <!-- 聯絡電話 -->
    <div class="AccountSettings_input">
      <p class="AccountSettingsTitle">
        聯絡電話
      </p>
      <input class="AccountSettingsInput" type="text" v-model="dataForm.mobile" />
    </div>
    <!-- 聯絡地址 -->
    <div class="AccountSettings_inputs">
      <p class="AccountSettingsTitle">
        聯絡地址
      </p>
      <div>
        <select class="AccountSettingsSelect" v-model="dataForm.city" @change="cityChange()">
          <option v-for="(item, index) in cityList" :key="index" :value="item.id">{{item.region}}</option>
        </select>
      </div>
      <div>
        <select class="AccountSettingsSelect" v-model="dataForm.district">
          <option v-for="(item, index) in districtList" :key="index" :value="item.id">{{item.region}}</option>
        </select>
      </div>
      <input class="AccountSettingsInput" type="text" v-model="dataForm.address" />
    </div>
    <!-- 公開訂閱的FC -->
    <div class="AccountSettings_fcCheckout">
      公開訂閱的FC
      <van-switch v-model="fcCheckeds" active-color="#1DB3CE" inactive-color="#9BA1A9" size="24px" />
    </div>
    <!-- 儲存變更 -->
    <div class="AccountSettings_button">
      <button @click="submit()">儲存變更</button>
    </div>
  </div>
</template>

<script>
import { GET_GetRegion, GET_GetUserInfo, POST_UpdateInfo, UPLOAD_Upload } from "@/api/api";
export default {
  name: "AccountSettings",
  data() {
    return {
      fcCheckeds: false,
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      dataForm: {},
      cityItem: {},
      ageList: [
        {
          value: 0,
          label: "保密"
        },
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        }
      ],
      cityList: [],
      districtList: []
    }
  },
  created() {
    this._getUserInfo();
  },
  methods: {
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    },
    // 頭像上傳
    HeaderImgUpdate(file) {
      // 此时可以自行将文件上传至服务器
      const isJPG = 'jpg,gif,png'
      const name = file.file.name.split('.')
      const imgName = name[name.length - 1]
      if (isJPG.indexOf(imgName.toLowerCase()) === -1) {
        return this.$toast({
          message: "上傳頭像圖片只能是 jpg/gig/png 格式!",
          position: "top"
        });
      }
      const isLt2M = file.file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        return this.$toast({
          message: "上傳頭像大小不能超過 10MB!",
          position: "top"
        });
      }
      var UploadData = new FormData()
      UploadData.append('upload_file', file.file)
      UPLOAD_Upload(UploadData).then(res => {
        if (res.code == 200) {
          this.dataForm.avatar = res.data
        }
      })
    },
    // 獲取個人信息
    _getUserInfo() {
      GET_GetUserInfo().then(res => {
        if (res.code == 200) {
          this.dataForm = res.data;
          if (res.data.is_open_fc == 0) {
            this.fcCheckeds = false
          } else {
            this.fcCheckeds = true
          }
          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          if (this.dataForm.region.length && this.dataForm.region && this.dataForm.region[0].id) {
            this._getRegion(this.dataForm.region[0].id);
          } else {
            this._getRegion();
          }
          this.dataForm.city = this.dataForm.region[0].id;
          this.dataForm.district = this.dataForm.region[1].id;
        }
      });
    },
    // 獲取市區
    _getRegion(id) {
      GET_GetRegion().then(res => {
        if (res.code == 200) {
          res.data.list.forEach(item => {
            if (item.pid == 0) {
              this.cityList.push(item)
            }
          })
          if (id) {
            this.cityList.forEach(item => {
              if (item.id == id) {
                this.cityItem = item;
                this.districtList = item.item;
              }
            });
          }
        }
      });
    },
    // 市變動獲取區列表
    cityChange() {
      // 區列表賦值
      this.cityList.forEach(item => {
        if (this.dataForm.city == item.id) {
          this.districtList = item.item;
        }
      });
      // 區值清空
      this.dataForm.district = "";
    },
    // 儲存變更
    submit() {
      if (!this.dataForm.nick_name) {
        return this.$toast({
          message: "暱稱不能為空！",
          position: "top"
        });
      }
      this.dataForm.region_ids = this.dataForm.city + ',' + this.dataForm.district;
      if (this.fcCheckeds) {
        this.dataForm.is_open_fc = 1
      } else {
        this.dataForm.is_open_fc = 0
      }
      POST_UpdateInfo(this.dataForm).then(res => {
        if (res.code == 200) {
          this.$toast({
            message: "資料更新成功",
            position: "top"
          });
          this._getUserInfo();
        }
      });
    },
    // 日曆組件美化
    formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
      }
      return val;
    },
    // 日曆組件選中
    onConfirm(time) {
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      this.dataForm.birthday = `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;
      this.showPicker = false;
    },
  }
}
</script>
 
<style lang="scss" scoped>
.AccountSettings {
  padding: 62px 15px 12px;
  .AccountSettings_header {
    z-index: 1;
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
  .AccountSettingsTitle {
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
  .AccountSettingsInput {
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
  .AccountSettingsSelect {
    outline:none;
    padding: 0 15px;
    width: 100%;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #C0CAD3;
    font-size: 14px;
    font-weight: 400;
    color: #585858;
    line-height: 20px;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    /*在选择框的最右侧中间显示小箭头图片*/
    // background: url("../../assets/img/iconTop.png") no-repeat scroll right center transparent;
    // background-position: 98% 50%;
  }
  .AccountSettings_headerImg {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    .AccountSettings_headerImg_updateImg {
      margin-right: 20px;
      width: 66px;
      height: 66px;
      position: relative;
      .DefaultAvatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .imgUpdate {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .AccountSettings_headerImg_input {
      width: calc(100% - 106px);
    }
  }
  .AccountSettings_input {
    margin-bottom: 20px;
  }
  .AccountSettings_inputs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      width: 48%;
      margin-bottom: 10px;
    }
  }
  .AccountSettings_fcCheckout {
    margin: 23px 0 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    color: #585858;
    line-height: 20px;
  }
  .AccountSettings_button {
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