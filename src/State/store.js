import Vue from 'vue'
import Vuex from 'vuex'
import UtilityMethod from './StoreUtilityMethods.js'

Vue.use(Vuex)

const headers = {
  'Content-Type': 'application/json',
  'authorization': localStorage.getItem('watchJwt')
}

const fileHeaders = {
  'Content-Type': 'multipart/form-data',
  'authorization': localStorage.getItem('watchJwt')
}

const axios = require('axios')
// END IMPORTS

const LOADING = 'LOADING'

const NOT_LOADING = 'NOT_LOADING'

// const AUTHENTICATING = 'AUTHENTICATING'

const AUTH_SUCCESS = 'AUTH_SUCCESS'

const AUTH_FAILURE = 'AUTH_FAILURE'

const LOGOUT = 'LOGOUT'

const GET_USER = 'GET_USER'

const VALIDATE_JWT = 'VALIDATE_JWT'

const INVALIDATE_JWT = 'INVALIDATE_JWT'

const NAME_COLLECTION = 'NAME_COLLECTION'

const SET_COLLECTION = 'SET_COLLECTION'

const SET_FILTERED_COLLECTION = 'SET_FILTERED_COLLECTION'

const SUBMIT_NEW_WATCH = 'SUBMIT_NEW_WATCH'

const SELECT_WATCH = 'SELECT_WATCH'

const WATCH_ORDER_UPDATED = 'WATCH_ORDER_UPDATED'

const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

const SET_NUMBER_FSOT = 'SET_NUMBER_FSOT'

const FAVORITES_COLLECTION = 'FAVORITES_COLLECTION'

const CARD_SIZE_TO_USE = 'CARD_SIZE_TO_USE'

const TOGGLE_IS_MANAGING_COLLECTION = 'TOGGLE_IS_MANAGING_COLLECTION'

const TOGGLE_IS_SHOW_FLAGS = 'TOGGLE_IS_SHOW_FLAGS'

const TOGGLE_IS_SHOW_EDIT_FLAGS = 'TOGGLE_IS_SHOW_EDIT_FLAGS'

const TOGGLE_IS_DRAG_TO_ORGANIZE = 'TOGGLE_IS_DRAG_TO_ORGANIZE'

const SERVER_VALIDATION_ERROR = 'SERVER_VALIDATION_ERROR'

const FILTERING = 'FILTERING'
// loading spinner hook/boolean for SortFilter api

const VIEWING_PREVIOUS_WATCHES = 'VIEWING_PREVIOUS_WATCHES'

const SUBMIT_EDIT_WATCH = 'SUBMIT_EDIT_WATCH'

const WELCOME_EMAIL = 'WELCOME_EMAIL'

const CONTACT_EMAIL = 'CONTACT_EMAIL'

const FORGOT_PASSWORD_EMAIL = 'FORGOT_PASSWORD_EMAIL'

const SET_COOKIE_WOTD = 'SET_COOKIE_WOTD'

const IS_SHUFFLE_WHILE_MANAGE = 'IS_SHUFFLE_WHILE_MANAGE'

const SET_CROPPIE_WATCH_ORDER = 'SET_CROPPIE_WATCH_ORDER'

const DETERMINE_IMAGE_CAN_BE_EDITED = 'DETERMINE_IMAGE_CAN_BE_EDITED'

const REMOVE_WATCH_FROM_COLLECTION = 'REMOVE_WATCH_FROM_COLLECTION'

const TOGGLE_IS_MODAL_POPPED = 'TOGGLE_IS_MODAL_POPPED'


const state =
{
  DelayPrompt: null,
  isLoading: false,
  isAuthorized: false,
  User: {},
  Collection: [],
  FilteredCollection: [],
  CurrentCardSize: 'md',
  MobileCardSizeToUse: 4,
  DesktopCardSizeToUse: 4,
  Favorites: [],
  NumberFSOT: 0, // array of watch id's
  isManagingCollection: false,
  isFilteringCollection: false,
  isViewingPreviousWatches: false,
  isShowFlags: true,
  isShowEditFlags: true,
  isDragToOrganize: false,
  isUserLoaded: false,
  isCollectionLoaded: false,
  selectedWatch: {},
  isServerValidationError: false,
  serverValidationError: null,
  cookieValueWOTD: 0,
  isShuffleWhileManage: false,
  croppieWatchOrder: 0,
  isImageEditable: false,
  isModalPopped: false // check for any modals showing on the page
}

const mutations =
{
  [LOADING] (state) {
    // console.log('loading is true')
    state.isLoading = true
  },

  [NOT_LOADING] (state) {
    // console.log('loading is false')
    state.isLoading = false
  },

  [AUTH_SUCCESS] (state, user) {
    state.User = user
    state.isAuthorized = true
    state.isUserLoaded = true
  },

  [AUTH_FAILURE] (state) {
    state.isAuthorized = false
    state.isLoading = false
  },

  [LOGOUT] (state) {
    state.isAuthorized = false
  },

  [VALIDATE_JWT] (state) {
    state.isAuthorized = true
  },

  [INVALIDATE_JWT] (state) {
    console.log('this is weird')
    state.isAuthorized = false
  },

  [SUBMIT_NEW_WATCH] (state, watch) {
    state.isCollectionLoaded = true
    state.Collection.push(watch)
  },

  [SUBMIT_EDIT_WATCH] (state, watch) {
    let watchToUpdate = state.Collection.find(w => w.id == watch.id)
    watchToUpdate = watch
  },

  [SET_COLLECTION] (state, collection) {
    state.isCollectionLoaded = true
    if (collection) { state.Collection = collection }
  },

  [SET_FILTERED_COLLECTION] (state, collection) {
    state.isCollectionLoaded = true
    if (collection) { state.FilteredCollection = collection }
  },

  [SELECT_WATCH] (state, watch) {
    state.selectedWatch = watch
  },

  [WATCH_ORDER_UPDATED] (state, reorderedCollection) {
    state.Collection = reorderedCollection
  },

  [FAVORITES_COLLECTION] (state, favorites) {
    if (favorites[0]) {
      let mappedFavorites = favorites.map(watch => {
        if (watch.isCurrentFavorite == true) return watch
      })
      state.Favorites = mappedFavorites
    }
  },

  [SET_NUMBER_FSOT] (state, numberFSOT) {
    state.NumberFSOT = numberFSOT
  },

  [CARD_SIZE_TO_USE] (state, size) {
    switch (size) {
      case 'sm':
        state.CurrentCardSize = size
        state.MobileCardSizeToUse = 3
        state.DesktopCardSizeToUse = 3
        break
      case 'md':
        state.CurrentCardSize = size
        state.MobileCardSizeToUse = 4
        state.DesktopCardSizeToUse = 4
        break
      case 'lg':
        state.CurrentCardSize = size
        state.MobileCardSizeToUse = 6
        state.DesktopCardSizeToUse = 6
        break
      default:
        state.CurrentCardSize = 'sm'
        state.MobileCardSizeToUse = 3
        state.DesktopCardSizeToUse = 3
    }
  },

  [TOGGLE_FAVORITE] (state, favorites) {
    state.Favorites = favorites
  },

  [TOGGLE_IS_MANAGING_COLLECTION] (state) {
    state.isManagingCollection = !state.isManagingCollection
    if (state.isManagingCollection) {
      state.FilteredCollection = state.Collection
    }
  },

  [TOGGLE_IS_SHOW_FLAGS] (state) {
    state.isShowFlags = !state.isShowFlags
  },

  [TOGGLE_IS_SHOW_EDIT_FLAGS] (state, value) {
    state.isShowEditFlags = value
  },

  [TOGGLE_IS_DRAG_TO_ORGANIZE] (state, value) {
    state.isDragToOrganize = value
  },

  [FILTERING] (state, value) {
    state.isFilteringCollection = value
  },

  [SERVER_VALIDATION_ERROR] (state, err) {
    switch (err) {
      case 'jsonwebtoken':
        state.isServerValidationError = true
        state.serverValidationError = 'Your session has expired. Please login and try again.'
        break
      default:
        state.isServerValidationError = true
        state.serverValidationError = 'Your session has expired. Please login and try again.'
    }
  },

  [VIEWING_PREVIOUS_WATCHES] (state, value) {
    state.isViewingPreviousWatches = value
  },

  [SET_COOKIE_WOTD] (state, wotdIndex) {
    state.cookieValueWOTD = wotdIndex
  },

  [IS_SHUFFLE_WHILE_MANAGE] (state, value) {
    state.isShuffleWhileManage = value
  },

  [SET_CROPPIE_WATCH_ORDER] (state, value) {
    state.croppieWatchOrder = value
  },

  [DETERMINE_IMAGE_CAN_BE_EDITED] (state, value) {
    state.isImageEditable = value
  },

  [REMOVE_WATCH_FROM_COLLECTION] (state, idToRemove) {
    state.Collection = state.Collection.filter(watch => {
      return watch.id !== idToRemove
    })

    state.FilteredCollection = state.FilteredCollection.filter(watch => {
      return watch.id !== idToRemove
    })
  },

  [TOGGLE_IS_MODAL_POPPED] (state, value) {
    state.isModalPopped = value
  }
}

const actions =
{
  login (context, formData) {
    context.commit(LOADING)
    return axios.post('/api/user/login', formData)
      .then(res => {
        if (!res.data.isSuccess) {
          context.commit(NOT_LOADING)
          context.commit(AUTH_FAILURE)
          return res.data
        }
        localStorage.setItem('watchJwt', res.data.token)
        context.commit(AUTH_SUCCESS, res.data.user)
        context.commit(NOT_LOADING)
        return res.data
      }).catch(err => {
        console.log(err.data, 'ok srsly fuck with me')
        context.commit(NOT_LOADING)
        context.commit(AUTH_FAILURE)
        return err.data
      })
  },

  register (context, formData) {
    context.commit(LOADING)
    return axios({
      method: 'POST',
      url: '/api/user/register',
      data: formData
    })
      .then(res => {
        localStorage.setItem('watchJwt', res.data.token)
        context.commit(AUTH_SUCCESS, res.data.user)
        context.commit(NOT_LOADING)
        return res.data
      })
      .catch(err => {
        this.responseStyle = 'danger'
        this.responseMessage = err.data.message
        this.form = {}
        context.commit(AUTH_FAILURE)
        context.commit(NOT_LOADING)
        return err.data
      })
  },

  fbookAuth (context, data) {
    context.commit(LOADING)
    return axios({
      method: 'POST',
      url: '/api/user/fbook-auth',
      data
    }).then(res => {
      if (res.data.isSuccess) {
        // login
        localStorage.setItem('watchJwt', res.data.token)
        context.commit(AUTH_SUCCESS, res.data.user)     
        window.location.href = "/profile"
        
      }
      else {
        // Failed to login
        context.commit(NOT_LOADING)
        
      }
    }).catch(err => {
      // err
      context.commit(NOT_LOADING)
      
    })
  },

  validateEmailAddressUnique (context, emailAddress) 
  {
    return axios({
      method: 'GET',
      url: '/api/user/validate-email',
      params: { email: emailAddress },
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    }).then(res => {
      console.log(res.data.isSuccess, 'rrooze')
      return res.data.isSuccess
    }).catch(err => {
      console.log(err)
  })
},  

  user (context) {
    context.commit(LOADING)
    axios({
      method: 'GET',
      url: '/api/user/profile',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    }).then(res => {
      context.commit(AUTH_SUCCESS, res.data.user)
      context.commit(NOT_LOADING)
    }).catch(err => {
      console.log(err)
      context.commit(NOT_LOADING)
      context.commit(INVALIDATE_JWT)
      context.commit(SERVER_VALIDATION_ERROR)

      // this.$ga.event({
      //   eventCategory: 'ERROR',
      //   eventAction: 'GET_User()_Server_Validation_Error',
      //   eventLabel: '[store] Error on GET User'
      // })
    })
  },

  logout (context) {
    context.commit(LOADING)
    localStorage.removeItem('watchJwt')
    context.commit(LOGOUT)
    context.commit(NOT_LOADING)
  },

  validateJwt (context) {
    context.commit(LOADING)
    return axios({
      method: 'GET',
      url: '/api/user/validate-jwt/',
      params: {
        jwt: localStorage.getItem('watchJwt')
      }
    }).then(res => {
      if (res.data.isSuccess) {
        context.commit(VALIDATE_JWT)
        context.commit(NOT_LOADING)
        return res
      } else {
        // context.commit(INVALIDATE_JWT)
        context.commit(NOT_LOADING)
        return res
      }
    }
    ).catch(err => {
      context.commit(NOT_LOADING)
      return err
    })
  },

  loadUserCollection (context) {
    context.commit(LOADING)
    context.commit(FILTERING, false)
    axios({
      method: 'GET',
      url: '/api/watch',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    })
      .then(res => {
        let collection = res.data.collection
        context.commit(SET_COLLECTION, collection)
        context.commit(FILTERING, false)
        context.commit(NOT_LOADING)
        UtilityMethod.CheckAndSetCookie(state.Collection.length)
      }).catch(err => {
        context.commit(NOT_LOADING)
        context.commit(FILTERING, false)
        // context.commit(INVALIDATE_JWT)
        context.commit(SET_COLLECTION)
        // context.commit(SERVER_VALIDATION_ERROR)
        return err
      })
  },

  submitNewWatch (context, watch) {
    context.commit(LOADING)
    axios({
      method: 'POST',
      url: '/api/watch',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      },
      data: watch
    })
      .then((res) => {
        context.commit(SUBMIT_NEW_WATCH, res.data.watch)
        context.commit(NOT_LOADING)
        return res.data.watch.id
      }).catch((err) => {
        context.commit(NOT_LOADING)
        context.commit(INVALIDATE_JWT)
        context.commit(SERVER_VALIDATION_ERROR)

        // this.$ga.event({
        //   eventCategory: 'ERROR',
        //   eventAction: 'POST_submitNewWatch()_Server_Validation_Error',
        //   eventLabel: '[store] Error on POST submitNewWatch()'
        // })
        return err
      })
  },

  submitEditWatch (context, watch) {
    context.commit(LOADING)
    axios({
      method: 'PUT',
      url: '/api/watch/',
      params: {
        id: watch.id
      },
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      },
      data: watch
    })
      .then((res) => {
        context.commit(SUBMIT_EDIT_WATCH, res.data.watch)
        context.commit(NOT_LOADING)
        return true
      }).catch((err) => {
        context.commit(NOT_LOADING)
        context.commit(INVALIDATE_JWT)
        context.commit(SERVER_VALIDATION_ERROR)

        // Analytics
        // this.$ga.event({
        //   eventCategory: 'ERROR',
        //   eventAction: 'PUT_submitEditWatch()_Server_Validation_Error',
        //   eventLabel: '[store] Error on PUT submitEditWatch()'
        // })
        return err
      })
  },

  removeExistingWatch (context, id) {
    axios({
      method: 'PUT',
      url: '/api/watch/remove/',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      },
      params: {
        id: id
      }
    })
      .then((res) => {
        context.commit(NOT_LOADING)
        context.commit(REMOVE_WATCH_FROM_COLLECTION, res.data.id)
      }).catch((err) => {
        console.log('err :', err)
        context.commit(NOT_LOADING)
        context.commit(INVALIDATE_JWT)
        context.commit(SERVER_VALIDATION_ERROR)

        // Analytics
        // this.$ga.event({
        //   eventCategory: 'ERROR',
        //   eventAction: 'PUT_removeExistingWatch()_Server_Validation_Error',
        //   eventLabel: '[store] Error on PUT removeExistingWatch()'
        // })
        return err
      })
  },

  createRemoveWatch (context, watchDetails) {
    context.commit(LOADING)
    axios({
      method: 'POST',
      url: '/api/watch/remove',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      },
      data: watchDetails
    })
      .then((res) => {
        context.commit(NOT_LOADING)
      }).catch((err) => {
        context.commit(NOT_LOADING)
        context.commit(INVALIDATE_JWT)
        context.commit(SERVER_VALIDATION_ERROR)


        // Analytics
        // this.$ga.event({
        //   eventCategory: 'ERROR',
        //   eventAction: 'POST_createRemoveWatch()_Server_Validation_Error',
        //   eventLabel: '[store] Error on POST createRemoveWatch()'
        // })
        return err
      })
  },

  selectWatch (context, watch) {
    context.commit('SELECT_WATCH', watch)
    return true
  },

  updateCollectionOrder (context, newCollectionOrder) {
    // NO LOADING NEEDING
    axios({
      method: 'PUT',
      url: '/api/watch/update-order',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      },
      data: newCollectionOrder
    }).then(res => {
      context.commit(SET_COLLECTION, res.data.collection)
    }).catch(err => {
      context.commit(INVALIDATE_JWT)
      context.commit(SERVER_VALIDATION_ERROR)

      // Analytics
      // this.$ga.event({
      //   eventCategory: 'ERROR',
      //   eventAction: 'PUT_updateCollectionOrder()_Server_Validation_Error',
      //   eventLabel: '[store] Error on PUT updateCollectionOrder()'
      // })
      return err
    })
  },

  getFavorites (context) {
    // NO LOADING NEEDING
    axios({
      method: 'GET',
      url: '/api/watch/favorite',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    }).then(res => {
      context.commit(FAVORITES_COLLECTION, res.data.favorites)
    }).catch(err => {
      context.commit(INVALIDATE_JWT)
      context.commit(SERVER_VALIDATION_ERROR)

      // Analytics
      // this.$ga.event({
      //   eventCategory: 'ERROR',
      //   eventAction: 'GET_getFavorites()_Server_Validation_Error',
      //   eventLabel: '[store] Error on GET getFavorites()'
      // })
      return err
    })
  },

  getNumberFSOT (context) {
    // NO LOADING NEEDING
    axios({
      method: 'GET',
      url: '/api/watch/number-fsot',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    }).then(res => {
      context.commit(SET_NUMBER_FSOT, +res.data.numberFSOT)
    }).catch(err => {
      context.commit(INVALIDATE_JWT)
      context.commit(SERVER_VALIDATION_ERROR)

      // Analytics
      // this.$ga.event({
      //   eventCategory: 'ERROR',
      //   eventAction: 'GET_getNumberFSOT()_Server_Validation_Error',
      //   eventLabel: '[store] Error on GET getNumberFSOT()'
      // })
      return err
    })
  },

  sizeCardToUse (context, size) {
    context.commit(CARD_SIZE_TO_USE, size)
  },

  toggleWatchFavorite (context, watchId) {
    // NO LOADING NEEDING
    axios({
      method: 'POST',
      url: '/api/watch/favorite/',
      params: {
        watchId
      },
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    }).then(res => {
      context.commit(TOGGLE_FAVORITE, res.data.favorites)
    }).catch(err => {
      context.commit(INVALIDATE_JWT)
      context.commit(SERVER_VALIDATION_ERROR)

      // Analytics
      // this.$ga.event({
      //   eventCategory: 'ERROR',
      //   eventAction: 'POST_toggleWatchFavorite()_Server_Validation_Error',
      //   eventLabel: '[store] Error on POST toggleWatchFavorite()'
      // })
      return err
    })
  },

  toggleIsManagingCollection (context) {
    // NO LOADING NEEDING
    context.commit(TOGGLE_IS_MANAGING_COLLECTION)
  },

  toggleIsShowFlags (context) {
    // NO LOADING NEEDING
    context.commit(TOGGLE_IS_SHOW_FLAGS)
  },

  toggleIsShowEditFlags (context, value) {
    // NO LOADING NEEDED
    context.commit(TOGGLE_IS_SHOW_EDIT_FLAGS, value)
  },

  toggleIsDragToOrganize (context, value) {
    // NO LOADING NEEDED
    context.commit(TOGGLE_IS_DRAG_TO_ORGANIZE, value)
  },

  getFilteredCollection (context, filterObj) {
    axios({
      method: 'GET',
      url: `/api/watch/sort-filter/${filterObj.category}/`,
      params: { option: filterObj.option },
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    }).then((res) => {
      let collection = res.data.collection
      // context.commit(SET_COLLECTION, collection)
      context.commit(SET_FILTERED_COLLECTION, collection)
      if (filterObj.category === 'previous') {
        context.commit(VIEWING_PREVIOUS_WATCHES, true)
      }
    }).catch((err) => {
      console.log(err)
      context.commit(INVALIDATE_JWT)
      context.commit(SERVER_VALIDATION_ERROR)

      // Analytics
      // this.$ga.event({
      //   eventCategory: 'ERROR',
      //   eventAction: 'GET_getFilteredCollection()_Server_Validation_Error',
      //   eventLabel: '[store] Error on GET getFilteredCollection()'
      // })
      return err
    })
  },

  getFilteredCollectionBySearchTerm (context, searchTermToFilterByLowerCase) {
    axios({
      method: 'GET',
      url: '/api/watch/sort-filter/search/',
      params: { searchTerm: searchTermToFilterByLowerCase },
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    })
      .then((res) => {
        let collection = res.data.collection
        // context.commit(SET_COLLECTION, collection)
        context.commit(SET_FILTERED_COLLECTION, collection)
        context.commit(NOT_LOADING)
      }).catch((err) => {
        context.commit(NOT_LOADING)
        // context.commit(INVALIDATE_JWT)
        context.commit(SERVER_VALIDATION_ERROR)

        // Analytics
        // this.$ga.event({
        //   eventCategory: 'ERROR',
        //   eventAction: 'GET_getFilteredCollectionBySearchTerm()_Server_Validation_Error',
        //   eventLabel: '[store] Error on GET getFilteredCollectionBySearchTerm()'
        // })
        return err
      })
  },

  uploadImagesToAwsS3 (context, fileArr) {
    context.commit(LOADING)
    return axios({
      method: 'POST',
      url: '/api/upload/watch-images',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      },
      data: fileArr
    })
      .then((res) => {
        context.commit(NOT_LOADING)
        return res.data
      }).catch((err) => {
        context.commit(INVALIDATE_JWT)
        context.commit(SERVER_VALIDATION_ERROR)

        // Analytics
        // this.$ga.event({
        //   eventCategory: 'ERROR',
        //   eventAction: 'POST_uploadImagesToAwsS3()_Server_Validation_Error',
        //   eventLabel: '[store] Error on POST uploadImagesToAwsS3()'
        // })
        return err
      })
  },

  uploadProfileImageToAwsS3 (context, image) {
    let imageFormData = new FormData()
    imageFormData.append('image[' + 0 + ']', image)
    context.commit(LOADING)
    return axios({
      method: 'PUT',
      url: '/api/upload/profile-image',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': localStorage.getItem('watchJwt')
      },
      data: imageFormData
    })
      .then((res) => {
        context.commit(NOT_LOADING)
        return res.data.data
      }).catch((err) => {
        context.commit(NOT_LOADING)
        context.commit(INVALIDATE_JWT)
        context.commit(SERVER_VALIDATION_ERROR)
        return err
      })
  },

  editUserProfile (context, formData) {
    context.commit(LOADING)
    return axios({
      method: 'PUT',
      url: '/api/user/edit',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      },
      data: formData
    })
      .then((res) => {
        context.commit(NOT_LOADING)
        return res.data
      }).catch((err) => {
        context.commit(NOT_LOADING)
        context.commit(INVALIDATE_JWT)
        context.commit(SERVER_VALIDATION_ERROR)

        // Analytics
        // this.$ga.event({
        //   eventCategory: 'ERROR',
        //   eventAction: 'PUT_editUserProfile()_Server_Validation_Error',
        //   eventLabel: '[store] Error on PUT editUserProfile()'
        // })
        return err
      })
  },

  serverValidationError (context, err) {
    context.commit(SERVER_VALIDATION_ERROR, err)
  },

  getWatchInfoById (context, watchInfoId) {
    return axios({
      method: 'GET',
      url: '/api/discover/watch-info',
      params: {
        watchInfoId: watchInfoId
      } }).then(res => {
      return res.data.watchInfo
    }).catch(err => {
      console.log(err)
    })
  },
  // getWatchNewsArticles (context) {
  //   context.commit(LOADING)
  //   return axios({
  //     method: 'GET',
  //     url: '/api/watch-news'
  //   }).then(res => {
  //     context.commit(NOT_LOADING)
  //     return res.data.articles
  //   }).catch(err => {
  //     console.log(err)
  //     context.commit(NOT_LOADING)
  //   })
  // },

  // getWatchNewsArticleById (context, id) {
  //   context.commit(LOADING)
  //   return axios({
  //     method: 'GET',
  //     url: '/api/watch-news/' + id
  //   }).then(res => {
  //     context.commit(NOT_LOADING)
  //     return res.data.article
  //   }).catch(err => {
  //     console.log(err)
  //     context.commit(NOT_LOADING)
  //   })
  // },

  viewingPreviousWatches (context, value) {
    context.commit(VIEWING_PREVIOUS_WATCHES, value)
  },

  getRemovedWatchDetails (context, id) {
    context.commit(LOADING)
    return axios({
      method: 'GET',
      url: '/api/watch/removed',
      params: {
        id: id
      },
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
      }
    }).then(res => {
      context.commit(NOT_LOADING)
      return res.data.collection
    }).catch(err => {
      console.log(err)
      context.commit(NOT_LOADING)
    })
  },

  getWatchShareById (context, watchId) {
    context.commit(LOADING)
    return axios({
      method: 'GET',
      url: '/api/watch-share/by-watchid',
      params: {
        watchId
      }
    }).then(res => {
      context.commit(NOT_LOADING)
      return res.data.watch
    }).catch(err => {
      console.log(err)
      context.commit(NOT_LOADING)
    })
  },

  // EMAILS

  contacUsEmail (context, formData) {
    context.commit(LOADING)
    return axios({
      method: 'POST',
      url: '/api/email/contact',
      data: formData
    }).then(res => {
      context.commit(NOT_LOADING)
      return res.data
    }).catch(err => {
      console.log(err)
      context.commit(NOT_LOADING)
    })
  },

  sendWelcomeEmail (context, formData) {
    context.commit(LOADING)
    return axios({
      method: 'POST',
      url: '/api/email/welcome',
      data: formData
    }).then(res => {
      context.commit(NOT_LOADING)
      return res.data
    }).catch(err => {
      console.log(err)
      context.commit(NOT_LOADING)
    })
  },

  forgotPasswordEmail (context, formData) {
    context.commit(LOADING)
    return axios({
      method: 'POST',
      url: '/api/email/forgot-password',
      data: formData
    }).then(res => {
      context.commit(NOT_LOADING)
      return res.data
    }).catch(err => {
      console.log(err)
      context.commit(NOT_LOADING)
    })
  },

  SetCookieStateWOTD (context, wotdIndex) {
    context.commit(SET_COOKIE_WOTD, wotdIndex)
  },

  isTryingShuffleWhileManage (context, value) {
    context.commit(IS_SHUFFLE_WHILE_MANAGE, value)
  },
  setCroppieWatchOrder (context, value) {
    context.commit(SET_CROPPIE_WATCH_ORDER, value)
  },

  CanImageCanBeEditedByUrl (context, value) {
    context.commit(DETERMINE_IMAGE_CAN_BE_EDITED, value)
  },

  ToggleIsModalPopped (context, value) {
    context.commit(TOGGLE_IS_MODAL_POPPED, value)
  }
}

const getters =
{
  getLoadingStatus (state) {
    return state.isLoading
  },

  getUserLoadStatus (state) {
    return state.isUserLoaded
  },

  getCollectionLoadStatus (state) {
    return state.isCollectionLoaded
  },

  getCollection (state) {
    return state.Collection
  },

  getFavorites (State) {
    return state.Favorites
  },

  getUser (state) {
    return state.User
  }
}

export default new Vuex.Store
({
  state,
  actions,
  mutations,
  getters
})
