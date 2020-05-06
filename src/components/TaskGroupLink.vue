<template>

  <div id="taskGroupLink">
      <div v-if="taskGroupLink.isActive() && !taskGroupLink.isCompleted()" 
          class='active'
          v-on:click="selected">
          {{ taskGroupLink.description}}
      </div>
      <div v-else-if="taskGroupLink.isCompleted()"
           class='completed'
                v-on:click="selected">
            {{ taskGroupLink.description}}
      </div> 
      <div v-else class="inactive">
            {{ taskGroupLink.description}}
      </div>
      
  </div>
</template>

<script>
import getModelInstance from '../model/main-model.js'
let modelInstance = getModelInstance()

  export default {
    name: 'TaskGroupLink',
    props: {
      taskGroupLink: {},
    },
  methods:{
      selected()
      {

          modelInstance.startRound(this.taskGroupLink.taskGroup);
      }
  }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#taskGroupLink
{
    display: inline-block;
    text-align: center;
}

#taskGroupLink div
{
  width: 150px;
  padding: 50px;
  margin: 20px;
  display: inline-block;
  /* box-sizing: border-box; */
  font-size: 30px;
}


 .active {
  background-color: lightgrey;
  border: 2px solid lightgrey;
  /* box-sizing: border-box; */

}

 .completed {
  background-color: lightgrey;
  color: green;
  border: 2px solid green;
  box-sizing: border-box;
} 


.completed:hover {
  background-color: green;
  color: white;
  width: 150px;
  border: 2px solid green;
  box-sizing: border-box;
}


.inactive {
  background-color: gray;
  border: 2px solid gray;
  box-sizing: border-box;

}

.active:hover {
  background-color: green;
  width: 150px;
  border: 2px solid green;
  padding: 50px;
  margin: 20px;
  box-sizing: border-box;
  color: whitesmoke;
}

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
