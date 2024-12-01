<template>
    <div>
      <div ref="editor" class="quill-editor"></div>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue'
 
  export default defineComponent({
    name: 'QuillEditor',
    props: {
      modelValue: { // Pour supporter v-model, renommez 'value' en 'modelValue'
        type: String,
        default: ''
      }
    },
    emits: ['update:modelValue'], // Emit l'événement sous ce nom
    setup(props, { emit }) {
      const editor = ref(null)
      let quill = null
  
      onMounted(() => {
        const toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          ['clean']
        ]
  
        quill = new Quill(editor.value, {
          modules: {
            toolbar: toolbarOptions
          },
          theme: 'snow'
        })
  
        quill.root.innerHTML = props.modelValue // Initialiser avec la valeur passée
  
        quill.on('text-change', () => {
          const content = quill.root.innerHTML
          emit('update:modelValue', content) // Émettre l'événement 'update:modelValue'
        })
      })
  
      return {
        editor
      }
    }
  })
  </script>

  <style scoped lang="css">

  
  .quill-editor {
  height: auto;
  margin-bottom: 10px;
}
  </style>
  