<template>
  <div id="connection-manager">
    <div class="ui three buttons">
      <button class="ui active button">One</button>
      <button class="ui button">Two</button>
      <button class="ui button">Three</button>
    </div>
    <ul>
      <li v-for="connection in list">{{ connection.name }}</li>
    </ul>
    <span>
    <input v-model="name">
    <input v-model="key">
    <input v-model="secret">
    <input v-model="region">
    <input v-model="endpoint">
    <button @click="onAddConnection">Add Connection</button>
    <button @click="onConnect">Connect</button>
    </span>
  <div>
</template>

<script>
  import DynamoDBClient from '../../services/dynamodb-client.js'
  import { addConnection } from '../../vuex/actions'

  export default {
    props: {
      name: {
        type: String,
        default: () => ''
      },
      key: {
        type: String,
        default: () => ''
      },
      secret: {
        type: String,
        default: () => ''
      },
      region: {
        type: String,
        default: () => ''
      },
      endpoint: {
        type: String,
        default: () => ''
      }
    },
    vuex: {
      getters: {
        list: state => state.connection.list
      },
      actions: {
        addConnection
      }
    },
    methods: {
      onAddConnection () {
        this.addConnection({
          name: this.name,
          key: this.key,
          secret: this.secret,
          region: this.region,
          endpoint: this.endpoint
        })
      },
      onConnect () {
        let connector = new DynamoDBClient({
          key: this.key,
          secret: this.secret,
          region: this.region,
          endpoint: this.endpoint
        })

        connector.listTable()
      }
    }
  }
</script>
