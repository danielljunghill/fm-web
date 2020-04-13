<template>
  <div class="center-div">
  <div v-bind:class="{greenBorder:(task.state == 2 || task.state == 3),redBorder:task.state == 4}">
    <table id='wrap-table' >
      <tr>
        <td>
              <table id='question-table'> 
                  <tr>
                    <td><div class='display-text'>{{ task.A }}</div></td>
                    <td><canvas ref="sign" width="20px" height="20px"></canvas></td>
                    <td><div class='display-text'>{{ task.B }}</div></td>
                    <td><div class='display-text'>=</div></td>
                    <td>
                      <div class='display-text' v-if="answer.trim()==''">
                        <canvas ref='raster'  width="50px" height="50px"></canvas>
                      </div>
                      <div class='display-text' v-else>{{ answer }}</div>
                    </td>
                    <td rowspan=3></td>
                  <tr v-show="task.state == 1">
                    <!-- <tr> -->
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
                    <tr v-show="task.state == 1">
                      <td colspan="7">
                      <button
                      v-bind:disabled = "answer == ''"
                      default
                      v-show="task.state == 1" 
                      v-on:click="nextTask" 
                      id='answer-question-button'>{{ text.getWord('Answer') }}</button></td>
                    </tr>
            </table>
        </td>
        <td width=100px><div v-if = "model.timer.seconds > 0" 
           v-bind:class="{'display-time': task.timelimit >= model.timer.seconds,'display-time-red': task.timelimit < model.timer.seconds}"
           v-show="task.state == 1">{{ model.timer.seconds }}</div></td>
      </tr>
    </table>
  </div>
     <div v-on:click="goBack">{{ text.getWord('Go_back') }}</div>
  
  </div>
</template>
<script>

import getModelInstance from '../model/main-model.js'
import  getTranslator from '../model/language/words.js'
import Designer from '../model/drawing/draw.js'
let data = getModelInstance()

console.log('get task')
console.log(data.selectedItem)
let translator = getTranslator()

  export default {
    name: 'Task',
    // props: {
    //   task: {},
    // },
  
    data: function() { return { answer:'', task: data.selectedItem,model: data, text: translator}},
    methods:
    {
        nextTask:function()
        {
            if(this.answer.trim() == '')
            {
                return;
            }
           function resetAnswer(state,task)
            {
                state.answer = '';
                console.log('state task')
                console.log(task)
                state.task = task
            }
            this.model.nextTask(this.answer,(task) => resetAnswer(this,task))
           
        },
        setFocus:function()
        {
             this.$refs.nextTask.focus();
        },
        goBack:function()
        {
            
            this.model.goBack();
        },
     
      
    },
    mounted: function()
    {
      this.setFocus();
      let designer = new Designer(this.$refs.sign)
      designer.drawX(20,20)
      designer = new Designer(this.$refs.raster)
      designer.drawRaster()

    }
    ,
    updated: function()
    {
        if(this.answer == '')
        {
          this.setFocus();
          let designer = new Designer(this.$refs.raster)
          designer.drawRaster()

        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

canvas {
  width: 20 px;
  height: 20 px;
}
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
    border:2px  white;/*2px solid green;*/
    display:inline-block;
   
}

.grayBorder {
    border: 1px solid gray;
    display:inline-block;
}

.redBorder {
    border:2px white; /*2px solid red;*/
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
    font-size: 50px;
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
