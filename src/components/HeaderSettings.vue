<template>
    <nav id="linkNavigation">
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
    props: ['item'],
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>