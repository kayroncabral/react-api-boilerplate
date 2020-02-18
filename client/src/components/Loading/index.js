import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'

import useStyles from './styles'
import { Typography } from '@material-ui/core'

const Loading = ({ className, message, size }) => {
  const classes = useStyles()

  return (
    <div className={classNames(classes.root, className)}>
      <div>
        <CircularProgress className={classes.progress} size={size} />
        {message && <Typography align='center'>{message}</Typography>}
      </div>
    </div>
  )
}

Loading.propTypes = {
  className: PropTypes.object,
  message: PropTypes.string,
  size: PropTypes.number
}

Loading.defaultProps = {
  message: '',
  size: 80
}

export default Loading
