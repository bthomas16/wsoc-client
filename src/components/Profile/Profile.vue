<template>
    <b-container ref="profileRef" v-if="isUserLoaded" class="p-0">
        <!-- <transition name="fadeIn">   -->
            <b-row no-gutters class="box-shadow bg-red z-4 py-4" v-if="isServerValidationError">
                <p class="h4 center w-100 white">Your session has expired. Please try again.</p>
                <b-col cols="12"></b-col>
                <b-btn class="btn mx-auto white" variant="secondary" @click="reload">Refresh Page</b-btn>
            </b-row>
            
            <b-row no-gutters v-else>
                <b-col lg="2" md="3" cols="12" class="profileInfoBorder mx-auto">
                    <app-profile-info></app-profile-info>
                    <b-row class="d-none d-md-block p-xl-4 bg-lightgray" no-gutters>
                        <b-col class="mx-auto" cols="12">
                            <app-sidebar></app-sidebar>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col lg="10" md="9" cols="12">
                    <app-collection></app-collection>
                </b-col>
            </b-row>
       <!-- </transition> -->
       <!-- <b-row class="mr-0">
           <b-col cols="12" md="9"><app-feed></app-feed></b-col>
       </b-row> -->


       

        
       
    </b-container>
</template>

<script>
import axios from 'axios'
import ProfileInfo from './ProfileInfo.vue'
import Collection from './Collection/Collection.vue'
import Sidebar from './Sidebar.vue'
import Feed from './Feed/Feed.vue'

export default {
    
  components: {
    appProfileInfo: ProfileInfo,
    appCollection: Collection,
    appSidebar: Sidebar,
    appFeed: Feed
  },

  data: function () {
    return {
        
    }
  },

  methods: {
    reload () {
      location.reload()

       // Analytics
      this.$ga.event({
        eventCategory: 'ERROR',
        eventAction: 'MANUAL_PAGE_REFRESH'
      })
    },

     

    toggleDragToOrganize() {
        this.$store.dispatch('toggle')
    },

   

    
  },

  computed: {
    isUserLoaded () {
      return this.$store.state.isUserLoaded
    },

    isServerValidationError () {
      return this.$store.state.isServerValidationError
    },
},

    created () {
        this.$store.dispatch('user')
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

  
}
</script>

<style scoped>
.container {
    max-width: 100%;
    background: white;
}

.profileInfoBorder {
        border: .75px solid #dee2e6;
        min-height: 94vh;
    }

@media(max-width:800px) {
    .profileInfoBorder {
        border-right: 0;
        border-left: 0;
    }
}

@media(max-width:765px) {
    .profileInfoBorder {
        border: .75px solid #dee2e6;
        min-height: auto;
        height: auto;
    }
}
</style>
