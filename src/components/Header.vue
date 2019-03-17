<template>
  <b-navbar toggleable="lg" type="dark" class="bg-light-blue">

  <b-navbar-toggle target="navCollapse"></b-navbar-toggle>

  <b-navbar-brand @click="gaEvent('Brand')"><router-link class="white rubik" :to="isAuthorized ? '/profile' : '/'"><b-img src="/img/icons/logo.png" class="logo"></b-img></router-link></b-navbar-brand>

  <b-collapse is-nav ref="navCollapse" id="navCollapse" class="rubik">

    <b-navbar-nav class="mt1 white ml-0 relative" @click="tryToggle">
        <b-nav-item @click="gaEvent('Profile')" v-if="isAuthorized"><router-link to="/profile">My Profile</router-link></b-nav-item>
        <b-nav-item @click="gaEvent('Home')" v-else><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item @click="gaEvent('Discover')"><router-link to="/discover">Discover</router-link></b-nav-item>
        <!-- <b-nav-item><router-link to="/watch-news">Watch News</router-link></b-nav-item>  -->
        <b-nav-item @click="gaEvent('Contact')"><router-link to="/contact">Contact Us</router-link></b-nav-item>
        <b-nav-item @click="logout('Logout')" class="white d-block d-lg-none absolute t-0 r-0 r0 right" v-if="isAuthorized">Logout</b-nav-item>
    </b-navbar-nav>

    <b-nav-item @click="logout('Logout')" class="d-none absolute d-lg-block r0 mr-md-4 my-0 white" v-if="isAuthorized" right>Logout</b-nav-item>

  </b-collapse>
</b-navbar>

</template>

<script>
export default {
  methods: {
    logout (label) {
      this.$store.dispatch('logout')
      FB.logout()

      this.$ga.event({
        eventCategory: 'Header',
        eventAction: 'Header_Link_Click',
        eventLabel: label
      })

      location.reload()
    },

    tryToggle () {
      if (window.innerWidth < 993) {
        this.$refs.navCollapse.toggle()
      }
    },

    // Analytics
    gaEvent(label) {
      this.$ga.event({
        eventCategory: 'Header',
        eventAction: 'Header_Link_Click',
        eventLabel: label
      })
    }
  },

  computed: {
    isAuthorized () {
      return this.$store.state.isAuthorized
    }
  }
}
</script>

<style scoped>
.container-fluid {
  font-family: 'Heebo', sans-serif;
}

/* .bg-header {
  background-color: rgba(86, 163, 166, .85)
} */

.logo {
  width: 10rem;
}

li a {
  color: white;
}

li a:hover, .navbar-brand:hover {
  color: white;
  text-decoration: underline
}

.absolute {
  position: absolute;
}
.r0 {
  right: 0;
}
.container-fluid {
  padding: 0;
}
.navbar-brand {
  font-size: 1.75em;
}

.navbar-nav {
  margin-left:4em;
}

.navbar-dark .navbar-nav .nav-link {
  color:white;
}

li.nav-item a {
  font-family: 'Varela Round';
}

#ads .img-fluid {
    max-width: 75%;
  }

  .navbar-brand {
      font-size: 1.5em;
  }

  .navbar-toggler, .navbar-toggler:focus {
      border:none;
      outline: none;
  }

@media(max-width: 575px) {
  .navbar-collapse {
    background-color: rgba(2,36,95,.1);
    padding: 1em;
  }

 #ads .img-fluid {
    max-width: 60%;
  }

}

@media(max-width: 500px) {
  .navbar-collapse {
    background-color: rgba(2,36,95,.1);
    padding: 1em;
  }

 #ads .img-fluid {
    max-width: 75%;
  }

}

@media(max-width: 350px) {
  #ads .img-fluid {
    max-width: 100%;
  }
}

</style>
