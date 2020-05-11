<template>
    <nav v-bind:class="{ linkNavigation: true,'mnu-closed': !openMenu, 'mnu-opened':openMenu}">
      <a v-on:click="goBack">{{ text.getWord('Go_back') }}</a>
    </nav>
</template>

<script>

import getModelInstance from '../model/main-model.js'
import  getTranslator from '../model/language/words.js'

// import TaskState from '../model/task.js'
let data = getModelInstance()
// console.log(data.selectedItem)
let translator = getTranslator()

 export default {
    name: 'HeaderSettings',
    props: ['item','openMenu'],
    data: function() { return { model: data, text: translator }},
    methods: {
        goBack:function()
        {
            
            this.model.goBackWithRefresh();
        },
    }


  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>