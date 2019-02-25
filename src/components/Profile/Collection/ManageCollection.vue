<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="12" lg="10" class="mx-auto">

                <!-- Button to manage collection Collection -->
                

            <!-- FILTER & SORT WATCH ARRAY -->
                <!-- <transition-group name="faderade"> -->
                    <b-row class="mb-2 mb-md-2 relative pl-1" no-gutters align-h="center" key="1">
                        <b-col cols="12" md="10" class="border-bottom"></b-col>
                        <b-col cols="12" md="10" class="px-1 px-md-0">
                            <b-row no-gutters align-h="between" align-v="center">
                                <!-- <b-col cols="12">
                                    <strong v-if="isTryingShuffle" class="red" >*Can't organize while Managing Collection</strong>
                                </b-col> -->
                                <b-col cols="12" md="6" class="left-align pointer gray bold h4 m-h2 my-1" v-show="isManagingCollection" >
                                    <b-btn variant="outline-success" class="green" @click="toggleIsManagingCollection">Done</b-btn>
                                    <b-btn v-show="sortCategory || searchTermToFilterBy" variant="outline-secondary" class="ml-2" @click="resetCollectionFilter">Reset Filters</b-btn>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row key="2" ref="sortFilterId" class="px-2" align-v="start" align-h="center" v-show="isManagingCollection" no-gutters>
                        <b-col cols="12" md="6" class="order-md-2 order-1">
                            <b-row no-gutters>
                                <b-col cols="12" class="mx-auto selectWrapper">
                                    <b-input-group prepend="&#9906;" size="">
                                        <b-form-input class="filterText" id="searchInput" type="text" placeholder="Search" size="" @input="filterBySearchTerm" v-model="searchTermToFilterBy"></b-form-input>
                                    </b-input-group>
                                </b-col>
                            </b-row>
                            <b-row align-v="start" align-h="start" no-gutters class="mt-2">
                                <b-col cols="5" class="mx-auto pr-1">
                                    <b-form-select class="filterText p-1" :options="sortCategories" v-model="sortCategory" @change="selectSortCategory"></b-form-select>
                                </b-col>
                                <b-col cols="7" class="mx-auto pl-1">
                                    <b-form-select class="filterText p-1" :options="categoryOptions" v-model="categoryOption" @change="selectCategoryOption" :disabled="!sortCategory"></b-form-select>
                                </b-col>
                            </b-row>
                        </b-col>


                        <b-col cols="12" md="6" class="manage-btn-border order-md-1 order-2 pr-0 pr-md-2" >
                            <b-row align-v="center" align-h="center" id="watch-controls" no-gutters class="mt-1 mt-md-0">
                                <b-col cols="6" md="12" class="mx-auto center pr-1 pr-md-0" >
                                    <b-button id="manageButton" variant="default" class="bg-light-blue white h5 p-0 m-0 center " block size="" @click="selectRandomWatch">Random Watch</b-button>
                                </b-col>
                                <b-col cols="6" md="12" class="pl-1 pl-md-0 mt-md-2">
                                    <b-button class="bg-green white h5 p-0 m-0" id="addWatchButton" variant="default" @click="addNewWatch" size="" block>Add Watch</b-button>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>


                    
                <!-- </transition-group> -->

                <!-- Buttons for is Managing collection -->
                <!-- <transition name="faderade"> -->
                    <b-row align-v="start" align-h="between" class="px-2 mt-1" v-show="isManagingCollection" no-gutters>
                        <b-col cols="4" md="5">
                            <b-btn size="sm" v-if="!isShowEditFlags" @click="isShowEditFlags = !isShowEditFlags" variant="secondary" class="h5 m-0 w-100 white p-1">Show Flags</b-btn>
                            <b-btn size="sm" v-else @click="isShowEditFlags = !isShowEditFlags" variant="secondary" class="bg-navy h5 m-0 w-100 p-2">Hide Flags</b-btn>
                        </b-col>
                        <b-col cols="8" md="7"  class="nowrap">
                            <b-row no-gutters align-h="end">
                                <b-col cols="4" class="px-1">
                                    <b-btn :class="currentCardSize == 'sm' ? 'btn bg-navy white border' : ''" variant="secondary" class="w-100 btn toggleBtn" size="sm" @click="sizeCardToUse('sm')">sm</b-btn>                                        
                                </b-col>
                                <b-col cols="4" class="px-1">
                                    <b-btn :class="currentCardSize == 'md' ? 'btn bg-navy white border' : ''" variant="secondary" class="w-100 btn toggleBtn" size="sm" @click="sizeCardToUse('md')">md</b-btn>
                                </b-col>
                                <b-col cols="4" class="pl-1">
                                    <b-btn :class="currentCardSize == 'lg' ? 'btn bg-navy white border' : ''" variant="secondary" class="w-100 btn toggleBtn" size="sm" @click="sizeCardToUse('lg')">lg</b-btn>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                <!-- </transition> -->

                <!-- Buttons for not managing collection -->
                <!-- <transition name="faderade"> -->
                    <b-row v-show="!isManagingCollection" no-gutters>
                        <b-col class="mx-auto px-2 px-md-0" cols="12" md="10">
                            <b-row no-gutters>
                                <b-col cols="5" class="pr-1">
                                    <b-btn variant="outline-primary" class="my-0" size="sm" @click="selectRandomWatch" block>Random Watch</b-btn>
                                </b-col>
                                <b-col cols="7">
                                    <b-btn variant="default" class="my-0 bg-light-blue white" size="sm" @click="toggleIsManagingCollection" block>Manage Collection</b-btn>
                                </b-col>
                            </b-row>
                            <b-row no-gutters align-v="center" align-h="between" id="mobileRow" class="mx-auto mt-md-2 flagWidth" v-if="!isManagingCollection">
                                <b-col cols="7"> 
                                    <b-row no-gutters align-h="between">
                                        <b-col cols="6" class="mt-1 mt-md-0 pr-1 pr-md-2">
                                            <b-btn size="sm" v-if="!isShowFlags" @click="isShowFlags = !isShowFlags" variant="secondary" class="h8 m-0 w-100 white p-1">Show Flags</b-btn>
                                            <b-btn size="sm" v-else @click="isShowFlags = !isShowFlags" variant="secondary" class="h8 m-0 bg-navy w-100 p-1">Hide Flags</b-btn>
                                        </b-col>
                                        <b-col cols="6" class="mt-1 mt-md-0 pr-md-0">
                                            <b-btn size="sm" v-if="isDragToOrganize" @click="isDragToOrganize = !isDragToOrganize" variant="secondary" class="bg-navy white h8 w-100" >Disable Drag</b-btn>
                                            <b-btn size="sm" v-else @click="isDragToOrganize = !isDragToOrganize" variant="secondary" class=" h8 w-100">Enable Drag</b-btn>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col cols="5" class="nowrap mt-1 mt-md-0">
                                    <b-row no-gutters align-h="end">
                                        <b-col cols="4" class="pl-1">
                                            <b-btn :class="currentCardSize == 'sm' ? 'btn bg-navy white border' : ''" variant="secondary" class="w-100 btn toggleBtn" size="sm" @click="sizeCardToUse('sm')">sm</b-btn>                                        
                                        </b-col>
                                        <b-col cols="4" class="pl-1">
                                            <b-btn :class="currentCardSize == 'md' ? 'btn bg-navy white border' : ''" variant="secondary" class="w-100 btn toggleBtn" size="sm" @click="sizeCardToUse('md')">md</b-btn>
                                        </b-col>
                                        <b-col cols="4" class="pl-1">
                                            <b-btn :class="currentCardSize == 'lg' ? 'btn bg-navy white border' : ''" variant="secondary" class="w-100 btn toggleBtn" size="sm" @click="sizeCardToUse('lg')">lg</b-btn>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                <!-- </transition> -->

            </b-col>

        <!-- END MANAGE COLLECTION -->
        <!-- END MANAGE COLLECTION -->
        <!-- END MANAGE COLLECTION -->
        <!-- END MANAGE COLLECTION -->
        <!-- END MANAGE COLLECTION -->

        </b-row>
    </b-container>
</template>
<script>
export default {
  name: 'manageCollection',
  props: [],

  data () {
    return {
      conditionToFilterBy: '',
      styleToFilterBy: '',
      statusToFilterBy: '',
      searchTermToFilterBy: '',
      sortCategory: null,
      sortCategories: [
        { value: null, text: 'Sort By', disabled: true },
        { value: 'condition', text: 'Condition' },
        { value: 'status', text: 'Status' },
        { value: 'style', text: 'Style' },
        { value: 'favorites', text: 'Favorites' },
        { value: 'previous', text: 'Removed' }
      ],

      categoryOptions: [{ value: null, text: 'Sort Criteria', disabled: true }],
      categoryOption: null
    }
  },
  methods: { 
    

    sizeCardToUse (val) {
      this.$store.dispatch('sizeCardToUse', val)

       // Analytics
      this.$ga.event({
        eventCategory: 'Manage_Collection',
        eventAction: 'Size_Watch_Card_Selection',
        eventLabel: "Using (" + val + ") Watch Card Size"
      })
    },

    toggleIsManagingCollection () {
      this.resetCollectionFilter()
      this.$store.dispatch('toggleIsManagingCollection')
      this.$store.dispatch('toggleIsDragToOrganize', false)

       // Analytics
      this.$ga.event({
        eventCategory: 'Manage_Collection_Btn',
        eventAction: 'Manage_Collection_Btn_Toggle',
        eventLabel: this.$store.state.isManagingCollection ? 'true' : 'false'
      })
    },

    selectSortCategory (eventLabel) {
      this.searchTermToFilterBy = ''
      this.sortCategory = eventLabel
      this.categoryOption = null

      switch (eventLabel) {
        case 'condition':
          this.categoryOptions = [
            { value: null, text: 'Category', disabled: true },
            { value: 8, text: '8-10' },
            { value: 5, text: '5-7' },
            { value: 1, text: '0-4' }
          ]
          break
        case 'status':
          this.categoryOptions = [
            { value: null, text: 'Category', disabled: true },
            { value: 'keeper', text: 'Keeper' },
            { value: 'sale', text: 'For Sale' },
            { value: 'trade', text: 'For Trade' },
            { value: 'fsot', text: 'Sale / Trade' }
          ]
          break
        case 'style':
          this.categoryOptions = [
            { value: null, text: 'Category', disabled: true },
            { value: 'diver', text: 'Diver' },
            { value: 'dress', text: 'Dress' },
            { value: 'chronograph', text: 'Chronograph' },
            { value: 'tourbillon', text: 'Tourbillon' },
            { value: 'black tie', text: 'Black Tie' },
            { value: 'sport', text: 'Sport' },
            { value: 'smart', text: 'Smart' },
            { value: 'apple', text: 'Apple' },
            { value: 'casual', text: 'Casual' },
            { value: 'orienteering', text: 'Orienteering' }
          ]
          break
        case 'favorites':
          this.selectCategoryOption('all')
          this.categoryOptions = [
            { value: 'all', text: 'All Favorites' }
            // { value: 'inCollection', text: 'Favorites in Collection'},
            // { value: 'notInCollection', text: 'Favorites not in Collection'},
            // { value: 'pastFavorites', text: 'Previous Favorites'},
          ]
          break
        case 'previous':
        //   this.searchTermToFilterBy = null
          this.selectCategoryOption('all')
          this.categoryOptions = [
            { value: 'all', text: 'All Previous' }
          ]
          break
        default:
          this.sortCategory = null
          this.categoryOption = null
          this.categoryOptions = [{ value: null, text: 'Select Options', disabled: true }]
      }
    },

    selectCategoryOption (eventLabel) {
      this.categoryOption = eventLabel
      this.filterCollection(this.sortCategory, this.categoryOption)
    },

    filterCollection (sortCategory, categoryOption) {
      let filterObj = {
        category: sortCategory,
        option: categoryOption
      }
    //   this.$store.dispatch('isTryingShuffleWhileManage', false) 
      this.$store.dispatch('getFilteredCollection', filterObj)
        if (sortCategory != 'previous') {
          this.$store.dispatch('viewingPreviousWatches', false)
      }

      // Analytics
      this.$ga.event({
        eventCategory: 'Manage_Collection',
        eventAction: 'Search_By_Filters',
        eventLabel: "Searching by filters: " + sortCategory + ' - ' + categoryOption
      })
    },

    filterBySearchTerm (eventLabel) {
    if (eventLabel) {
        // this.$store.dispatch('isTryingShuffleWhileManage', false) 
        this.$store.dispatch('getFilteredCollectionBySearchTerm', eventLabel.toLowerCase())
      }
      else {
        this.$store.dispatch('viewingPreviousWatches', false)
        this.sortCategory = null
        this.categoryOption = null
        this.$store.dispatch('getFilteredCollectionBySearchTerm', '')          
      }

      // Analytics
      this.$ga.event({
        eventCategory: 'Manage_Collection',
        eventAction: 'Search_By_Term',
        eventLabel: "Searching by term: " + eventLabel
      })
    },

    selectRandomWatch () {
      this.$emit('selectRandomWatch')
    },

    addNewWatch () {
      this.$emit('addNewWatch')
      this.isAddingWatch = true
      this.isEditingExistingWatch = false
    },

    resetCollectionFilter () {
      this.selectSortCategory()
      this.$store.dispatch('viewingPreviousWatches', false)
      this.$store.state.FilteredCollection = this.$store.state.Collection
    }
  },

  computed: {
    isManagingCollection: {
      get () {
        return this.$store.state.isManagingCollection
      },
      set (value) {
        this.$store.dispatch('toggleIsManagingCollection')
      }
    },

    isShowFlags: {
      get () {
        return this.$store.state.isShowFlags
      },
      set (value) {
        this.$store.dispatch('toggleIsShowFlags')
      }
    },

    isShowEditFlags: {
      get () {
        return this.$store.state.isShowEditFlags
      },
      set (value) {
        this.$store.dispatch('toggleIsShowEditFlags', value)
      }
    },

    isDragToOrganize: {
      get () {
        return this.$store.state.isDragToOrganize
      },
      set (value) {
        this.$store.dispatch('toggleIsDragToOrganize', value)
      }
    },

    currentCardSize () {
      return this.$store.state.CurrentCardSize
    },

    // isTryingShuffle() {
    //     return this.$store.state.isShuffleWhileManage
    // }
  }

}
</script>
<style scoped>
.custom-select {
    background-image: none;
}
    .filterText {
        font-size: 16px;
    }

    .btnFontSize {
        font-size: 1rem;
    }
    

    .btn {
        height: 2.34rem;
    }

    .toggleBtn {
        border: none !important;
        border-color: none !important;
        outline: none !important;
        width: auto;
    }


    .btn:focus {
        outline: none;
        border:none;
    }

    @media(max-width: 900px) {
        .btnFontSize {
        font-size: .85rem;
        }
    }

    @media(max-width: 750px) {
        #mobileRow {
            width: 100% !important;
        }
    
        .randomFont {
            font-size: .75rem;
        }
    }

    @media(max-width: 400px) {
        .btnFontSize {
            font-size: .75rem;
        }

        .tiny {
            height: auto
        }


    }

     @media(max-width: 350px) {
        .btnFontSize {
        font-size: .635rem;
        }
    }
</style>
