<template>
    <b-container fluid>
        <loader v-if="isLoading" class="mt-2 p-3"></loader>


        <b-row align-v="start" align-h="center" no-gutters v-show="!isLoading">
            <b-col cols="12" class="p-0 m-0">
                <b-row no-gutters>
                    <b-col class="relative imgWrapper">
                        <b-row no-gutters align-h="center">
                            <transition name="fadeIn">
                                <b-col v-if="!isLoading" id="titleCard" class="absolute bgYellow center t-0 p-2 p-md-3" cols="11" md="8" lg="6">
                                    <p class="h1 white center">Watch SOC</p>
                                    <p class="h2 m-h2 white center">Manage your current, past & future <strong class="nowrap">Watch SOC</strong> </p>
                                </b-col>
                            </transition>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" class="bg-white" :class="isShowingAlert ? 'alert-wrapper' : 'wrapper'">
                <b-row no-gutters align-v="start" class="m-0 p-0">
                    <b-col cols="12" md="6" class="my-0 bg-white h-100">
                        <p v-if="!isRegister" class=" h3 my-0 py-2 p-1 p-md-2 bg-light-blue white left">Register to<span class="nowrap left"> Manage your collection!</span></p>
                        <p v-if="isRegister" class=" h3 my-0 py-2 p-1 p-md-2 bg-light-blue white left">Login to<span class="nowrap left"> Manage your collection!</span></p>
                        <app-register class="mt-2 px-md-3 px-lg-0" v-if="!isRegister" v-on:ToggleShowingAlert="showingAlertChangeHeight"  v-on:toggleAuthView="toggleAuthParent" v-on:toggleAuthLoading="toggleAuthLoading"></app-register>
                        <app-login class="mt-2 px-md-3 px-lg-0" v-if="isRegister" v-on:ToggleShowingAlert="showingAlertChangeHeight" v-on:toggleAuthView="toggleAuthParent" v-on:toggleAuthLoading="toggleAuthLoading"></app-login>
                    </b-col>
                    <b-col cols="12" md="6" class="d-none d-md-block bgBlue h-100 m-0 p-2" :class="isShowingAlert ? 'lineHeightAlert' : 'lineHeight'">
                        <ul class="mt-0 pl-md-0 pl-lg-4 nowrap">
                            <!-- <p class="h2 underline h-100">What is Watch SOC?</p> -->
                            <li>Always keep your Collection with you</li>
                            <li>Add, edit &amp; remove Watches</li>
                            <li>Manage sales, trades &amp; acquisitions</li>
                            <li>Randomize today's timepiece</li>
                            <li>Discover new watches &amp; brands</li>
                            <li>Learn what your WOTD is today!</li>
                        </ul>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12">
                <featured-collection class="h-100"></featured-collection>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Register from './Register.vue'
import Login from './Login.vue'
import Loader from '../Loader.vue'

import FeaturedCollection from '../FeaturedCollection.vue'

export default {
  
  components: {
    appRegister: Register,
    appLogin: Login,
    featuredCollection: FeaturedCollection,
    loader: Loader
  },
  
  data () {
    return {
      ROOT_API: process.env.VUE_APP_ROOT_API,
      selectedWatch: {},
      showLogin: false,
      env: process.env.NODE_ENV,
      isRegister: true,
      isShowingAlert: false,
      isAuthLoading: false
    }
  },
  methods: {
    toggleAuthParent: function () {
      return this.isRegister = !this.isRegister
    },

    isValidToken () {
      return this.$store.state.isAuthorized
    },

    showingAlertChangeHeight(val) {
        this.isShowingAlert = val
    },

    toggleAuthLoading (value) {
        this.isAuthLoading = value
    }
  },

  computed: {
      isLoading () {
          return this.$store.state.isLoading
      }
  }
}
</script>

<style scoped>
    .wrapper {
        height: 20rem;
    }

    .alert-wrapper {
        height: 21rem;
    }

    .bgBlue {
        background-color: rgba(9, 25, 37, .2);
        height: 100%;
    }

    .bgYellow {
        background-color: rgba(32, 99, 155, .5);
    }

    ul > li { 
        /* margin-top: .35rem; */
        /* height: 50px; */
        padding-left: 45px;
        font-weight: 700;
        background-repeat: no-repeat;
        margin-top: 1rem;
        background-image: url('/img/icons/favicon-32x32.png');
    }

    .lineHeight {
        line-height: 32px;
    }

    .lineHeightAlert {
        line-height: 35px;
    }

    .imgWrapper {
       background-repeat: no-repeat;
       background-size: cover;
       background-position: center; 
       height: 25rem;
       overflow: hidden;
       background-image: linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .25)), url('/img/icons/watcheshomecardbg.jpg');           
    }

    #titleCard {
        position: absolute;
        margin-top: 6rem;
    }

    input {
        border: none;
        border-bottom: 2px solid gray;
        outline: none;
    }

    #watch-collection {
        /* background: rgba(40,40,40,.2   ); */
        overflow-y: scroll;
    }

    .outline {
        -webkit-text-stroke: 1px black;
    }

    #brandLogo {
        max-height: 75px;
    }

    .form-control:focus {
        border: none;
        outline: none !important;
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    @media(max-width: 995px){
        .rowContainer {
            height: 100%;
        }

        .card {
            border: none;
            border-radius: 0;
        }

        #titleCard {
            margin-top: 5rem;
        }

        .imgWrapper {
            height: 24rem;
        }

        .wrapper {
            height: 19.375rem;
        }

        .alert-wrapper {
            height: 20.5rem;
        }
    }

    @media(max-width: 765px){
        .card, .card-img {
            box-shadow: none;
            border: none;
            border-radius: 0;
        }

        #titleCard {
            margin-top: 5rem;
        }

        .imgWrapper {
            height: 20rem;
        }

        .wrapper {
            height: 18.9rem;
        }

        .alert-wrapper {
        height: 21.25rem;
        }
    }
</style>

<!-- b-form-1.vue -->
