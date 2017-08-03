const lime = require('../lib/lime')

function makeExampleStory ({properties, conditions}) {
  return lime.given(conditions.austinData)
    .given(conditions.hitCollection)
    .should(properties.haveMinimumHits(5))
}

Object.assign(exports, {
  makeExampleStory
})
