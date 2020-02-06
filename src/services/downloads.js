import axios from 'axios'
import { address } from '../../enviroment.dev'

export async function getFile (id, mode) {
  return new Promise(resolve => {
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
      //   id: id,2
      //   mode: mode
      // }, {
      //   responseType: 'blob',
      //   observe: 'response',
      //   headers: { 'content-type': 'application/json' }
      // })
        .then((res) => {
          if (mode === 'download') {
            resolve(res.status)
            saveFile(res)
          } else if (mode === 'watch') {
            // watchFile(res)
            console.log('watch')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
    }
  })
}

export const joinInZip = async (fileName, fileList) => {
  return new Promise(resolve => {
    try {
      axios.post(address + '/downloads/joinInZip', {
        file_name: fileName,
        files_list: fileList
      }, {
        responseType: 'blob',
        observe: 'response',
        headers: { 'content-type': 'application/json' }
      })
        .then(function (res) {
          resolve(res.status)
          saveFile(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
    }
  })
}
// available modes: watch | download
export const joinInPdf = async (files, mode) => {
  return new Promise(resolve => {
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
          resolve(res)
          saveFile(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
    }
  })
}

function getFileNameFromHttpResponse (httpResponse) {
  // console.log(httpResponse)
  const contentDispositionHeader = httpResponse.headers['content-disposition']
  const result = contentDispositionHeader.split(';')[1].trim().split('=')[1]
  return result.replace(/"/g, '')
}

function saveFile (data) {
  const name = getFileNameFromHttpResponse(data)
  const blob = new Blob([data.data])
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
