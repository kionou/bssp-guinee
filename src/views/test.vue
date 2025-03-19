 <template >
  <div>
    <div class="row">
                    <div class="col-xl-12">
                        <div class="card custom-card">
                            <div class="card-header">
                                <div class="card-title">
                                    Quill Snow Editor
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="editor1"></div>
                            </div>
                        </div>
                    </div>
                </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
  
    var toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],

        ['image', 'video'],
        ['clean']                                         // remove formatting button
    ];
    var quill = new Quill('#editor1', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });

    


  },
  
}
</script>
<style lang="css" scoped>
  
</style> 


<!-- <template>
  <div id="app">
    <froala id="edit" :tag="'textarea'" :config="config" v-model:value="model"></froala>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      config: {
        events: {
          initialized: function () {
           
          }
        }
      },
      model: 'Edit Your Content Here!'
    }
  }
}
</script> -->