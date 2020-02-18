import React, { useEffect } from 'react'

import Button from '@material-ui/core/Button'

import NotFound from '../../components/NotFound'

import useStyles from './styles'

const NotFoundView = () => {
  const classes = useStyles()

  useEffect(() => {
    document.title = 'Not Found - Caqui'
  }, [])

  const handleBack = () => {
    const { history } = this.props
    history.goBack()
  }

  return (
    <main className={classes.root}>
      <div className={classes.center}>
        <NotFound />
        <Button className={classes.button} onClick={this.handleBack}>
          Voltar
        </Button>
      </div>
    </main>
  )
}

export default NotFoundView
