<template>
  <div>
    <div class="ui modal" id="new-connection-modal">
    <validator name="connectionValidator">
      <div class="header">
        Create a new connection
      </div>
      <div class="content">
        <form class="ui form" novalidate>
          <div class="required field">
            <label>Connection name</label>
            <input type="text" name="name" v-model="name" placeholder="Connection name" v-validate:name="['required']">
          </div>
          <div class="required field">
            <label>Access key</label>
            <input type="text" name="key" v-model="key" placeholder="Access key" v-validate:key="['required']">
          </div>
          <div class="required field">
            <label>Secret key</label>
            <input type="text" name="secret" v-model="secret" placeholder="Secret key" v-validate:secret="['required']">
          </div>
          <div class="required field">
            <label>Region</label>
            <input type="text" name="region" v-model="region" placeholder="Region" v-validate:region="['required']">
          </div>
          <div class="field">
            <label>Endpoint</label>
            <input type="text" name="endpoint" v-model="endpoint" placeholder="Endpoint">
          </div>
        </form>
      </div>
      <div class="actions">
        <div class="ui black deny button">
          Cancel
        </div>
        <div class="ui positive right labeled icon button" :class="{disabled: $connectionValidator.invalid}">
          Save connection
         <i class="checkmark icon"></i>
        </div>
      </div>
    </validator>
    </div>
  </div>
</template>

<script>
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
      actions: {
        addConnection
      }
    },
    methods: {
      onApprove () {
        const isValid = this.$connectionValidator.valid
        if (isValid) {
          this.addConnection({
            name: this.name,
            key: this.key,
            secret: this.secret,
            region: this.region,
            endpoint: this.endpoint
          })
          return true
        }
        return false
      },
      showModal () {
        $('#new-connection-modal').modal({
          inverted: false,
          closable: true,
          onApprove: this.onApprove
        }).modal('show')
      }
    }
  }
</script>
