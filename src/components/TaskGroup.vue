<template>
    <div>
        <p>{{ timer.seconds }}</p>
        <p>{{ currentTask.A }} </p>
         <p>{{ currentTask.B }} </p>
        <Task v-bind:task="currentTask"></Task>
    <!-- <table id="question-table" style="width:400px">
            <tr>
            <td>
                <table style="width:300px">
                  <tr>
                    <td><div class="display-text" style="width: 50px;">{{state.Task.A}}</div></td>
                    <td>*</td>
                    <td><div class="display-text" style="width: 50px;">{{state.Task.B}}</div></td>
                    <td><div class="display-text" style="width: 50px;"> =</div></td>
                    <td><div class="display-text" style="width: 50px;">{{state.Answer}}</div></td> 
                  </tr>
                  <tr><td colspan="5">
                    <input 
                    v-bind:class="{hide:true}"
                    id='answer-question-input' 
                    type="text" 
                    v-on:keyup.enter="verifyAnswer" 
                    v-model="state.Answer"
                    autocomplete="off"></input></td></tr>
                  <tr><td colspan="5"><button v-on:click="verifyAnswer" id='answer-question-button'>Svar</button></td></tr>
                </table>
            </td>
            <td>
              
              <div v-if="state.seconds != 0"  div class="display-time">{{state.seconds}}</div>
          </td>
          </tr>
        </table> -->
       <button v-on:click="next">nextTask</button>

    </div>
</template>

<script>
 import getModelInstance from '../model/main-model.js'
 import Timer from '../model/Time.js'
 

 let timer = new Timer();
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
    timer.start()
    return next.Task;

 }

 import Task  from './Task.vue'
 export default {
    name: 'TaskGroup',
    components:
    {
        'Task': Task
    },
    data: function()  { return { model: data , currentTask: nextTask(), timer: timer }},
    methods:
    {
        next:function()
        {
            function setNext(state)
            {
                state.currentTask = nextTask();
            }
            Timer.flow(() => timer.stopAndReset(),() => setNext(this),2000) 
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
