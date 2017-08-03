const Promise = require('bluebird')

function given (condition) {
  return makeStory((state) => Promise.resolve(state)).given(condition)
}

function makeStory (run) {
  function given (condition) {
    return makeStory((state) => {
      return run(state).then(({follow}) => follow((state) => {
        return Promise.try(() => {
          return condition.run(state.context)
        }).then((conditionContext) => {
          const newContext = Object.assign(
            {},
            state.context,
            conditionContext
          )

          const newState = Object.assign({}, state, {
            status: 'success',
            labels: [...state.labels, condition.name],
            follow: (fn) => Promise.try(() => fn(newState)),
            context: newContext
          })

          return newState
        }).catch((error) => {
          const newState = Object.assign({}, state, {
            status: 'failure',
            labels: [...state.labels, condition.name],
            follow: () => newState,
            error
          })

          return newState
        })
      }))
    })
  }

  function should (property) {
    return makeStory((state) => {
      return run(state).then(({follow}) => follow((state) => {
        return Promise.try(() => {
          return property.test(state.context)
        }).then(() => {
          const newState = Object.assign({}, state, {
            status: 'success',
            labels: [...state.labels, property.name],
            follow: (fn) => Promise.try(() => fn(newState))
          })

          return newState
        }).catch((error) => {
          const newState = Object.assign({}, state, {
            status: 'failure',
            labels: [...state.labels, property.name],
            follow: () => newState,
            error
          })

          return newState
        })
      }))
    })
  }

  return {
    run,
    given,
    should
  }
}

function run (stories) {
  const state = {
    status: 'success',
    labels: [],
    context: {},
    follow: (fn) => fn(state)
  }

  return Promise.map(stories, (story) => story.run(state))
    .map((storyState) => storyState)
}

function logResults (results) {
  results.forEach((result) => {
    if (result.status === 'success') {
      console.log('.', result.labels.join(' '))
    } else if (result.status === 'failure') {
      console.error('!', result.labels.join(' '), result.error)
    }
  })

  const {error: firstError} = results
    .find((result) => result.status === 'failure') || {}

  if (firstError) {
    throw firstError
  }
}

function context (name, run) {
  return {
    name,
    run
  }
}

function property (name, test) {
  return {
    name,
    test
  }
}

Object.assign(exports, {
  run,
  context,
  property,
  logResults,
  given
})
