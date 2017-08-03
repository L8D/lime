const lime = require('../lib/lime')
const assert = require('assert')
const {Hit} = require('./components')

function haveMinimumHits (minimum) {
  return lime.property(`has at least ${minimum} hits`, (ctx) => {
    assert(ctx.wrapper.find(Hit).length >= 5)
  })
}

Object.assign(exports, {
  haveMinimumHits
})
