// Import Vue FilePond
import vueFilePond from 'vue-filepond'
import * as FilePond from 'filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

// Register the plugin
FilePond.registerPlugin(FilePondPluginFileValidateType)

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType)
