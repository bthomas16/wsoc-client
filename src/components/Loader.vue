<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col no-gutters cols="4" md="2" class="mx-auto mt-4">
                <b-img fluid :src=" env + '/api/static-assets/loading-spinner.gif'"></b-img>
            </b-col>
        </b-row>
        <b-row no-guttes>
            <b-col cols="8" class="mt-2 mx-auto center">Loading...</b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'loadingSpinner',
  data: function () {
    return {
      env: process.env.VUE_APP_ROOT_API
    }
  }
}
</script>

<style scoped>
.container-fluid {
    min-height: 100vh;
}

</style>
