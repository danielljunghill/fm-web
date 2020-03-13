<template>
  <div>
    <ul>
        <template v-for="link in selectedItem.Links" >
            <li v-if="link.isActive()" v-on:click="selectTaskGroup(link)" v-bind:key="link.TableNr">{{ link.TableNr }}</li>
            <li v-else v-bind:key="link.TableNr">{{ link.TableNr }} inaktive</li>
        </template>
    </ul>
  </div>

</template>

<script>
import getModelInstance from '../model/main-model.js'


 let data = getModelInstance()

  export default {
    name: 'TaskGroupLinks',
    data: function()  { return data },
    methods:{
        selectTaskGroup(link)
        {
            data.selectedItem = link.CreateTaskGroup();
            console.log(data.selectedItem.ComponentName);
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
