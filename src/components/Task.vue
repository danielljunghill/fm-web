<template>
  <div>
      <p>{{ name }}</p>
     <button v-on:click="changeName">change name</button>
  </div>
 
</template>

<script>
 import MainModel from '../model/main-model.js'
 let data = new MainModel();

  export default {
    name: 'Task',
    props: {
      msg: String
    },
    data: function()  { return data },
    methods:
    {
        changeName:function()
        {
            data.changeName();
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
