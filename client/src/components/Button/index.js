import React from 'react'
import PropTypes from 'prop-types'

import ButtonBase from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import useStyles from './styles'

const Button = ({ loading, children, ...props }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ButtonBase {...props} disabled={loading}>
        {children}
      </ButtonBase>
      {loading && <CircularProgress className={classes.progress} size={24} />}
    </div>
  )
}

Button.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any
}

Button.defaultProps = {
  loading: false
}

export default Button
