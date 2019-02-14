<template>
    <transition name="fadeIn">
        <b-row v-if="isScrolling" class="bgOpaque py-2 " no-gutters :class="needsMarginBottom ? 'nbm fixed' : ''">
            <b-col cols="6" md="3" offset-md="3" class="center">
                <b-btn class="btn" varaint="secondary" @click="scrollToTop">Back to Top</b-btn> 
            </b-col>
                <b-col cols="6" md="3"  class="center">
                    <b-btn v-show="isDragToOrganize" class="btn bg-navy white" varaint="secondary" @click="isDragToOrganize = !isDragToOrganize">Disable Drag</b-btn> 
                    <b-btn v-show="!isDragToOrganize" class="btn" varaint="secondary" @click="isDragToOrganize = !isDragToOrganize">Enable Drag</b-btn> 
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
            needsMarginBottom: false
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

            console.log(documentHeight)

            if (scrollTop + windowHeight > documentHeight + 735) {
                console.log((scrollTop + windowHeight), (documentHeight + 775))
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
        }
    },

    created () {
        window.addEventListener('scroll', this.handleScroll)
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

    .nbm {
        margin-bottom: 5rem;
    }
</style>


