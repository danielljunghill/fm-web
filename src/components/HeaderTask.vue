<template>
    <div>
        Task {{ item.task.id }}
    </div>
</template>

<script>

import getModelInstance from '../model/main-model.js'
let data = getModelInstance()


 export default {
    name: 'HeaderTask',
    props: ['item'],
    mounted: function()
    {
        data.addListener((task) => this.item = task)
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