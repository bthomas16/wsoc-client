<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="11" md="12" class="resultsContainer">
                <ul class="autocomplete-results p-0 m-0">
                    <li v-for="(result, index) in results" :key="index" class="autocomplete-result border-bottom" 
                    @click="selectAutoCompleteResult(result)"
                    :class="arrowCounter === index ? 'isActive' : ''">
                        {{result}}
                    </li>
                </ul>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>


export default {
    props: ['results', 'fieldToSet', 'arrowCounter'],
    name: 'autocomplete',
    data: () => {
        return {
        }
    },

    methods: {
        selectAutoCompleteResult (result) {
            this.$emit('selectAutoCompleteResult', this.fieldToSet, result)
        },
    }
    
}
</script>

<style scoped>
    .autocomplete-result {
        background-color: white;
        width: 100%;
        font-weight: 700;
    }

    .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.isActive,
  .autocomplete-result:hover {
    background-color: #173f5f;
    color: white;
  }
    .resultsContainer {
        background-color: white;
        width: 100%;
        border: 1px solid darkgray;
        max-height: 25vh;
        overflow-y: scroll;
        text-align: left;
        position: absolute;
        z-index: 9999;
    }



    /* // Form Input // */

    .yesValue {
        color: black;
        font-weight: bolder;
        border-bottom: lightgreen .25px solid;
    }

    .formBorder {
        border-bottom: 2px solid lightgray;
    }
</style>


