<template>
    <b-container fluid>
        <b-row class="bg-darkgray p-2" no-gutters>
            <b-col cols="6">
                <ul class="white">
                    <li @click="gaEvent('Discover')"><router-link to="/discover">Discover Watches</router-link></li>
                    <li @click="gaEvent('Contact')"><router-link to="/contact">Contact Us</router-link></li>
                    <!-- <li>About Us</li> -->
                </ul>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col cols="12" class="bg-darkgray p-0 white center">
                <!-- <p class="h7 my-0">ⒸAll Rights Reserved</p> -->
                <p class="h6 my-0 mb-1">Watch SOC @{{DateYear}}  </p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'Footer',

  methods: {
    gaEvent(label) {
        this.$ga.event({
            eventCategory: 'Footer',
            eventAction: 'Footer_Link_Click',
            eventLabel: label
        })
    }
  },

  computed: {
    DateYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<style scoped>
    a {
        color: white;
    }
    
    ul {
        padding: 0;
        margin: 0;
    }

    li {
        padding: 0;
        margin: 0;
        list-style-type: none;
        color: white !important;
    }

</style>
