<template>
    <div v-on:click="viewHistory">
        History
    </div>
    
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