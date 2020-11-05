const routes = {
  // 404
  404: () =>
    import(
      /* webpackChunkName: '404' */
      "@/views/404/404.vue"
    ),
  // 404
  // Login
  // 登录
  Login: () =>
    import(
      /* webpackChunkName: "Login" */
      "@/views/Login/Login.vue"
    ),
  // 注册
  Registered: () =>
    import(
      /* webpackChunkName: "Registered" */
      "@/views/Login/Registered.vue"
    ),
  // 忘记密码
  ForgetPassword: () =>
    import(
      /* webpackChunkName: "ForgetPassword" */
      "@/views/Login/ForgetPassword.vue"
    ),
  // Login
  // 首页
  Home: () =>
    import(
      /* webpackChunkName: "Home" */
      "@/views/Home/Home.vue"
    ),
  // 會員中心
  MemberCentre: () =>
    import(
      /* webpackChunkName: "MemberCentre" */
      "@/views/MemberCentre/MemberCentre.vue"
    ),
  // 感兴趣的内容
  // 感兴趣的内容
  InterestedContent: () =>
    import(
      /* webpackChunkName: "InterestedContent" */
      "@/views/InterestedContent/InterestedContent.vue"
    ),
  // 使用教学
  UseTeaching: () =>
    import(
      /* webpackChunkName: "UseTeaching" */
      "@/views/InterestedContent/UseTeaching.vue"
    ),
  // 讯息中心菜单
  // 通知设定
  NotificationSettings: () =>
    import(
      /* webpackChunkName: "NotificationSettings" */
      "@/views/MessageCenter/NotificationSettings.vue"
    ),
  // 系统公告
  SystemNotification: () =>
    import(
      /* webpackChunkName: "SystemNotification" */
      "@/views/MessageCenter/SystemNotification.vue"
    ),
  // 基本功能菜单
  // 变更密码
  ChangePassword: () =>
    import(
      /* webpackChunkName: "ChangePassword" */
      "@/views/BasicSkills/ChangePassword.vue"
    ),
  // 偏好设定
  Preferences: () =>
    import(
      /* webpackChunkName: "Preferences" */
      "@/views/BasicSkills/Preferences.vue"
    ),
  // 账号设定
  AccountSettings: () =>
    import(
      /* webpackChunkName: "AccountSettings" */
      "@/views/BasicSkills/AccountSettings.vue"
    ),
  // 使用Q&A
  UseQA: () =>
    import(
      /* webpackChunkName: "UseQA" */
      "@/views/BasicSkills/UseQA.vue"
    ),
  // 电商功能菜单
  // 点数记录
  PointsRecord: () =>
    import(
      /* webpackChunkName: "PointsRecord" */
      "@/views/ECommerce/PointsRecord.vue"
    ),
  // 礼物发送
  GiftSending: () =>
    import(
      /* webpackChunkName: "GiftSending" */
      "@/views/ECommerce/GiftSending.vue"
    ),
  // 礼物发送查看
  GiftSendingExamine: () =>
    import(
      /* webpackChunkName: "GiftSendingExamine" */
      "@/views/ECommerce/GiftSendingExamine.vue"
    ),
  // 邀请码发送
  SendInvitationCode: () =>
    import(
      /* webpackChunkName: "SendInvitationCode" */
      "@/views/ECommerce/SendInvitationCode.vue"
    ),
  // 邀请码发送查看
  SendInvitationCodeExamine: () =>
    import(
      /* webpackChunkName: "SendInvitationCodeExamine" */
      "@/views/ECommerce/SendInvitationCodeExamine.vue"
    ),
  // 订阅收藏菜单
  // 订阅管理
  SubscriptionManagement: () =>
    import(
      /* webpackChunkName: "SubscriptionManagement" */
      "@/views/SubscribeFavorites/SubscriptionManagement.vue"
    ),
};
export default routes;
