import { useState, useEffect } from 'react'
import { globalHistory } from '@reach/router'

const INITIAL_STATE = {
  location: globalHistory.location,
  navigate: globalHistory.navigate,
}

const useLocation = () => {
  const [state, setState] = useState(INITIAL_STATE)

  useEffect(() => {
    const removeListener = globalHistory.listen(params => {
      const { location } = params
      const newState = Object.assign({}, INITIAL_STATE, { location })
      setState(newState)
    })
    return () => {
      removeListener()
    }
  }, [])

  return state
}

export default useLocation
