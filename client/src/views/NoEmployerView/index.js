import React, { useEffect } from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

const NoEmployerView = (props) => {
  const classes = useStyles()

  useEffect(() => {
    document.title = 'Not Found - Mee'
  }, [])

  const handleBack = () => {
    const { history } = this.props
    history.goBack()
  }

  return (
    <main className={classes.root}>
      <div className={classes.center}>
        <div className={classes.message}>
          <Typography variant='h4' paragraph>
            Aguarde até o estabelecimento te adicionar como funcionário!
          </Typography>
        </div>
        <Button className={classes.button} onClick={handleBack}>
          Voltar
        </Button>
      </div>
    </main>
  )
}

export default NoEmployerView
