<template>
<div v-if="task.state != 4" id= "task">
    <div>{{ task.A }}</div>
    <div class="canvas"><canvas ref="sign" width="20px" height="20px"></canvas></div>
    <div>{{ task.B }}</div>
    <div>=</div>
    <div class="answer">
      <input 
          v-model="answer"
          v-on:keyup.enter="answerTaskAsync" 
          ref="nextTask" 
          type="text"/></div>
</div>
<div v-else id="task">
    <div>{{ task.A }}</div>
    <div class="canvas"><canvas ref="sign" width="20px" height="20px"></canvas></div>
    <div>{{ task.B }}</div>
    <div>=</div>
    <div>{{ answer }}</div>
    <div class="nextQuestion"><button ref="nextQ" v-on:click="nextTaskAsync">{{ text.getWord('goToNextQuestion') }}</button></div>
</div>

     
  
  
</template>
<script>

import getModelInstance from '../model/main-model.js'
import  getTranslator from '../model/language/words.js'
import Designer from '../model/drawing/draw.js'
// import TaskState from '../model/task.js'
let data = getModelInstance()
// console.log(data.selectedItem)
let translator = getTranslator()

  export default {
    name: 'Task',
    // props: {
    //   task: {},
    // },
  
    data: function() { return { answer:'', task: data.selectedItem,model: data, text: translator}},
    methods:
    {
        answerTaskAsync:async function()
        {
            if(this.answer.trim() == '')
            {
                return;
            }
            await this.model.answerTaskAsync(this.answer);
            if(this.task.state == 4)
            {
                //TODO: get a result from answer task that gives correct answer
                this.answer = this.task.A * this.task.B;
                this.$refs.nextQ.focus();
                return;
            }
            await this.nextTaskAsync()
        },
        nextTaskAsync:async function()
        {
            await this.model.nextTaskAsync()
            this.answer = '';
            this.task = this.model.selectedItem
        },  
        nextTask:function()
        {
            if(this.answer.trim() == '')
            {
                return;
            }
           function resetAnswer(state,task)
            {
                state.answer = '';
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
      // designer = new Designer(this.$refs.raster)
      // designer.drawRaster()

    }
    ,
    updated: function()
    {
        if(this.answer == '')
        {
          this.setFocus();
          let designer = new Designer(this.$refs.sign)
          designer.drawX(20,20)
          // let designer = new Designer(this.$refs.raster)
          // designer.drawRaster()

        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#task 
{
    margin:20% auto;
    width: 550px;
    height: 100px
    
}

#task div
{
    display:inline-block;

    font-size:50px;
    margin: 10px;
    background: white;
    text-align: center;
    background: lightgreen;
    padding: 10px
}


#task .canvas
{
      width: 20px;
      height: 20px;
}


#task .nextQuestion
{
    display:block;

}

#task button
{
    width: 400px;
    height: 100px;
    background: None;
    font-size:20px;
    color:white;

    border-width: 2px;
    border-color:darkred;
    border-style: solid;
    border-radius: 10px;
    background: darkred;
}

#task .answer
{
    display: inline-block;
    height: 60px;
    width: 120px;

}

input {
    border-top-style: solid;
    border-right-style: solid;
    border-left-style: solid;
    outline: none;
    outline-width: 0;
    height: 50px;
    border-color:lightgray;
    border-width: 2px;
    padding: 10px;
    text-align: center;
    font-size:40px;
    width:100px

}

input:focus {
  border-color: darkgray;
  border-radius: 0px;
  border-width: 2px;

}
</style>
