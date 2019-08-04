<template>
  <modal
    name="login-modal"
    :classes="['v--modal', 'login-modal']"
    transition="nice-modal-fade"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    :clickToClose="true"
    height="auto"
  >
    <div class="inner">
      <vs-button color="#4284f4" type="filled" v-on:click="loginGoogle">
        <font-awesome-icon :icon="['fab', 'google']" />Login con Google
      </vs-button>
      <vs-button color="#4284f4" type="filled" v-on:click="loginFacebook">
        <font-awesome-icon :icon="['fab', 'facebook-f']" />Login con Facebook
      </vs-button>
    </div>
  </modal>
</template>

<script>
import firebase from 'firebase';

export default {
  methods: {
    loginGoogle() {
      const _this = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          localStorage.setItem("access_token", token)
          window.location.reload()
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error)
          // ...
        });
    },
    loginFacebook(){
      const _this = this;
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user)
        localStorage.setItem("access_token", token)
        window.location.reload()
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error)
      });
    }
  }
};
</script>

<style scoped>
</style>
