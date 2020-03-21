<template>
  <div class="center-div">
  <div v-bind:class="{greenBorder:(task.state == 2 || task.state == 3),redBorder:task.state == 4}" >
    <table id='wrap-table' >
      <tr>
        <td>
              <table id='question-table'>
                  <tr>
  
                    <td><div class='display-text'>{{ task.A }}</div></td>
                    <td><div class='display-text'>*</div></td>
                    <td><div class='display-text'>{{ task.B }}</div></td>
                    <td><div class='display-text'>=</div></td>
                    <td>
                      <div class='display-text' v-if="answer.trim()==''">?</div>
                      <div class='display-text' v-else>{{ answer }}</div>
                    </td>
                    <td rowspan=3></td>
                  <tr>
                    <tr>
                      <td colspan="7">
                        <input ref="nextTask"  

                                v-show="task.state == 1"
                                v-bind:class="{hide:true}"
                                id='answer-question-input' 
                                type="text" 
                                v-on:keyup.enter="nextTask" 
                                v-model="answer"
                                autocomplete="off"/>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="7">
                      <button
                      v-bind:disabled = "answer == ''"
                      default
                      v-show="task.state == 1" 
                      v-on:click="nextTask" 
                      id='answer-question-button'>Svara</button></td>
                    </tr>
            </table>
        </td>
        <td width=100px><div v-if = "model.timer.seconds > 0" 
           v-bind:class="{'display-time': task.timelimit >= model.timer.seconds,'display-time-red': task.timelimit < model.timer.seconds}"
           v-show="task.state == 1">{{ model.timer.seconds }}</div></td>
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
            if(this.answer.trim() == '')
            {
                return;
            }
           function resetAnswer(state)
            {
                state.answer = '';
            }
            this.model.nextTask(this.answer,() => resetAnswer(this))
           
        },
        setFocus:function()
        {
             this.$refs.nextTask.focus();
        }
      
    },
    mounted: function()
    {
      this.setFocus();
    }
    ,
    updated: function()
    {
        console.log('updated')
        if(this.answer == '')
        {
          this.setFocus();
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  background: white;
  color:black;
  padding:10px
}

.correct span {
    background: white;
    color:black;
    padding:10px
}

.answer span {
    background: white;
    color:black;
    padding:10px
}

.hide {
    display:none;

}

.greenBorder {
    border: 2px solid green;
    display:inline-block;
}

.grayBorder {
    border: 1px solid gray;
    display:inline-block;
}

.redBorder {
    border: 2px solid red;
    display:inline-block;
}


table {
    align-self: center;
}

td.deactive {
    color: gray;
}

/* td {
    border: 1px solid black; 
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 0px;
} */

td:active
{
    border: 3px solid black; 
}

td:hover {
    background-color:rgb(163, 169, 187);
  }
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
    width: 600 px;


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

#wrap-table  {
    border-color: transparent;

}

#wrap-table td:hover {
    background-color:transparent;

}

#wrap-table td {
    border-color: transparent;
    border: 1px transparent; 
    text-align: center;

}


.display-text {
    font-size: 30px;
}
 
.display-time {
    font-size: 50px;
    color: green
}

.display-time-red {
    font-size: 50px;
    color: red
}

.display-error-text
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
