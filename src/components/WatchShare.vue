<template>
    <b-container fluid v-if="hasWatchToShow" class="wrapper">
        <b-row class="white pt-2 pt-md-4 minHeight" no-gutters v-if="hasWatchToShow" align-h="center" align-v="start">
            <b-col cols="12" md="6" class="order-2 order-md-1">
                <b-row no-gutters align-h="center" class="mx-auto left-align pl-md-4">
                    <b-col cols="12" class="px-2 center mx-auto" >
                        <p class="h2 underline mb-3">Viewing {{watch.firstName}}'s Watch</p>
                    </b-col>
                    <b-col cols="12" class="px-2 my-2 center mx-auto">
                        <b-col cols="12" md="6" class="bg-lightgray p-0 py-2 rounded">
                            <p><strong>Full Kit:</strong> {{watch.isFullKit ? 'Yes' : 'No'}}</p>
                            <p><strong>For Sale:</strong> {{watch.isForSale ? 'Yes' : 'No'}}</p>
                            <p><strong>For Trade:</strong> {{watch.isForTrade  ? 'Yes' : 'No'}}</p>
                        </b-col>
                    </b-col>
                    <b-col cols="12" class="px-2 center mx-auto" >
                        <p v-if="watch.brand"><strong>Brand:</strong> {{watch.brand}}</p>
                        <p><strong>Name:</strong> {{watch.name}}</p>
                    </b-col>
                    <b-col cols="12" class="px-2 center mx-auto specsDiv">
                        <p v-if="watch.condition"><strong>Condition:</strong> {{watch.condition}} / 10</p>
                        <p v-if="watch.watchStyle"><strong>Style:</strong> {{watch.watchStyle}}</p>
                        <p v-if="watch.sizeWidth"><strong>Case Width:</strong> {{watch.sizeWidth}}mm</p>
                        <p v-if="watch.sizeHeight"><strong>Case Height:</strong> {{watch.sizeHeight}}mm</p>
                        <p v-if="watch.sizeLugToLug"><strong>Lug Size:</strong> {{watch.sizeLugToLug}}mm</p>
                        <p v-if="watch.movementType"><strong>Movement Type:</strong> {{watch.movementType}}</p>
                        <p v-if="watch.movement"><strong>Movement:</strong> {{watch.movement}}</p>
                        <p v-if="watch.crystal"><strong>Crystal:</strong> {{watch.crystal}}</p>
                        <p v-if="watch.accuracy"><strong>Accuracy:</strong> {{watch.accuracy}}</p>
                        <p v-if="watch.band"><strong>Strap:</strong> {{watch.band}}</p>
                        <p v-if="watch.crystal"><strong>Crystal:</strong> {{watch.crystal}}</p>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" md="6" class="center mx-auto order-1 order-md-2">
                <b-carousel
                
                style="text-align: center"
                    :interval=0
                    :controls="watch.src.images.length > 1 ? true : false"
                    :indicators="watch.src.images.length > 1 ? true : false">
                    <b-carousel-slide v-for="(image, index) in watch.src.images" :key="index" class="watchImgWrapper">
                            <b-img crossorigin="anonymous" slot="img" class="watchImg center" :src="image.src" alt="image slot" thumbnail fluid>
                            </b-img>

                    </b-carousel-slide>
                </b-carousel>
            </b-col>
            
            <!-- Photos loop through -->
            <!-- <b-col cols="4" class="d-inline border center order-2 order-md-3 imgWrapper" v-for="(url, index) in watch.src.images" :key="index">
                <b-img  fluid :src="url.src" class="mx-auto img"> </b-img>
            </b-col> -->

             
        </b-row>
        <b-row v-else>
            Loading...
        </b-row>

        <app-footer id="footer"></app-footer>
    </b-container>
</template>

<script>
import Footer from './Footer.vue'

export default {
    name: 'watchShare',
    components: {
        appFooter: Footer
    },

    data: function() {
        return {
            hasWatchToShow: false,
            watch: {}
        }
    },

    methods: {
    },

    computed: {

    },

    created() {
        const urlParams = new URLSearchParams(window.location.search);
        const watchId = urlParams.get('watchId');
        this.$store.dispatch('getWatchShareById', watchId).then(watch => {
            this.watch = watch
            this.hasWatchToShow = true;
        })
    }

}
</script>

<style scoped>
.specsDiv {
     min-height: 66vh;
}
.wrapper {
    padding: 0 !important;
    margin: 0;
   
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/img/tablebg.jpg");
}

.watchImgWrapper {
    width: 100%;
    height: 28rem;
}

.watchImg {
    width: auto;
    max-height: 100%;
    object-fit: center;
}

#footer {
    position: relative;
    bottom: 0;
}

p {
    word-wrap: break-word;
    font-size: 1rem;
    line-height:1.5;
    margin: 0.25rem;;
    text-align: left;
}

@media(max-width: 1100px) {
    .watchImgWrapper {
    height: 14.5rem;
    }
}

@media(max-width: 766px) {
    .specsDiv {
     min-height: 34vh;
    }
}

</style>
