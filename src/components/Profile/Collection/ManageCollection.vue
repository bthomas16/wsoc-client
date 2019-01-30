<template>
    <b-container fluid>
        <b-row class="w-100" no-gutters>
            <b-col>

                <!-- Button to manage collection Collection -->
                <b-row class="mb-2 mb-md-2 relative" no-gutters align-h="center">
                    <b-col cols="12" md="10" class="border-bottom"></b-col>
                    <b-col cols="12" md="10" class="px-1 px-md-0">
                        <b-row no-gutters align-h="between" align-v="center">
                            <b-col cols="12">
                                <strong v-if="isTryingShuffle" class="red" >*Can't organize while Managing Collection</strong>
                            </b-col>
                            <b-col cols="12" md="6" class="left-align pointer gray bold h4 m-h2 my-1" v-if="isManagingCollection" >
                                <b-btn variant="outline-success" class="green" @click="toggleIsManagingCollection">Done</b-btn>
                                <b-btn v-if="sortCategory || searchTermToFilterBy" variant="outline-secondary" class="ml-2" @click="resetCollectionFilter">Reset Filters</b-btn>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>

            <!-- FILTER & SORT WATCH ARRAY -->
                <b-row ref="sortFilterId" class="px-0 px-md-2" align-v="start" align-h="center" v-if="isManagingCollection" no-gutters>
                    <b-col cols="4" md="5"  class="manage-btn-border px-1 px-md-2" >
                        <b-row align-v="start" align-h="center" id="watch-controls" no-gutters class="px-md-2">
                            <b-col lg="6" cols="12" class="mx-auto center px-md-2 p-0" >
                                <b-button id="manageButton" variant="default" class="bg-light-blue white randomWatch center " block size="" @click="selectRandomWatch">Random Watch</b-button>
                            </b-col>
                            <b-col lg="6" cols="12" class="mt-2 mt-lg-0 px-md-2 p-0">
                                <b-button class=" bg-green white addWatchClass" id="addWatchButton" variant="default" @click="addNewWatch" size="" block>Add Watch</b-button>
                            </b-col>
                        </b-row>
                        <b-row align-h="between" align-v="center" class="d-none d-lg-flex mt-2" no-gutters>
                            <b-col cols="4" md="6" class="mt-1 mt-md-0 pl-3 pr-2">
                                <b-btn size="sm" v-if="!isShowEditFlags" @click="isShowEditFlags = !isShowEditFlags" variant="secondary" class="w-100 h8 white p-1">Show Flags</b-btn>
                                <b-btn size="sm" v-else @click="isShowEditFlags = !isShowEditFlags" variant="secondary" class="bg-navy w-100 h8 p-1">Hide Flags</b-btn>
                            </b-col>
                            <b-col cols="8" md="6">
                                <b-btn-group class="mt-1 mt-md-0 right mr-3">
                                    <b-btn :class="currentCardSize == 'sm' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('sm')">sm</b-btn>
                                    <b-btn :class="currentCardSize == 'md' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('md')">md</b-btn>
                                    <b-btn :class="currentCardSize == 'lg' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('lg')">lg</b-btn>
                                </b-btn-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="8" md="7">
                        <b-row no-gutters>
                            <b-col cols="12" class="mx-auto selectWrapper">
                                <b-input-group prepend="&#9906;" class="px-1" size="">
                                    <b-form-input class="filterText" id="searchInput" type="text" placeholder="Search" size="" @input="filterBySearchTerm" v-model="searchTermToFilterBy"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row align-v="start" align-h="start" no-gutters class="mt-2">
                            <b-col cols="5" class="mx-auto px-1">
                                <b-form-select class="filterText p-1" :options="sortCategories" v-model="sortCategory" @change="selectSortCategory"></b-form-select>
                            </b-col>
                            <b-col cols="7" class="mx-auto px-1">
                                <b-form-select class="filterText p-1" :options="categoryOptions" v-model="categoryOption" @change="selectCategoryOption" :disabled="!sortCategory"></b-form-select>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>

                <!-- Buttons for is Managing collection -->
                <b-row align-v="center" align-h="between" class="d-lg-none mt-2" v-if="isManagingCollection" no-gutters>
                    <b-col cols="4" md="5" class="px-1">
                        <b-btn size="sm" v-if="!isShowEditFlags" @click="isShowEditFlags = !isShowEditFlags" variant="secondary" class="w-100 h8 white p-1">Show Flags</b-btn>
                        <b-btn size="sm" v-else @click="isShowEditFlags = !isShowEditFlags" variant="secondary" class="tiny bg-navy w-100 p-2">Hide Flags</b-btn>
                    </b-col>
                    <b-col cols="8" md="7" class="nowrap">
                       <b-btn-group class="right mr-1">
                            <b-btn :class="currentCardSize == 'sm' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('sm')">sm</b-btn>
                            <b-btn :class="currentCardSize == 'md' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('md')">md</b-btn>
                            <b-btn :class="currentCardSize == 'lg' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('lg')">lg</b-btn>
                        </b-btn-group>
                    </b-col>
                </b-row>

                <!-- Buttons for not managing collection -->
                <b-row v-if="!isManagingCollection" no-gutters>
                    <b-col class="mx-auto px-2 px-md-0" cols="12" md="10" lg="8"    >
                        <b-btn variant="default" class="white my-0 bg-light-blue" size="sm" @click="toggleIsManagingCollection" block>Manage Collection</b-btn>
                        <b-row no-gutters align-v="center" align-h="between" id="mobileRow" class="mx-auto mt-md-2 flagWidth" v-if="!isManagingCollection">
                            <b-col cols="7"> 
                                <b-row no-gutters align-h="between">
                                    <b-col cols="6" class="mt-1 mt-md-0 pr-2">
                                        <b-btn size="sm" v-if="!isShowFlags" @click="isShowFlags = !isShowFlags" variant="secondary" class="w-100 h8 white p-1">Show Flags</b-btn>
                                        <b-btn size="sm" v-else @click="isShowFlags = !isShowFlags" variant="secondary" class="bg-navy w-100 h8 p-1">Hide Flags</b-btn>
                                    </b-col>
                                    <b-col cols="6" class="mt-1 mt-md-0">
                                        <b-btn size="sm" v-if="isDragToOrganize" @click="isDragToOrganize = !isDragToOrganize" variant="secondary" class="bg-navy white p-1 h8 w-100" >Disable Drag</b-btn>
                                        <b-btn size="sm" v-else @click="isDragToOrganize = !isDragToOrganize" variant="secondary" class="p-1 h8 w-100">Enable Drag</b-btn>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col cols="5" class="nowrap">
                                <b-btn-group class="mt-1 mt-md-0 right">
                                    <b-btn :class="currentCardSize == 'sm' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('sm')">sm</b-btn>
                                    <b-btn :class="currentCardSize == 'md' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('md')">md</b-btn>
                                    <b-btn :class="currentCardSize == 'lg' ? 'btn bg-navy white border' : 'btn bg-darkgray'" variant="secondary" class="px-md-3 right px-2 toggleBtn m-0" size="sm" @click="sizeCardToUse('lg')">lg</b-btn>
                                </b-btn-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
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
    },

    toggleIsManagingCollection () {
      this.resetCollectionFilter()
      this.$store.dispatch('toggleIsManagingCollection')
      this.$store.dispatch('toggleIsDragToOrganize', false)
    },

    selectSortCategory (eventValue) {
      this.searchTermToFilterBy = ''
      this.sortCategory = eventValue
      this.categoryOption = null

      switch (eventValue) {
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

    selectCategoryOption (eventValue) {
      this.categoryOption = eventValue
      this.filterCollection(this.sortCategory, this.categoryOption)
    },

    filterCollection (sortCategory, categoryOption) {
      let filterObj = {
        category: sortCategory,
        option: categoryOption
      }
      this.$store.dispatch('isTryingShuffleWhileManage', false) 
      this.$store.dispatch('getFilteredCollection', filterObj)
        if (sortCategory != 'previous') {
          this.$store.dispatch('viewingPreviousWatches', false)
      }
    },

    filterBySearchTerm (eventValue) {
    if (eventValue) {
        this.$store.dispatch('isTryingShuffleWhileManage', false) 
        this.$store.dispatch('getFilteredCollectionBySearchTerm', eventValue.toLowerCase())
      }
      else {
        this.$store.dispatch('viewingPreviousWatches', false)
        this.sortCategory = null
        this.categoryOption = null
        this.$store.dispatch('getFilteredCollectionBySearchTerm', '')          
      }
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
      this.$store.state.FilteredCollection = this.$store.state.Collection //TODO: NOT THIS
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
          console.log(value)
        this.$store.dispatch('toggleIsDragToOrganize', value)
      }
    },

    currentCardSize () {
      return this.$store.state.CurrentCardSize
    },

    isTryingShuffle() {
        return this.$store.state.isShuffleWhileManage
    }
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

    .randomWatch, .addWatchClass {
        font-size: 1rem;
    }
    

    .btn {
        height: 2.34rem;
    }

    .toggleBtn {
        border: none !important;
        border-color: none !important;
        outline: none !important;
    }


    .btn:focus {
        outline: none;
        border:none;
    }

    @media(max-width: 900px) {
        .randomWatch, .addWatchClass {
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
        .randomWatch, .addWatchClass {
            font-size: .75rem;
        }

        .tiny {
            height: auto
        }


    }

     @media(max-width: 350px) {
        .randomWatch, .addWatchClass {
        font-size: .635rem;
        }
    }


</style>
