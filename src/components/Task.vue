<template>
  <div>
    Task
    <p>{{ task.A }}</p>
    <p>{{ task.B }}</p>
    <p>{{ task.Answer }}</p>
    <input 
                    v-bind:class="{hide:true}"
                    id='answer-question-input' 
                    type="text" 
                    v-on:keyup.enter="verifyAnswer" 
                    v-model="task.Answer"
                    autocomplete="off"/>
    
  </div>
 
</template>

<script>

  export default {
    name: 'Task',
    props: {
      task: {},
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
