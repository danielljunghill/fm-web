<template>
  <div class="center-div">
  <div id='question-table'>
    <table>
      <tr>
        <td v-if = "model.timer.seconds > 0" colspan=4>Consumer time: {{ model.timer.seconds }}</td>
      </tr>
      <tr>
        <td>{{ task.A }}</td>
        <td>*</td>
        <td>{{ task.B }}</td>
        <td>=</td>
        <td>{{ answer }}</td>
      <tr>
        <tr>
          <td colspan="4">
            <input 
                    v-bind:class="{hide:true}"
                    id='answer-question-input' 
                    type="text" 
                    v-on:keyup.enter="nextTask" 
                    v-model="answer"
                    autocomplete="off"/>
          </td>
        </tr>
        <tr>
          <td colspan="4"><button v-on:click="nextTask" id='answer-question-button'>nextTask</button></td>
        </tr>
    </table>
  </div>
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
            function resetAnswer(state)
            {
                state.answer = '';
            }
            console.log(' answer ' + this.answer)
            this.model.nextTask(this.answer,() => resetAnswer(this))
           
       
        //     function setNext(state)
        //     {
        //         console.log('answer in task vue '  + state.answer);
        //         state.model.nextTask(state.answer);
        //         state.answer = '';
        //     }
          
        //     Timer.flow(() =>{ return },() => setNext(this),500) 
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
#answer-table td {
    border-color: transparent;
    width: 50px;

}

#answer-question-button {
    
        display:inline-block;
        width:100%;
        height: 40px;
    
}

#answer-question-input {
    
    display:inline-block;
    width:90%;
    padding:10px;
    height: 40px;
    text-align: center;

}

#question-table  {
    border-color: transparent;


}

#question-table td:hover {
    background-color:transparent;

}

#question-table td {
    border-color: transparent;
    border: 1px transparent; 
    width: 50px;
    height: 50px;
    text-align: center;

}

div.display-text {
    font-size: 40px;
}
 
div.display-time {
    font-size: 30px;
    color: blue
}
div.display-error-text
{
    text-decoration: line-through;
    font-size: 40px;
    color: gray;
}

.center-div
{

    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -10%;
    margin-left: -200px;
}

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
