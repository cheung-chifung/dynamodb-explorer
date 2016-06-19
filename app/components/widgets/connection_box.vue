<template>
<div class="ui card">
  <div class="content">
    <div class="header">{{ connection.name }}</div>
  </div>
  <div class="content">
    <h4 class="ui sub header">{{ connection.region }}</h4>
    <div class="ui small feed">
      For test
    </div>
  </div>
  <div class="extra content">
    <button class="ui primary button" @click="onConnect">Connect</button>
    <button class="ui button" @click="onEdit">Edit</button>
    <button class="ui icon red button" @click="onDelete">
      <i class="trash icon"></i>
    </button>
  </div>
</div>
</template>

<script>
  import DynamoDBClient from '../../services/dynamodb-client.js'
  import { removeConnection, setCurrentConnection, updateTableList } from '../../vuex/actions'

  export default {
    props: {
      connection: {
        type: Object,
        default: () => {}
      }
    },
    vuex: {
      actions: {
        removeConnection,
        setCurrentConnection,
        updateTableList
      }
    },
    methods: {
      onConnect () {
        this.setCurrentConnection(this.connection)
        let connector = new DynamoDBClient({
          key: this.connection.key,
          secret: this.connection.secret,
          region: this.connection.region
        })
        connector.listTable(tables => {
          if (tables) {
            console.log(tables)
            this.updateTableList(tables)
            this.$router.go('/table')
          }
        })
      },
      onEdit () {
        console.log('edit')
      },
      onDelete () {
        this.removeConnection(this.connection)
        console.log('delete')
      }
    }
  }
</script>
