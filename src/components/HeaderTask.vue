<template>
    <nav v-bind:class="{ linkNavigation: true,'mnu-closed': !openMenu, 'mnu-opened':openMenu}">
        <GoBack v-bind:openMenu="openMenu"></GoBack>
    </nav>
</template>

<script>
import GoBack from './Navigation/Goback.vue'

 export default {
    name: 'HeaderTask',
    props: ['item','openMenu'],
    components:
    {
        'GoBack': GoBack,
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>