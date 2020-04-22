<template>
<div id= "task">
    <div>{{ task.A }}</div>
    <div><canvas ref="sign" width="20px" height="20px"></canvas></div>
    <div>{{ task.B }}</div>
    <div>=</div>
    <div class="answer">
      <input 
          v-model="answer"
          v-on:keyup.enter="nextTask" 
          ref="nextTask" 
          type="text"/></div>
</div>

     
  
  
</template>
<script>

import getModelInstance from '../model/main-model.js'
import  getTranslator from '../model/language/words.js'
import Designer from '../model/drawing/draw.js'
let data = getModelInstance()

console.log('get task')
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
      // designer = new Designer(this.$refs.raster)
      // designer.drawRaster()

    }
    ,
    updated: function()
    {
        if(this.answer == '')
        {
          this.setFocus();
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
    width: 500px;
    height: 100px
    
}

#task div
{
    display:inline-block;
    width: 40px;
    font-size:50px;
    margin: 10px;

  
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
/* canvas {
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
    border:2px  white;/*2px solid green;
    display:inline-block;
   
}

.grayBorder {
    border: 1px solid gray;
    display:inline-block;
}

.redBorder {
    border:2px white; /*2px solid red;
    display:inline-block;
}


table {
    align-self: center;
}

td.deactive {
    color: gray;
}

 td {
    border: 1px solid black; 
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 0px;
} 

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
} */

</style>
