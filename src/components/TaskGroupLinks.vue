<template>
  <div id="taskGroupLinks">
        <ul>
            <template v-for="link in selectedItem.Links" >
                    <li v-bind:key="link.TableNr">
                        <Link v-bind:taskGroupLink="link" />
                    </li>
            </template>
        </ul>
         <div v-on:click="toggleLanguage">Toggle language</div>
         
  </div>

</template>

<script>
import getModelInstance from '../model/main-model.js'
let data = getModelInstance()

import getTranslator from '../model/language/words.js'
let translator = getTranslator()

import TaskGroupLink  from './TaskGroupLink.vue'

export default {
  name: 'TaskGroupLinks',
  components: {
     'Link':TaskGroupLink
  },
  data: function()  { return data },
  methods:{
      selectTaskGroup(link)
      {
          data.setTaskGroup(link);
        
      },
      toggleLanguage()
      {
          translator.toggleLanguage()
      }
  },
  mounted:function()
  {
      console.log('mounted')
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>




</style>
