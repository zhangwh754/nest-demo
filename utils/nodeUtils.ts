import * as fs from 'fs'

export const fileInput = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', err => {
      if (err) {
        console.error('Error writing file:', err)
        reject(err)
      } else {
        resolve('success')
      }
    })
  })
}
