<template>
  <div>
      <component v-bind:is="selectedItem.ComponentName"></component>
  </div>
</template>

<script>

import TaskGroupLinks from './TaskGroupLinks.vue'
import getModelInstance from '../model/main-model.js'
import TaskGroup  from './TaskGroup.vue'

let data = getModelInstance()

export default {
    name: 'Main',
    components:
    {
        'TaskGroupLinks': TaskGroupLinks,
        'TaskGroup': TaskGroup,

    },
    data: function()  { return data },
    methods:
    {
        changeName:function()
        {
            data.changeData();
        }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
