import Vue from "vue";
import VueRouter from "vue-router";
import routeMap from "@/router/routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/Login"
  },
  // 404
  {
    path: "/404",
    component: routeMap["404"]
  },
  {
    path: "*",
    redirect: "/404"
  },
  // 404
  // 移动端
  {
    path: "/Home", // 首页
    name: "Home",
    component: routeMap["Home"]
  },
  {
    path: "/MemberCentre", // 會員中心
    name: "MemberCentre",
    component: routeMap["MemberCentre"]
  },
  {
    path: "/Login", // 登录
    name: "Login",
    component: routeMap["Login"]
  },
  {
    path: "/Registered", // 注册
    name: "Registered",
    component: routeMap["Registered"]
  },
  {
    path: "/ForgetPassword", // 忘记密码
    name: "ForgetPassword",
    component: routeMap["ForgetPassword"]
  },
  {
    path: "/InterestedContent", // 感兴趣的内容
    name: "InterestedContent",
    component: routeMap["InterestedContent"]
  },
  {
    path: "/UseTeaching", // 使用教学
    name: "UseTeaching",
    component: routeMap["UseTeaching"]
  },
  {
    path: "/NotificationSettings", // 通知设定
    name: "NotificationSettings",
    component: routeMap["NotificationSettings"]
  },
  {
    path: "/SystemNotification", // 系统公告
    name: "SystemNotification",
    component: routeMap["SystemNotification"]
  },
  {
    path: "/ChangePassword", // 变更密码
    name: "ChangePassword",
    component: routeMap["ChangePassword"]
  },
  {
    path: "/Preferences", // 偏好设定
    name: "Preferences",
    component: routeMap["Preferences"]
  },
  {
    path: "/AccountSettings",  // 账号设定
    name: "AccountSettings",
    component: routeMap["AccountSettings"]
  },
  {
    path: "/UseQA",  // 使用Q&A
    name: "UseQA",
    component: routeMap["UseQA"]
  },
  {
    path: "/PointsRecord", // 点数记录
    name: "PointsRecord",
    component: routeMap["PointsRecord"]
  },
  {
    path: "/GiftSending", // 礼物发送
    name: "GiftSending",
    component: routeMap["GiftSending"]
  },
  {
    path: "/GiftSendingExamine", // 礼物发送查看
    name: "GiftSendingExamine",
    component: routeMap["GiftSendingExamine"]
  },
  {
    path: "/SendInvitationCode", // 邀请码发送
    name: "SendInvitationCode",
    component: routeMap["SendInvitationCode"]
  },
  {
    path: "/SendInvitationCodeExamine", // 邀请码发送查看
    name: "SendInvitationCodeExamine",
    component: routeMap["SendInvitationCodeExamine"]
  },
  {
    path: "/SubscriptionManagement", // 訂閲管理
    name: "SubscriptionManagement",
    component: routeMap["SubscriptionManagement"]
  },
  {
    path: "/firebase", // 訂閲管理
    name: "firebase",
    component: () => import("@/views/firebase/firebase.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
