<template>
  <div class="ui basic segment">
    <h2 class="ui header">Query</h2>
    <ace-editor @change="changeQuery"></ace-editor>
    <div class="ui basic segment">
      <button class="ui button" @click="onRunQuery">
        <i class="space shuttle icon"></i>
        Run
      </button>
    </div>
    <div class="ui basic segment">
      <textarea v-model="ast" readonly="true" style="width:100%; height:400px;"></textarea>
    </div>
    <item-table></item-table>
  </div>
</template>

<script>
  import AceEditor from '../widgets/ace_editor'
  import ItemTable from '../widgets/item_table'
  import { updateQuery, updateQueryItems } from '../../vuex/actions'

  import DdqlParser from '../../libs/ddql/parser'
  import DynamoDBClient from '../../services/dynamodb-client'

  export default {
    props: {
      query: {
        type: String,
        default: () => ''
      },
      ast: {
        type: String,
        default: () => ''
      }
    },
    vuex: {
      actions: {
        updateQuery,
        updateQueryItems
      },
      getters: {
        connection: state => state.connection.current
      }
    },
    methods: {
      changeQuery: function (query) {
        this.query = query
        let p = new DdqlParser()
        let ast = p.parse(this.query)
        this.ast = JSON.stringify(ast, null, 4)
      },
      onRunQuery () {
        // TODO implement ast -> request
        let p = new DdqlParser()
        let ast = p.parse(this.query)
        this.ast = JSON.stringify(ast, null, 4)
        if (ast.status) {
          let tableName = ast.value.table
          let params = {
            'TableName': tableName
          }
          let connector = new DynamoDBClient({
            key: this.connection.key,
            secret: this.connection.secret,
            region: this.connection.region
          })
          connector.scan(params, (data) => {
            this.updateQueryItems(data['Items'])
          })
        }
      }
    },
    components: {
      AceEditor,
      ItemTable
    }
  }
</script>
