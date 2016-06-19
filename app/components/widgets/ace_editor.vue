<template>
  <div class="ui basic segment editorBox">
    <pre :id="editorIDName" class="editor">select * from customers;</pre>
  </div>
</template>

<script>
  import 'app/node_modules/ace-builds/src-min-noconflict/ace'
  const ACE = window.ace

  export default {
    props: {
      editorName: {
        type: String,
        default: () => 'ace-editor'
      }
    },
    computed: {
      editorIDName () {
        return 'ACE-' + this.editorName
      }
    },
    ready () {
      let editor = ACE.edit(this.editorIDName)
      editor.getSession().on('change', e => {
        this.$dispatch('change', editor.getSession().getValue())
      })
      this.$dispatch('change', editor.getSession().getValue())
    },
    methods: {
    }
  }
</script>

<style scoped>
  .editorBox {
    height: 130px;
  }
  .editor {
    margin: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 130px;
  }
</style>
