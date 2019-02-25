<template>
  <b-container fluid id="app" class="w-100 p-0 relative">
      <app-header id="header"></app-header>

      <on-scroll-menu class="scrollMenu" v-if="isProfilePage"> </on-scroll-menu>


      <transition name="slide-fade">
          <router-view id="body" class="fullHeight" :key="$route.fullPath"></router-view>
      </transition>


      <app-footer v-if="!isLoading" id="footer" :class="isProfilePage && (CollectionLength > 5) ? 'mt-5' : 'mt-0'"></app-footer>

      
  </b-container>
</template>

<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Loader from './components/Loader.vue'
import OnScrollMenu from './components/Profile/Collection/OnScrollMenu.vue'

export default {

  components: {
    appHeader: Header,
    appFooter: Footer,
    appLoader: Loader,
    onScrollMenu: OnScrollMenu
  },

  methods: {
     closeToBottom () {
        return true
    },

    data () {
      return {
        isProfilePage: false
      }
    }

    
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
</script>

<style scoped>

.fullHeight {
  min-height: 91vh;
}

#app {
  overflow: scroll;
}

#footer {
  position: relative;
  z-index: 3;
  /* margin-top: 3rem; */
  overflow: scroll
}

.scrollMenu {
  bottom:0;
  margin-bottom: 5rem;
  position: fixed;
  z-index: 3;
  width: 100%;
  
}

.borderRed {
  border: 4px solid red;
}

.wrapper {
  min-height: 100vh;
  height: auto;
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
