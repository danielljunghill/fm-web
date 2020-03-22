<template>
  <div class="center-div">
        

        <template v-for="link in selectedItem.Links" >
                <Link v-bind:taskGroupLink="link" v-bind:key="link.TableNr"/>
        </template>
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
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.center-div
{
    position: absolute;
    top: 25%;
    left: 25%;
    margin-top: -50px;
    margin-left: -50px;
    width: 50%;
    height: 50% 
}​

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 20px;
}

li:hover 
{
    background-color: gray;
}

a {
  color: #42b983;
}
</style>
