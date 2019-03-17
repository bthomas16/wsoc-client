<template>
    <transition name="fadeIn" v-if="IsCollectionLength" v-show="isOnProfilePage">
        <b-row v-if="isScrolling" class="relative bgOpaque py-2" no-gutters>
            <!-- <b-col cols="11" class="absolute right-align red m-0 p-0 h-0">X</b-col> -->
            <b-col :cols="IsManagingCollection ? 8 : 6" :md="IsManagingCollection ? 6 : 3" class="center mx-auto" :class="IsManagingCollection ? 'mx-auto' : ''">
                <b-btn class="btn w-90 p-1" varaint="secondary" @click="scrollToTop">Back to Top</b-btn> 
            </b-col>
                <b-col cols="6" md="3"  class="center mx-auto" :class="IsManagingCollection ? 'd-none' : ''">
                    <b-btn v-show="isDragToOrganize" class="btn w-90 p-1 bg-navy white" varaint="secondary" @click="isDragToOrganize = !isDragToOrganize">Disable Drag</b-btn> 
                    <b-btn v-show="!isDragToOrganize" class="btn w-90 p-1" varaint="secondary" @click="isDragToOrganize = !isDragToOrganize">Enable Drag</b-btn> 
            </b-col>
        </b-row>
    </transition>
</template>

<script>
export default {
    name: "onScrollMenu",
    data () {
        return {
            isScrolling: false,
            needsMarginBottom: false,
            isOnProfilePage: false
        }
    },
    methods: {
        scrollToTop() {
          window.scrollTo(0, 0)
      },
        handleScroll() {
            let scrollTop = window.scrollY; // current position in document (px)
            let windowHeight = window.innerHeight; // user's visible screen remaing (px)
            let documentHeight = document.body.clientHeight; // total document height (px)
            this.isScrolling = window.scrollY > 175


            if (scrollTop + windowHeight > documentHeight + 735) {
                this.needsMarginBottom = true
            }
            else {
                this.needsMarginBottom = false
            }
        },
    },

    computed: {
        isDragToOrganize: {
            get () {
                return this.$store.state.isDragToOrganize
            },
            set (value) {
                this.$store.dispatch('toggleIsDragToOrganize', value)
            }
        },

        IsCollectionLength () {
            return this.$store.state.Collection.length > 0 
        },

        IsManagingCollection () {
            return this.$store.state.isManagingCollection
        }
    },

    created () {
        window.addEventListener('scroll', this.handleScroll)
         if (window.location.pathname == '/profile') {
            this.isOnProfilePage = true
        }
        this.isOnProfilePage = false
    },

    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style scoped>
    .bgOpaque {
        background-color: rgba(215,215,215, .5);
    }

    .w-90 {
        width: 75%;
    }
</style>


