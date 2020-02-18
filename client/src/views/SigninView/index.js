import React, { useEffect } from 'react'

import { isWidthUp } from '@material-ui/core/withWidth'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useStyles from './styles'

const SigninView = ({ props }) => {
  const classes = useStyles()

  useEffect(() => {
    document.title = 'Entrar - Mee'
  }, [])

  const handleSuccessEmployer = () => {}

  const handleSuccessEmployee = () => {}
  
  return (
    <main className={classes.root}>
      {isWidthUp('sm', props && props.width) && <div className={classes.overlay} />}
      <div className={classes.box}>
        <Typography variant='h4'>Bem-vindo(a) ao Mee</Typography>
        <Typography variant='h6' color='textSecondary' paragraph>
          A solução mais simples para o seu ponto de venda.
        </Typography>
        <Typography variant='h6' color='textPrimary' paragraph>
          Entrar como dono de um estabelecimento
        </Typography>
        <Button onClick={() => handleSuccessEmployer()}>Clique aqui</Button>
        <Typography variant='h6' color='textPrimary' paragraph>
          Entrar como funcionário
        </Typography>
        <Button onClick={() => handleSuccessEmployee()}>Clique aqui</Button>
        <Typography variant='caption'>
          Ao continuar, você concorda com os Termos de Serviço e com a Política de Privacidade do Mee
        </Typography>
      </div>
    </main>
  )
}

export default SigninView