<template>

    <div id=history>
       
        <template v-for="task in history.tasks">
            <div class="taskhistory" v-bind:key="task.task.id">
                    <div>{{ task.task.question.a }}</div>
                    <div class="canvas"><Sign></Sign></div>
                    <div>{{ task.task.question.b }}</div>
                    <div>=</div>
                    <div>{{ task.task.question.a * task.task.question.b }}</div>
                    
            </div>
           
        </template>
         <div class=taskhistoryend></div>
         
        <div class="center">
            <div v-on:click="goBack">{{ text.getWord('Go_back') }}</div>
        </div> 
    </div>
</template>

<script>

import getModelInstance from '../model/main-model.js'
import  getTranslator from '../model/language/words.js'
import Designer from '../model/drawing/draw.js'
import Sign from './Sign'

let data = getModelInstance()
let translator = getTranslator()

 export default {
    name: 'TaskHistory',
    components: {
    Sign
    },
    data: function()  { return { history: data.selectedItem, text: translator }},
    methods: 
        { goBack:function()
            {
                console.log('goback')
                data.goBack();
            }
        }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#history
{
    text-align: left;
    padding:20px
}



.taskhistory 
{
    display: block;
    border:gray;
    border-style: solid;
    border-left-width: 2+x;
    border-right-width:2px;
    border-top-width:2px;
    border-bottom-width: 0px;
}

.taskhistoryend
{
    display: block;
    border:gray;
    border-style: solid;
    border-left-width: 0px;
    border-right-width:0px;
    border-top-width:2px;
    border-bottom-width: 0px;
}
.taskhistory div
{
    display: inline-block;
    font-size: 30px;
    padding: 5px;
    margin: 5px;
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