<template>

    <nav v-bind:class="{ linkNavigation: true,'mnu-closed': !openMenu, 'mnu-opened':openMenu}">
      <!-- todo add tov-bind:class="{'mnu-closed': !openMenu, 'mnu-opened':openMenu}" translator--> 
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
    props: ['item','openMenu'],
    data: function() { return { text : translator } },
    methods:
      { 
          viewHistory:async function()
          {
              this.openMenu = false;
              await model.viewHistory();
          },
          viewSettings:async function()
          {
              this.openMenu = false;
              await model.viewSettings();
          }
      }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>