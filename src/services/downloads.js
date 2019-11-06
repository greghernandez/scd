import axios from '../boot/axios'
import { address } from '../../enviroment.dev'

export const getFile = async (id, mode) => {
  try {
    axios({
      method: 'post',
      url: address + '/downloads/getFile',
      data: {
        id: id,
        mode: mode
      },
      responseType: 'blob',
      observe: 'response',
      headers: { 'content-type': 'application/json' }
    })
    // axios.post(address + '/downloads/getFile', {
    //   id: id,
    //   mode: mode
    // }, {
    //   responseType: 'blob',
    //   observe: 'response',
    //   headers: { 'content-type': 'application/json' }
    // })
      .then((res) => {
        console.log('asfafd')
        saveFile(res)
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (e) {
    console.log(e)
  }
}

export const joinInZip = async (fileName, fileList) => {
  try {
    axios.post(address + '/downloads/joinInZip', {
      files: {
        file_name: fileName,
        file_list: fileList
      }
    }, {
      responseType: 'blob',
      observe: 'response',
      headers: { 'content-type': 'application/json' }
    })
      .then(function (res) {
        saveFile(res)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (e) {
    console.log(e)
  }
}
// available modes: watch | download
export const joinInPdf = async (files, mode) => {
  try {
    axios.post(address + '/downloads/joinInPdf', {
      files: files,
      mode: mode
    }, {
      responseType: 'blob',
      observe: 'response',
      headers: { 'content-type': 'application/json' }
    })
      .then(function (res) {
        saveFile(res)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (e) {
    console.log(e)
  }
}

function getFileNameFromHttpResponse (httpResponse) {
  const contentDispositionHeader = httpResponse.headers.get('Content-Disposition')
  const result = contentDispositionHeader.split(';')[1].trim().split('=')[1]
  return result.replace(/"/g, '')
}
function saveFile (data) {
  const name = getFileNameFromHttpResponse(data)
  const blob = new Blob([data.body])
  // const url = window.URL.createObjectURL(blob);
  // saveAs(blob);
  // window.open(url);
  // For ie
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob)
    return
  }

  // For other browsers
  // Create a link pointing to the ObjectURL containing the blob.
  const datos = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = datos
  link.download = name
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data)
    link.remove()
  }, 100)
}
