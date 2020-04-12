<template>

  <div>
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
          console.log(this.taskGroupLink.taskGroup)
          modelInstance.startRound(this.taskGroupLink.taskGroup);
      }
  }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.active {
  background-color: lightgrey;
  width: 150px;
  border: 2px solid lightgrey;
  padding: 50px;
  margin: 20px;
  box-sizing: border-box;
  float: left;
  font-size: 30px;
}

.completed {
  background-color: lightgrey;
  color: green;
  width: 150px;
  border: 2px solid green;
  padding: 50px;
  margin: 20px;
  box-sizing: border-box;
  float: left;
  font-size: 30px;

}

.completed:hover {
  background-color: green;
  color: white;
  width: 150px;
  border: 2px solid green;
  padding: 50px;
  margin: 20px;
  box-sizing: border-box;
  float: left;
  font-size: 30px;

}

.inactive {
  background-color: gray;
  width: 150px;
  border: 2px solid gray;
  padding: 50px;
  margin: 20px;
  box-sizing: border-box;
  float: left;
  font-size: 30px;
}


.active:hover {
  background-color: green;
  width: 150px;
  border: 2px solid green;
  padding: 50px;
  margin: 20px;
  box-sizing: border-box;
  float: left;
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
