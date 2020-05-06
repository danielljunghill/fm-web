<template>
    <nav class="linkNavigation">
      <!-- todo add to translator--> 
      <a v-on:click="viewHistory">{{ text.getWord('viewHistory') }}</a>
       <a v-on:click="viewSettings">{{ text.getWord('viewSettings') }}</a>
    </nav> 
</template>

<script>


import getModelInstance from '../model/main-model.js'

import  getTranslator from '../model/language/words.js'
let model = getModelInstance()
// console.log(data.selectedItem)
let translator = getTranslator()
console.log('translator')
console.log(translator)
 export default {
    name: 'HeaderTaskGroupLinks',
    props: ['item'],
    data: function() { return { text : translator } },
    methods:
      { 
          viewHistory:async function()
          {
              await model.viewHistory();
          },
          viewSettings:async function()
          {
              await model.viewSettings();
          }
      }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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






</style>