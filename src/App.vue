<template>
<div id="app">
  <header id="header">
      <div>Header</div>
  </header>
  <div id="main">
    <Main></Main>
  </div>
   <footer id="footer">
     <div>Footer</div>
  </footer>
</div>
</template>

<script>

import Main from './components/Main.vue'


export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
#header {
    display: block;
    height: 100px;
    background: #eee;

}
#footer {
    display: block;
    height: 100px;
    background: #eee;

}
#app {

    margin: 10% auto;
    width: 50%;
}
#main {
    margin: 100 auto;

}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
