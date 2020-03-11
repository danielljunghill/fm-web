<template>
    <div>
       <p>{{ currentTask.A }} </p>
       <p>{{ currentTask.B }} </p>
       
       <button v-on:click="next">nextTask</button>
    </div>
</template>

<script>
 import getModelInstance from '../model/main-model.js'

 let data = getModelInstance()

 function nextTask()
 {
     let next = data.selectedItem.getNextTask()
     console.log(next)
     if(next.Completed)
     {

         data.backToStart();
         return {};
     }
     return next.Task;

 }

 export default {
    name: 'TaskGroup',
    data: function()  { return { model: data , currentTask: nextTask() }},
    methods:
    {
        next:function()
        {
            this.currentTask = nextTask()
        }
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
