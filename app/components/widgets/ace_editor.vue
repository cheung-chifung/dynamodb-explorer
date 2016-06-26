<template>
  <div class="ui basic segment editorBox">
    <pre :id="editorIDName" class="editor">insert into customers (`customer_id`, `account_id`, `boolData`, `nullData`, `binary`, `stringSetData`, `numberSetData`, `base64Data`, `list`, `map`)
    values ("testtest", 123, true, null, B:U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=, <"str1", "str2">, <1, 2, 3>, < B:aGVsbG8=, base64:d29ybGQ= >, [1, "2", [3, 4]], {`a`: "b", `c`: 2} );</pre>
  </div>
</template>

<script>
  import ACE from 'brace'
  require('brace/theme/monokai')
  require('brace/keybinding/vim')

  ACE.$blockScrolling = Infinity

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
      editor.setKeyboardHandler('ace/keyboard/vim')
      editor.setTheme('ace/theme/monokai')
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
