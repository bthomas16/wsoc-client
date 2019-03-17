<template>
  <b-container fluid id="app" class="w-100 p-0 relative">
      <app-header id="header"></app-header>
      <transition name="slide-fade">
          <router-view id="body" class="fullHeight" :class="CollectionLength >= 9 && isProfilePage ? 'mb-5' : ''" :key="$route.fullPath"></router-view>
      </transition >
      
      <on-scroll-menu class="scrollMenu" v-if="isProfilePage"> </on-scroll-menu>

  </b-container>
</template>

<script>

import Header from './components/Header.vue'
import Loader from './components/Loader.vue'
import OnScrollMenu from './components/Profile/Collection/OnScrollMenu.vue'

export default {

  components: {
    appHeader: Header,
    appLoader: Loader,
    onScrollMenu: OnScrollMenu,

  },

  methods: {

  },

  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },

    isProfilePage () {
      if (this.$route.fullPath == '/profile') {
        return true
      }
      return false
    },

    CollectionLength () {
      return this.$store.state.Collection.length
    },

    isModalPopped () {
      return this.$store.state.isModalPooped
    }
  },

  created () {
    let t = this
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault
      let delayPrompt = e
      this.$store.state.DelayPrompt = e
    })
  },

  destroyed () {
      window.removeEventListener('beforeinstallprompt');
  }
}




const checkLoginState = function() {
    // let t = this
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    })
  }

function statusChangeCallback (response) {
      
      let rs = response.status
      if (rs == 'connected') {
        // window.location.href = "/profile"
        let token = response.authResponse.accessToken
        this.$store.dispatch("fbookAuth", token)
      } else {
        FB.login(result => {
          let token = result.authResponse.accessToken
          console.log('going to try now')
          this.$store.dispatch("fbookAuth", token)
        })
      }
    }
</script>

<style scoped>
.fullHeight {
  min-height: 91vh;
}

#app {
  overflow: scroll;
}

.scrollMenu {
  bottom:0;
  position: fixed;
  z-index: 3;
  width: 100%;
  
}





.slide-fade-enter-active {
  transition: all .35s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>
