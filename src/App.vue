<template>
<div id="app">
  <header id="header">
      <Header></Header>
  </header>
  <div id="main">
 
    <div>
    <Main></Main>
    </div>
  </div>
   <footer id="footer">
     <div>Footer</div>
  </footer>
</div>
</template>

<script>

import Main from './components/Main.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Main,
    Header
  }
}
</script>

<style>
html, body {
    height:100%;
}



#header {

    height: 100px;
    width: 100%;
    background: #eee;


}

#header div {

    display: inline-block;

}

#footer {
    display: block;
    height: 100px;
    background: #eee;
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0

}
#app {
    width: 100%;
    height: 100%;

}

#main {
 
    height: 500px;
    margin: 0 auto;
    width:100%;

}



/* #main div{
  text-align: center;

} */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
