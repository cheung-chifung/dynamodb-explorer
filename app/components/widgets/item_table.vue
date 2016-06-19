<template>
  <div class="ui basic segment">
    <table class="ui celled table">
      <thead>
        <tr>
          <th v-for="header in headers">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records">
          <td v-for="field in record">{{ field }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
    },
    computed: {
      headers () {
        return Array.from(new Set(this.items.reduce((l, r) => l.concat(Object.keys(r)), [])))
      },
      records () {
        var records = this.items.map(item => {
          return this.headers.map(header => {
            return item.hasOwnProperty(header) ? item[header] : ''
          })
        })
        return records
      }
    },
    ready () {
    },
    vuex: {
      getters: {
        items: state => state.query.items
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
