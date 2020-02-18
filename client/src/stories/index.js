import React from 'react'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'

import Dialog from '@material-ui/core/Dialog'

import AddPaymentDialog from '../dialogs/AddPaymentDialog'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Payment Dialog', module)
  .add('with text', () =>
    <Dialog
      id='add-payment-dialog'
      open={true}
      aria-labelledby='dialog-title'
      // onClose={handleDialogClose}
    >
      <AddPaymentDialog total={9.5} />
    </Dialog>
  )