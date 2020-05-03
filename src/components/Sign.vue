<template>
    <canvas ref="sign" width="20px" height="20px"></canvas> 
</template>
<script>

import Designer from '../model/drawing/draw.js'
// import TaskState from '../model/task.js'


  export default {
    name: 'Sign',
    mounted: function()
    {
      
      let designer = new Designer(this.$refs.sign)
      designer.drawX(20,20)
      // designer = new Designer(this.$refs.raster)
      // designer.drawRaster()

    }
    ,
    updated: function()
    {
        if(this.answer == '')
        {
          this.setFocus();
          let designer = new Designer(this.$refs.sign)
          designer.drawX(20,20)
          // let designer = new Designer(this.$refs.raster)
          // designer.drawRaster()

        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
