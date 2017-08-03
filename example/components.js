const h = require('react-hyperscript')

function Hit (props) {
  const {hit} = props

  return h('h1', hit)
}

function HitCollection (props) {
  const {hits} = props

  return h('.hit-collection', [
    hits.map((hit) => h(Hit, {key: hit, hit}))
  ])
}

Object.assign(exports, {
  Hit,
  HitCollection
})
