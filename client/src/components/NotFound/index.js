import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

import Emoji from '../Emoji'

const NotFound = ({ className }) => {
  const classes = useStyles()

  return (
    <div className={classNames(classes.root, className)}>
      <Typography className={classes.title} variant='h3' paragraph>
        Nada Aqui! <Emoji symbol='😕' label='rosto confuso' />
      </Typography>
    </div>
  )
}

NotFound.propTypes = {
  className: PropTypes.object
}

NotFound.defaultProps = {}

export default NotFound
