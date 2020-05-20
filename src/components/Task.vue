<template>
<div id="question">
<div v-if="task.state != 4" id= "task" class="center"> 
       <div class="test center">
           
         <!-- timer -->
         <div  v-if = "model.timer.seconds > 0"
            v-show="task.state == 1"
            v-bind:class="{'display-time': task.timelimit >= model.timer.seconds,'display-time-red': task.timelimit < model.timer.seconds}" >
            {{ model.timer.seconds }}
    
        </div>
        <div class="display-time" else>
        </div>
    </div>
    <div >
        <div id="details">

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
            <div class="progress">
                <div class="progressbar" v-bind:style="{width: (100 - ((task.countAnswered/task.countTotal) * 100)) + '%'}"> </div>
            </div>
        </div>
    </div>
 


   
</div>
<div v-else id="task" class="center">
    <div class="test center"></div>
    <div id="details" class="taskborder">
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


</style>
