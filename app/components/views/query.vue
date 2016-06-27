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
    <div class="ui two column stackable grid">
      <div class="column">
        <div class="ui segment">
          <textarea v-model="ast" readonly="true" style="width:100%; height:300px;"></textarea>
        </div>
      </div>
      <div class="column">
        <div class="ui segment">
          <textarea v-model="request" readonly="true" style="width:100%; height:300px;"></textarea>
        </div>
      </div>
    </div>
    <item-table></item-table>
  </div>
</template>

<script>
  import AceEditor from '../widgets/ace_editor'
  import ItemTable from '../widgets/item_table'
  import { updateQuery, updateQueryItems } from '../../vuex/actions'

  import DdqlParser from '../../libs/ddql/parser'
  import QueryGenerator from '../../libs/ddql/query_generator'
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
      },
      request: {
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
        let qg = new QueryGenerator()
        let ast = p.parse(this.query)
        this.ast = JSON.stringify(ast, null, 4)

        if (ast.status) {
          let request = qg.generate(ast.value)
          this.request = JSON.stringify(request, null, 4)
        } else {
          this.request = ''
        }
      },
      onRunQuery () {
        // TODO implement ast -> request
        let p = new DdqlParser()
        let qg = new QueryGenerator()
        let ast = p.parse(this.query)
        this.ast = JSON.stringify(ast, null, 4)

        if (ast.status) {
          let request = qg.generate(ast.value)
          this.request = JSON.stringify(request, null, 4)

          let connector = new DynamoDBClient({
            key: this.connection.key,
            secret: this.connection.secret,
            region: this.connection.region
          })
          if (request.method === 'scan') {
            connector.scan(request.params, (data) => {
              console.log(data)
              this.updateQueryItems(data['Items'])
            })
          } else if (request.method === 'query') {
            connector.query(request.params, (data) => {
              console.log(data)
              this.updateQueryItems(data['Items'])
            })
          } else if (request.method === 'putItem') {
            connector.putItem(request.params, (data) => {
              console.log(data)
            })
          }
        }
      }
    },
    components: {
      AceEditor,
      ItemTable
    }
  }
</script>
