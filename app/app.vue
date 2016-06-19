<template>
  <div id="app">
    <div class="ui attached menu">
      <a class="item" @click="onToggleMenu">
        <i class="sidebar icon"></i>
        Menu
      </a>
      <a class="item" v-link="{ path: '/connection', activeClass: 'active' }">
        <i class="database icon"></i>
        Connections
      </a>
      <a class="item" v-link="{ path: '/table', activeClass: 'active' }">
        <i class="browser icon"></i>
        Tables
      </a>
      <a class="item" v-link="{ path: '/help', activeClass: 'active' }">
        <i class="help circle icon"></i>
        Help
      </a>
    </div>
    <div id="content" class="ui attached segment pushable">
      <sidebar></sidebar>
      <div class="pusher">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/sidebar'
  import store from './vuex/store'

  export default {
    store,
    methods: {
      onToggleMenu () {
        console.log('sidebar')
        $('#sidebar')
          .sidebar({
            context: $('#content')
          })
          .sidebar('setting', 'transition', 'overlay')
          .sidebar('toggle')
      }
    },
    created () {
      /* let p = new DdqlParser() */
      /* let node1 = p.parse( */
      /*   'SELECT * From Tabletest where abc.cde[1][2];' */
      /* ) */
      /* console.log(node1) */
    },
    components: {
      Sidebar
    }
  }
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    height: 100%;
    width: 100%;
  }
</style>
