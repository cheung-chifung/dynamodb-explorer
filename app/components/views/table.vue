<template>
  <div class="ui basic segment">
    <h2 class="ui header">Tables</h2>
    <p>You can choose a DynamoDB table</p>
    
    <ul v-for="table in list" track-by="$index">
      <li>{{ table }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    methods: {
    },
    vuex: {
      getters: {
        query: state => state.query.query,
        items: state => state.query.items
      }
    },
    components: {
    }
  }
</script>
