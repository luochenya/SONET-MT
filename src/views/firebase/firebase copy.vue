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
    const tokenDivId = 'token_div';
    const permissionDivId = 'permission_div';

    const messaging = firebase.messaging();
    console.log(messaging)
    messaging.usePublicVapidKey('BCB4CZuEcmi-eJ4JD6J6U7zkeHdZoQK2JWWSn23l7Ye4lCzWApowbB-jP_U6o5TezjGSqpwnpVpD8wvtLAusRjo');

    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        console.log('token:' + currentToken)
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log(123132)
      console.log(err);
      // showToken('Error retrieving Instance ID token. ', err);
      // setTokenSentToServer(false);
    });

    messaging.onTokenRefresh(() => {
      messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        // setTokenSentToServer(false);
        // Send Instance ID token to app server.
        // sendTokenToServer(refreshedToken);
        // ...
      }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
        // showToken('Unable to retrieve refreshed token ', err);
      });
    });
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
    });

    function resetUI() {
      // clearMessages();
      // showToken('loading...');
      // [START get_token]
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken().then(function(currentToken) {
        if (currentToken) {
          // sendTokenToServer(currentToken);
          // updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          // updateUIForPushPermissionRequired();
          // setTokenSentToServer(false);
        }
      }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
        // setTokenSentToServer(false);
      });
    }

    // function showToken(currentToken) {
      // Show token in console and UI.
      // var tokenElement = document.querySelector('#token');
      // tokenElement.textContent = currentToken;
    // }

  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  // function sendTokenToServer(currentToken) {
  //   if (!isTokenSentToServer()) {
  //     console.log('Sending token to server...');
  //     // TODO(developer): Send the current token to your server.
  //     // setTokenSentToServer(true);
  //   } else {
  //     console.log('Token already sent to server so won\'t send it again ' +
  //         'unless it changes');
  //   }

  // }

  // function isTokenSentToServer() {
  //   return window.localStorage.getItem('sentToServer') === '1';
  // }

  // function setTokenSentToServer(sent) {
  //   window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  // }

  // function showHideDiv(divId, show) {
  //   const div = document.querySelector('#' + divId);
  // }

  function requestPermission() {
    console.log('Requesting permission...');
    // [START request_permission]
    messaging.requestPermission().then(function() {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // [START_EXCLUDE]
      // In many cases once an app has been granted notification permission, it
      // should update its UI reflecting this.
      resetUI();
      // [END_EXCLUDE]
    }).catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
    // [END request_permission]
  }

  function deleteToken() {
    // Delete Instance ID token.
    // [START delete_token]
    messaging.getToken().then(function(currentToken) {
      messaging.deleteToken(currentToken).then(function() {
        console.log('Token deleted.');
        // setTokenSentToServer(false);
        // [START_EXCLUDE]
        // Once token is deleted update UI.
        resetUI();
        // [END_EXCLUDE]
      }).catch(function(err) {
        console.log('Unable to delete token. ', err);
      });
      // [END delete_token]
    }).catch(function(err) {
      console.log('Error retrieving Instance ID token. ', err);
      // showToken('Error retrieving Instance ID token. ', err);
    });

  }

  // Add a message to the messages element.
  // function appendMessage(payload) {
  //   const messagesElement = document.querySelector('#messages');
  //   const dataHeaderELement = document.createElement('h5');
  //   const dataElement = document.createElement('pre');
  //   dataElement.style = 'overflow-x:hidden;';
  //   dataHeaderELement.textContent = 'Received message:';
  //   dataElement.textContent = JSON.stringify(payload, null, 2);
  //   messagesElement.appendChild(dataHeaderELement);
  //   messagesElement.appendChild(dataElement);
  // }

  // Clear the messages element of all children.
  // function clearMessages() {
  //   const messagesElement = document.querySelector('#messages');
  //   while (messagesElement.hasChildNodes()) {
  //     messagesElement.removeChild(messagesElement.lastChild);
  //   }
  // }

  // function updateUIForPushEnabled(currentToken) {
    // showHideDiv(tokenDivId, true);
    // showHideDiv(permissionDivId, false);
    // showToken(currentToken);
  // }

  // function updateUIForPushPermissionRequired() {
  //   showHideDiv(tokenDivId, false);
  //   showHideDiv(permissionDivId, true);
  // }

  },
  methods: {

  }
}
</script>