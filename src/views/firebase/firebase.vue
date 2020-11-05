<template>
  
</template>

<script>
export default {
  name: "firebase",
  mounted() {
    firebase.initializeApp({
      apiKey: "AIzaSyB3vGZDW-7f6U3IJNf0zHCLx0FoNK2ICz8",
      authDomain: "dolfantest-d0724.firebaseapp.com",
      databaseURL: "https://dolfantest-d0724.firebaseio.com",
      projectId: "dolfantest-d0724",
      storageBucket: "dolfantest-d0724.appspot.com",
      messagingSenderId: "264635567847",
      appId: "1:264635567847:web:d911f91e7aa26af85e5c42",
      measurementId: "G-N2XQXQQM23"
    });
    // 初始化
    const messaging = firebase.messaging();
    // 密鑰
    messaging.usePublicVapidKey('BCB4CZuEcmi-eJ4JD6J6U7zkeHdZoQK2JWWSn23l7Ye4lCzWApowbB-jP_U6o5TezjGSqpwnpVpD8wvtLAusRjo');
    // 獲取token
    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        console.log('token:' + currentToken)
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log(err);
    });

    messaging.onTokenRefresh(() => {
      messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.');
      }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });
    // 接收信息
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
    });

    function resetUI() {
      messaging.getToken().then(function(currentToken) {
        if (currentToken) {
          
        } else {
          console.log('No Instance ID token available. Request permission to generate one.');
        }
      }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
      });
    }

    function requestPermission() {
      console.log('Requesting permission...');
      messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        resetUI();
      }).catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });
    }
    // 刪除token
    function deleteToken() {
      messaging.getToken().then(function(currentToken) {
        messaging.deleteToken(currentToken).then(function() {
          console.log('Token deleted.');
          resetUI();
        }).catch(function(err) {
          console.log('Unable to delete token. ', err);
        });
      }).catch(function(err) {
        console.log('Error retrieving Instance ID token. ', err);
      });
    }
  },
  methods: {

  }
}
</script>