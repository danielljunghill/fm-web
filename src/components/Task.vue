<template>
<div>
<div v-if="task.state != 4" id= "task" class="center"> 
       <div class="test center">
           
         <!-- timer -->
         <div  v-if = "model.timer.seconds > 0"
            v-show="task.state == 1"
            v-bind:class="{'display-time': task.timelimit >= model.timer.seconds,'display-time-red': task.timelimit < model.timer.seconds}" >
            {{ model.timer.seconds }}
    
        </div>
        <div else>
        </div>
    </div>
    <div>
        <div class="taskborder">

            <!-- <p class="timer" >{{ model.timer.seconds }}</p> -->
            <div>{{ task.A }}</div>
            <div class="canvas"><Sign></Sign></div>
            <div>{{ task.B }}</div>
            <div>=</div>
            <div class="answer">
            <input 
                v-model="answer"
                v-on:keyup.enter="answerTaskAsync" 
                ref="nextTask" 
                type="text"/></div>
        </div>

        <div class="div-block">
            <div class="progress border">
                <div class="progressbar" v-bind:style="{width: (100 - ((task.countAnswered/task.countTotal) * 100)) + '%'}"> </div>
            </div>
        </div>
    </div>
 


   
</div>
<div v-else id="task" class="center">
    <div class="test center"></div>
    <div class="taskborder">
        <div>{{ task.A }}</div>
        <div class="canvas"><Sign></Sign></div>
        <div>{{ task.B }}</div>
        <div>=</div>
        <div>{{ answer }}</div>
        <div class="nextQuestion"><button ref="nextQ" v-on:click="nextTaskAsync">{{ text.getWord('goToNextQuestion') }}</button></div>
    </div>
    

</div>

</div> 

</template>
<script>

import getModelInstance from '../model/main-model.js'
import  getTranslator from '../model/language/words.js'
import Sign from './Sign.vue'

let data = getModelInstance()

let translator = getTranslator()

  export default {
    name: 'Task',
    components: {
    Sign
    },
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
    //   let designer = new Designer(this.$refs.sign)
    //   designer.drawX(20,20)
      // designer = new Designer(this.$refs.raster)
      // designer.drawRaster()

    }
    ,
    updated: function()
    {
        if(this.answer == '')
        {
          this.setFocus();
        //   let designer = new Designer(this.$refs.sign)
        //   designer.drawX(20,20)
          // let designer = new Designer(this.$refs.raster)
          // designer.drawRaster()

        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#task .test
{
    height:50px;
    width: 100%;
    display:inline-block
}
#task 
{
   
    width: 100%;
    height: 100% ; 

}
#task .div-block
{
    display: block;
}

#task .progress {
  width: 100%;
  height: 20px;
  background-color: #ddd;
  padding: 0px;
  margin:0px;
  font-size: 10px;
  text-align: left;
 

}

#task .progressbar {
  width: 1%;
  height: 20px;
  background-color: #4CAF50;
display: inline-block;
  padding: 0px;
  margin:0px;
  font-size: 10px;
}

#task .taskborder
{
    border-style: dotted;
    border-color: grey;
    border-width: 2px;

}

.taskborder
{
    border-style: dotted;
    border-color: grey;
    border-width: 2px;
}

#task .timer
{
    
    height:100%;
    width:70px;
    display: inline-block;
    text-align: center;
    position: relative;

}

#task div
{
    display: inline-block;
    font-size:50px;
    margin: 10px;
    background: white;
    text-align: center;
    padding: 10px
}

.height
{
    height: 100px;
}

.center
{
    text-align: center;
    height: 50px;
}


#task .canvas
{
      width: 20px;
      height: 20px;
}


#task .nextQuestion
{
    display:block;
    background: white;
    margin: 0px;
    align-content: left;
    margin: 0px;
    text-align: left;
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

#task button:focus
{
    outline: 0 !important;
    border-color:red;
    background: red;
  
}

#task button:hover
{
    width: 400px;
    height: 100px;
    background: None;
    font-size:20px;
    color:white;
    outline: 0 !important;
    border-width: 2px;
    border-color:red;
    border-style: solid;
    border-radius: 10px;
    background:red;
    opacity: 0.8;

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

.display-time
{
    font-size: 50px;
    color:green;
   
}

.display-time-red
{
    font-size: 50px;
    color:red;
}
</style>
