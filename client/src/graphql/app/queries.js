import gql from 'graphql-tag'

import { USER_ATTRIBUTES } from '../fragments'

export const GET_APP = gql`
  query {
    app @client {
      logged
      grocery {
        ...groceryAttributes
      }
      openDrawer {
        xs
        sm
        md
        lg
        xl
      }
      openProductDialog
      openRefreshSnackbar
      openSettings
      openSignout
    }
  }
  ${USER_ATTRIBUTES}
`

export const UPDATE_APP = gql`
  mutation($input: UpdateAppInput!) {
    updateApp(input: $input) @client
  }
`

export const TOGGLE_DRAWER = gql`
  mutation($width: String!) {
    toggleDrawer(width: $width) @client
  }
`

export const OPEN_SIGNOUT = gql`
  mutation {
    openSignout @client
  }
`

export const CLOSE_SIGNOUT = gql`
  mutation {
    closeSignout @client
  }
`
