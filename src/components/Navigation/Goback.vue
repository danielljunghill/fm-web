<template>
      <a v-on:click="goBack">{{ text.getWord('Go_back') }}</a>
</template>

<script>

import getModelInstance from '../../model/main-model.js'
import  getTranslator from '../../model/language/words.js'

// import TaskState from '../model/task.js'
let data = getModelInstance()
// console.log(data.selectedItem)
let translator = getTranslator()

 export default {
    name: 'GoBack',
    data: function() { return { model: data, text: translator }},
    methods: {
        goBack:function()
        {
            
            this.model.goBackWithRefresh();
        },
    }


  }

</script>


