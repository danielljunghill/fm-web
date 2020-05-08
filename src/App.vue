<template>
<div id="app">
  <header id="header">
    <!-- header -->
      <Header></Header>
  </header>
  <div id="main">
    <div class="content">
       <Main></Main>
    </div>
  </div>
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


/* html, body {
    height:100%;
    margin:0px
} */


@import './styles/fm-styles.css';

#header {

    height: 50px;
    width: 100%;
    background: #eee;
    position: fixed;
    top:0;
    left:0;
}


#header div {

    display: inline-block;

}

#footer {

    background:darkred;
    height: 50px;
    display:block;
    position: fixed;
    width:100%;
    top:0;
    left:0;
          /* Footer height */
}

#app {
    width: 100%;
    height: 100%;
}

#main .content{
 
    height: 100%;
    width:100%;
    display: block;

}

#main {
 
    height: 100%;
    margin: 0 auto;
    width:100%;
    padding-top: 100px;
    display: block;

}

.border 
{
   border-color: darkgreen;
   border-width: 2px ;
   border-style: dotted;
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
