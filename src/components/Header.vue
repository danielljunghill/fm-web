<template>
  <div id="component">
      <component v-bind:is="model.selectedItem.ComponentName" v-bind:item="model.selectedItem"></component>
  </div>
</template>

<script>

import HeaderTaskGroupLinks from './HeaderTaskGroupLinks.vue'
import HeaderTask from './HeaderTask.vue'
import getModelInstance from '../model/main-model.js'
//import TaskGroup  from './TaskGroup.vue'
// import Task from './Task.vue'

let data = getModelInstance()

export default {
    name: 'Header',
        components:
    {
        'TaskGroupLinks': HeaderTaskGroupLinks,
        'Task': HeaderTask,

    },
    data: function()  { return { model : data } },
   

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
