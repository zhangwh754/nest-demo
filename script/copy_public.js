/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { resolve: _resolve } = require('path')

const resolve = path => _resolve(__dirname, path)

fs.cp(resolve('../public'), resolve('../dist/public'), { recursive: true }, err => {
  if (err) {
    console.error(err)
  }
})
