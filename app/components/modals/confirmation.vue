<template>
  <div>
    <div class="ui modal" id="confirmation-modal">
      <div class="header">{{ header }}</div>
      <div class="content">
        <p>{{ content }}</p>
      </div>
      <div class="actions">
        <div class="ui approve button">Approve</div>
        <div class="ui cancel button">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      header: {
        type: String,
        default: () => ''
      },
      content: {
        type: String,
        default: () => ''
      },
    },
    methods: {
      showModal (header, content, callback) {
        this.header = header
        this.content = content
        $('#confirmation-modal').modal({
          inverted: false,
          closable: true,
          onApprove: callback 
        }).modal('show')
      }
    }
  }
</script>
