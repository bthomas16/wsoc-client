<template>
    <b-row no-gutters class="bg-white" align-v="end">
        <!-- <b-col cols="12"> -->
          <b-col class="relative">
            <b-btn @click="fbLogin()" variant="default" class="bg-fb_blue white"><span class="h4 px-2">{{text}} in with Facebook</span></b-btn>
      <!-- <div @click="checkLoginState()" class="fb-login-button" data-size="medium" data-button-type="login_with" data-auto-logout-link="false" data-use-continue-as="false"></div> -->
            
          </b-col>
        <!-- </b-col> -->
    </b-row>
</template>

<script>
export default {
    name: 'fbookLogin',
    props: ['text'],
    data () {
        return {

        }
    },

    methods: {
        fbLogin() {
          return FB.login(result => {
            let accessToken = result.authResponse.accessToken
              let fbookUserId = result.authResponse.userID
            console.log('userID is', fbookUserId)
              
              this.$store.dispatch("fbookAuth", {accessToken, fbookUserId})
            }, {scope: 'public_profile,email'})
        },
        
      checkLoginState() {
        let t = this
          FB.getLoginStatus(function(response) {
            t.statusChangeCallback(response);
          })
        },
    
      statusChangeCallback (response) {
          
          let rs = response.status
          if (rs == 'connected') {
            // window.location.href = "/profile"
            let token = response.authResponse.accessToken
            let fbookUserId = response.authResponse.userID
            this.$store.dispatch("fbookAuth", token, fbookUserId)
          } else {
            FB.login(result => {
              let token = result.authResponse.accessToken
              let fbookUserId = result.authResponse.userID
              
              console.log('going to try now')
              this.$store.dispatch("fbookAuth", token, fbookUserId)
            })
          }
        }
    }
}
</script>

<style scoped>

.loginText {
  font-size: 1.25rem;
  margin-top: 20rem !important;
}

</style>


