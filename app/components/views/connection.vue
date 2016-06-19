<template>
  <div class="ui basic segment">
    <h2 class="ui header">Connections</h2>
    <p>You can choose a DynamoDB connection or create a new one.</p>
    <button class="ui button" @click="onNewConnection">
      <i class="add square icon"></i>
      Create a new connection
    </button>
    
    <new-connection-modal v-ref:new-connection-modal></new-connection-modal>

    <div v-for="connection in list">
        <connection-box :connection="connection"></connection-box>
    </div>
  </div>
</template>

<script>
  import NewConnectionModal from '../modals/new_connection'
  import ConnectionBox from '../widgets/connection_box'

  export default {
    methods: {
      onNewConnection () {
        this.$refs.newConnectionModal.showModal()
      }
    },
    vuex: {
      getters: {
        list: state => state.connection.list
      }
    },
    components: {
      NewConnectionModal,
      ConnectionBox
    }
  }
</script>
