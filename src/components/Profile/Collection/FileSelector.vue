<template>
    <b-container>
        <b-row>
            <b-col cols="4" md="2" class="left bg-white p-0 mt-1 mt-sm-2 mt-md-4 mt-lg-0 border box-shadow imgTile" v-if="isPreviewBox">
                <label class="file-select">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button pointer bg-white">
                    <!-- Display the filename if a file has been selected. -->
                        <b-img class="" :src="ROOT_API + '/api/static-assets/add-img-icon.png'" fluid></b-img>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input type="file" @change="uploadImagesToBase64" accept="image/*" multiple/>
                </label>
            </b-col>
           <b-col cols="8" md="6" class="mx-auto center h5" v-else>
                <label class="file-select">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button pointer bg-light-blue">
                    <!-- Display the filename if a file has been selected. -->
                    <span>Select Images</span>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input type="file" @change="uploadImagesToBase64" accept="image/*" multiple/>
                </label>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'fileSelector',
  props: {
    value: File,
    isPreviewBox: Boolean
  },
  data: function () {
    return {
      ROOT_API: process.env.VUE_APP_ROOT_API,
      isS3Uploading: false,
      imgBase64Array: []
    }
  },

  methods: {
        async uploadImagesToBase64 (e) {
            const vm = this
            const poop = []

            let files = e.target.files

            for (let j = 0; j < files.length; j++) {
                await vm.getBase64Url(files[j]).then(b64Url => {

                    vm.imgBase64Array.push(b64Url)

                    if (vm.imgBase64Array.length == files.length) {
                        vm.$emit('setImagesOnAddWatch', vm.imgBase64Array)
                        // vm.$refs.fileUpload.value = ''
                        vm.imgBase64Array = []    
                    }
                })
            }
        },


        getBase64Url (file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }
    },



    // FR.onload = function(e) {
                    //     let result = e.target.result
                    //     let imgBase64Url = e.target.result
                    //     vm.imgBase64Array.push(
                    //         { imgBase64Url,
                    //           order: index,
                    //           fileName: files[index].name
                    //         })
                    //     if (vm.imgBase64Array.length == files.length) {
                    //         vm.$emit('setImagesOnAddWatch', vm.imgBase64Array)
                    //     }
                    // }
            

    

}
</script>

<style scoped>
       label {
           margin: 0;
       }                 /* <b-col cols="5" md="3"  v-if="!addWatch.src.images.length"> */

    .file-select > .select-button {
        padding: 1rem;

        color: white;

        border-radius: .3rem;

        text-align: center;
        font-weight: bold;
    }

    /* Don't forget to hide the original file input! */
    .file-select > input[type="file"] {
        display: none;
    }
</style>
