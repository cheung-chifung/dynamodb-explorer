<template>
  <div id="table-lists">
    <ul>
        <li v-for="table in list">
            {{ table }}
        </li>
    </ul>
  </div>
</template>

<script>
  export default {
    vuex: {
      getters: {
        list: state => state.table.list
      }
    },
    methods: {
      selectTable () {
        console.log("tableTable")
      }
    }
  }
</script>
