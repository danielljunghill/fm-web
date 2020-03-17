<template>
  <div>
    Task
    <p> {{ model.timer.seconds }} </p>
    <p>{{ task.A }}</p>
    <p>{{ task.B }}</p>
    <p>{{ answer }}</p>
    <p><input 
                    v-bind:class="{hide:true}"
                    id='answer-question-input' 
                    type="text" 
                    v-on:keyup.enter="nextTask" 
                    v-model="answer"
                    autocomplete="off"/></p>
    <p><button v-on:click="nextTask">nextTask</button></p>
  </div>
 
</template>

<script>

import getModelInstance from '../model/main-model.js'

let data = getModelInstance()

  export default {
    name: 'Task',
    props: {
      task: {},
    },
  
    data: function() { return { answer:'', model: data}},
    methods:
    {
        nextTask:function()
        {
        
            function setNext(state)
            {
                console.log('answer in task vue '  + state.answer);
                state.model.nextTask(state.answer);
                state.answer = '';
            }
            setNext(this);
            //Timer.flow(() =>{ return },() => setNext(getModelInstance()),500) 
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
