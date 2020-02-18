import React, { Component } from 'react'
import * as compose from 'lodash.flowright'
import { GoogleLogin } from 'react-google-login'
import Raven from 'raven-js'

import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Google from '../../styles/icons/google-icon'

import styled from './styles'

import { signinGoogleEmployer, signinGoogleEmployee } from '../../graphql/grocery/resolvers'

class SigninView extends Component {
  componentDidMount() {
    document.title = 'Entrar - Mee'
  }

  componentDidCatch(error, info) {
    Raven.captureException(error, { extra: info })
  }

  handleSuccessEmployer = async (response) => {
    const { tokenId: googleIdToken } = response
    const { signinGoogleEmployer } = this.props
    const variables = { googleIdToken }
    await signinGoogleEmployer({ variables })
  }

  handleSuccessEmployee = async (response) => {
    const { tokenId: googleIdToken } = response
    const { signinGoogleEmployee } = this.props
    const variables = { googleIdToken }
    await signinGoogleEmployee({ variables })
  }

  handleFailure = (response) => {}

  render() {
    const { classes, width } = this.props

    return (
      <main className={classes.root}>
        {isWidthUp('sm', width) && <div className={classes.overlay} />}
        <div className={classes.box}>
          <Typography variant='h4'>Bem-vindo(a) ao Mee</Typography>
          <Typography variant='h6' color='textSecondary' paragraph>
            A solução mais simples para o seu ponto de venda.
          </Typography>
          <Typography variant='h6' color='textPrimary' paragraph>
            Entrar como dono de um estabelecimento
          </Typography>
          <GoogleLogin
            className={classes.button}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={this.handleSuccessEmployer}
            onFailure={this.handleFailure}
            render={(renderProps) => (
              <Button className={classes.googleButton} variant='contained' onClick={renderProps.onClick} fullWidth>
                <Google className={classes.icon} />
                Entrar com Google
              </Button>
            )}
          />
          <div />
          <div />
          <Typography variant='h6' color='textPrimary' paragraph>
            Entrar como funcionário
          </Typography>
          <GoogleLogin
            className={classes.button}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={this.handleSuccessEmployee}
            onFailure={this.handleFailure}
            render={(renderProps) => (
              <Button className={classes.googleButton} variant='contained' onClick={renderProps.onClick} fullWidth>
                <Google className={classes.icon} />
                Entrar com Google
              </Button>
            )}
          />
          <div />
          <Typography variant='caption'>
            Ao continuar, você concorda com os Termos de Serviço e com a Política de Privacidade do Mee
          </Typography>
        </div>
      </main>
    )
  }
}

const enhance = compose(signinGoogleEmployer, signinGoogleEmployee, withWidth(), styled)

export default enhance(SigninView)
