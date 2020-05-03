<template>
    <div id='settings'>
        <button v-on:click="clearData">{{  text.getWord('clearDatabase') }}</button>
    </div>
</template>

<script>

import getModelInstance from '../model/main-model.js'
import  getTranslator from '../model/language/words.js'


let data = getModelInstance()
let translator = getTranslator()

 export default {
    name: 'Settings',

    data: function()  { return { text: translator }},
    methods: 
        { goBack:function()
            {
                data.goBackWithRefresh();
            },
            clearData:async function()
            {
                await data.selectedItem.clearHistory()
            }
        }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#settings button
{
    width: 400px;
    height: 100px;
    background: None;
    font-size:20px;
    color:white;
    
    border-width: 2px;
    border-color:darkgreen;
    border-style: solid;
    border-radius: 10px;
    background: darkgreen;

}

#settings button:focus
{
    outline: 0 !important;
    border-color:green;
    background: darkgreen;
  
}

#settings button:hover
{
    width: 400px;
    height: 100px;
    background: None;
    font-size:20px;
    color:white;
    outline: 0 !important;
    border-width: 2px;
    border-color:green;
    border-style: solid;
    border-radius: 10px;
    background:green;
    opacity: 0.8;

}

#settings 
{
    text-align: center;
    padding: 20px;
}


</style>