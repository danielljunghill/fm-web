<template>
    <div>
        <Task v-bind:task="taskGroup.task"></Task> 
    </div>
</template>

<script>
 import getModelInstance from '../model/main-model.js'

let data = getModelInstance()

 import Task  from './Task.vue'
 export default {
    name: 'TaskGroup',
    components:
    {
        'Task': Task
    },
    data: function()  { return { taskGroup: data.selectedItem }},
  
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
