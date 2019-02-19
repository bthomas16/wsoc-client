<template>
    <b-container fluid>
         <b-row v-if="!errorObj.isSuccess" class="mb-1">
            <b-col>
                <b-alert show variant="danger" class="py-1">{{errorObj.message}}</b-alert>
            </b-col>
        </b-row>
        <b-row no-gutters align-h="center">
            <b-col cols="8" class="center mb-3 imgSelect">
                <b-img id="profileImgEditModal" class="box-shadow-light mb-2 center ml-0" fluid  thumbnail :src="userProfileEditing.imgSrc || '/img/icons/blankprofpic.png'"></b-img>
                <label class="file-select w-100 mw-100">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="bg-navy  white pointer py-2 mt-2 bg box-shadow-light">
                    <!-- Display the filename if a file has been selected. -->
                    <span>Select Image</span>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input class="my-2 left-align w-100 center mx-auto d-none" accept="image/*" capture value="Upload Photo" type="file" @change="uploadProfileImageToAwsS3()"/>
                </label>
            </b-col>
            <b-col cols="12">
                <b-form @submit.prevent="submitEditProfile">
                <b-row no-gutters>
                    <b-col cols="6">
                        <b-input required class="no-border border-bottom-only" type="text" v-model="userProfileEditing.firstName" />
                        <p class="h8">First Name</p>
                    </b-col>
                    <b-col cols="6">
                        <b-input class="no-border border-bottom-only" type="text" v-model="userProfileEditing.lastName" />
                        <p class="h8">Last Name</p>
                    </b-col>
                    <b-col cols="12">
                        <b-input @change="ValidateEmailAddress" required class="no-border border-bottom-only" type="email" v-model="userProfileEditing.email" />
                        <p class="h8" v-if="isUniqueEmail">Email Address</p>
                        <p class="h8 red" v-else>*Email Address is not available</p>
                    </b-col>
                </b-row>
                <b-row no-gutters align-h="between">
                    <b-col cols="12">
                        <b-input class="no-border border-bottom-only" type="password" v-model="userProfileEditing.oldPassword" />
                        <p class="h8">Old Password</p>
                    </b-col>
                    <b-col cols="6">
                        <b-input class="no-border border-bottom-only" type="password" v-model="userProfileEditing.newPassword" />
                        <p class="h8">New Password</p>
                    </b-col>
                    <b-col cols="6">
                        <b-input class="no-border border-bottom-only" type="password" v-model="userProfileEditing.confirmNewPassword" />
                        <p class="h8">Confirm Password</p>
                    </b-col>
                </b-row>
            </b-form>
        </b-col>
    </b-row>
    </b-container>
</template>

<script>

export default {
  name: 'editProfileModal',
  props: ['userProfileEditing', 'errorObj', 'isUniqueEmail'],

  data () {
    return {
      newPassword: '',
      ROOT_API: process.env.VUE_APP_ROOT_API,
    }
  },
  methods: {
    uploadProfileImageToAwsS3 (e) {
      let files = event.target.files[0]
      this.$store.dispatch('uploadProfileImageToAwsS3', files).then((data) => {
        this.userProfileEditing.imgSrc = data.Location
      })
    },

    ValidateEmailAddress (email) {
        this.$emit('IsEmailUniqueVal', email)
    }
  },

  computed: {
    User () {
      return this.$store.state.User
    }
  }

}
</script>

<style scoped>
    /* .imgSelect > input[type="file"] {
        display: none !important;
    } */

    .border-bottom-only {
        border-bottom: 1px solid gray !important;
        border-radius: 0;
        width: 95%;
    }

    #profileImgEditModal {
        min-height: 150px;
        height: auto;
        max-height: 275px;
    }
</style>
