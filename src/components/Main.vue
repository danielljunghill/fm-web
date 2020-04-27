<template>
  <div id="component">
      <component v-bind:is="selectedItem.ComponentName"></component>
  </div>
</template>

<script>

import TaskGroupLinks from './TaskGroupLinks.vue'
import getModelInstance from '../model/main-model.js'
//import TaskGroup  from './TaskGroup.vue'
import Task from './Task.vue'

let data = getModelInstance()

export default {
    name: 'Main',
    components:
    {
        'TaskGroupLinks': TaskGroupLinks,
        'Task': Task,

    },
    data: function()  { return data }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#component
{
    text-align: center;
}
/* h3 {
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
} */

/* #main {
    background: lightgray;
    margin: 2em auto;
    width: 50%
} */
</style>
