
<template>
    <b-container fluid :class="env == 'development' ? 'devBackground' : 'background'">
        <b-row no-gutters align-h="center">
            <b-col cols="12" class="p-0 mt-0">
                <featured-collection class="h-100"></featured-collection>
            </b-col>
            <b-col cols="12" class="infoBox bg-black white op-4 p-2 p-md-4">
                <b-row no-gutters>
                    <p class="ml-md-1 h4 w-100">Learn About Our Featured Brands</p>
                    <b-col>
                        <b-btn class="btn bg-slate m-1" rounded @click="getWatchInfoById(1)">Ocean Crawler</b-btn>
                        <b-btn class="btn bg-slate m-1" rounded @click="getWatchInfoById(2)">Aragon</b-btn>
                        <b-btn class="btn bg-slate m-1" rounded @click="getWatchInfoById(3)">Christopher Ward</b-btn>
                        <b-btn class="btn bg-slate m-1" rounded @click="getWatchInfoById(4)">Zelos</b-btn>
                        <b-btn class="btn bg-slate m-1" rounded @click="getWatchInfoById(5)">Terra Cielo Mare</b-btn>
                    </b-col>
                </b-row>
                <b-row class="p-3" no-gutters>
                    <b-col class="p-0">
                        <p class="h3">{{currentWatchInfo.brand}}</p>
                        <p v-if="currentWatchInfo.siteLink"><a target="_blank" class="pointer" :href="currentWatchInfo.siteLink">Shop {{currentWatchInfo.brand}}</a></p>
                        <p v-for="(line, index) in currentWatchInfo.description" :key="index">
                            {{line}}
                        </p>
                        <p class="h5 pointer" v-if="currentWatchInfo.siteLink"><a :href="currentWatchInfo.siteLink" target="_blank">Learn More</a></p>
                        <b-row align-h="center" v-if="currentWatchInfo.logoSrc" class="mt-md-5" no-gutters>
                            <b-col class="mx-auto mt-3 center" cols="5">
                                <b-img fluid :src="ROOT_API + currentWatchInfo.logoSrc" class="center"></b-img>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12">
                <app-footer id="footer"></app-footer>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import FeaturedCollection from './FeaturedCollection.vue'
import Footer from '../components/Footer.vue'

export default {

  name: 'discoverWatches',
  components: {
    appFooter: Footer,
    featuredCollection: FeaturedCollection
  },

  data: function () {
    return {
      env: process.env.NODE_ENV,
      currentWatchInfo: {
        brand: 'From Micro to Mega',
        description: ['From micro brands up to the most prestigious watch brands today, we aim to offer the the background, reasoning and devotion that goes into the creation of our Featured Collection timepieces.']
      },
      ROOT_API: process.env.VUE_APP_ROOT_API
    }
  },

  methods: {
    getWatchInfoById (watchInfoId) {
      this.$store.dispatch('getWatchInfoById', watchInfoId).then(res => {
        this.currentWatchInfo = res
      })
    }
  }
}
</script>

<style scoped>
    .devBackground {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("http://localhost:8081/api/static-assets/tablebg.jpg");
        height: auto;
        min-height: 94vh;
        /* background-position: center; */
        background-repeat:repeat;
        background-size: cover;
        /* position: relative; */
    }

    .background {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/api/static-assets/tablebg.jpg");
        height: auto;
        /* background-position: center; */
        background-repeat:repeat;
        background-size: cover;
        /* position: relative; */
    } 

    @media(max-width: 768px) {
         .infoBox {
             min-height: auto;
            height: auto;
         }
    }

</style>
