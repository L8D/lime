const h = require('react-hyperscript')
const {shallow} = require('enzyme')
const lime = require('../lib/lime')
const mapValues = require('lodash.mapvalues')

const {Hit, HitCollection} = require('./components')

const renderConditions = {
  hitCollection: lime.context('with hit collection rendered', ({hits}) => {
    const wrapper = shallow(
      h(HitCollection, {hits})
    )

    return {wrapper}
  })
}

const datasets = {
  austinData: {
    name: 'Austin',
    hits: ['foo', 'bar', 'baz', 'quux', 'blaz', 'foobar']
  }
}

const dataConditions = mapValues(datasets, (dataset) => {
  const {name, hits} = dataset

  const condition = lime.context(`${name} Data`, () => ({hits}))

  return condition
})

Object.assign(
  exports,
  dataConditions,
  renderConditions
)
