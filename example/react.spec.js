const lime = require('../lib/lime')
const mapValues = require('lodash.mapvalues')
const {makeExampleStory} = require('./suite')
const conditions = require('./conditions')
const properties = require('./properties')

describe('example suite results', () => {
  const mockProperties = mapValues(properties, jest.fn)
  let results

  beforeAll(() => {
    return lime.run([
      makeExampleStory({
        properties: mockProperties,
        conditions
      })
    ]).then((r) => {
      results = r
    })
  })

  it('should be defined', () => {
    expect(results).toBeDefined()
  })

  it('should have results', () => {
    lime.logResults(results)
  })

  it('should fire all the events', () => {
    expect(mockProperties.haveMinimumHits.mock.calls).toMatchSnapshot();
  });
})
