<template>
      <div>
          <div v-on:click="toggleMnu">
        <MenuIcon></MenuIcon></div>
        <!-- <a class="menu-selection" ref="mnu-selection" v-on:click="toggleMnu"></a> -->
        
       <div>
       <component v-bind:is="model.selectedItem.ComponentName" v-bind:item="model.selectedItem" v-bind:openMenu="opened"></component>
      </div>
      </div>
</template>

<script>

import HeaderTaskGroupLinks from './HeaderTaskGroupLinks.vue'
import HeaderTask from './HeaderTask.vue'
import getModelInstance from '../model/main-model.js'
import HeaderTaskHistory from './HeaderTaskHistory.vue'
import MenuIcon from './MenuIcon.vue'

import HeaderSettings from './HeaderSettings.vue'
//import TaskGroup  from './TaskGroup.vue'
// import Task from './Task.vue'

let data = getModelInstance()

export default {
    name: 'Header',
    components:
    {
        'TaskGroupLinks': HeaderTaskGroupLinks,
        'Task': HeaderTask,
        'TaskHistory': HeaderTaskHistory,
        'Settings': HeaderSettings,
        'MenuIcon': MenuIcon

    },
    data: function()  { return { model : data,opened: false } },
    methods:
    {
       toggleMnu:function()
       {
           console.log('toggle')
           this.opened = !this.opened;
       }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

/* .linkNavigation a {
  color: darkgreen;
  float: left;
  margin-left:5px;
  margin-right:10px;
  margin-top: 10px;
  padding:5px;
  font-size: 25px;
  border-style: solid;
  border-width: 0px 0px 4px 0px;
  border-color: transparent;

}

.linkNavigation a:hover {
  color: green;
  float: left;
  margin-left:5px;
  margin-right:10px;
  margin-top: 10px;
  padding:5px;
  border-style: solid;
  border-width: 0px 0px 4px 0px;
  border-color: green;

} */

</style>
