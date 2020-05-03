<template>
    <nav id="linkNavigation">
      <a v-on:click="viewHistory">View History</a>
    </nav>
    <!-- <div v-on:click="viewHistory"> -->
   
    
</template>

<script>
import getModelInstance from '../model/main-model.js'
// import Designer from '../model/drawing/draw.js'
// import TaskState from '../model/task.js'

// import  getTranslator from '../model/language/words.js'
let model = getModelInstance()

 export default {
    name: 'HeaderTaskGroupLinks',
    props: ['item'],
    methods:
      { 
          viewHistory:async function()
          {
              await model.viewHistory();
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
#linkNavigation a {
  color: darkgreen;
  float: left;
  margin-left:5px;
  margin-right:10px;
  margin-top: 50px;
  padding:5px;
  font-size: 30px;

}

#linkNavigation a:hover {
  color: #42b983;
  float: left;
  margin-left:5px;
  margin-right:10px;
  margin-top: 50px;
  padding:5px;
  font-size: 30px;
  text-decoration: underline;

}





</style>