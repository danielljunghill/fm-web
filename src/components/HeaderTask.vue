<template>
    <nav class="linkNavigation">
        <GoBack></GoBack>
    </nav>
</template>

<script>
import GoBack from './Navigation/Goback.vue'

 export default {
    name: 'HeaderTask',
    components:
    {
        'GoBack': GoBack,
    },
    props: ['item']

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