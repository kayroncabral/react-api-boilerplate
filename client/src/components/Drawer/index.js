import React from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'
import classNames from 'classnames'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import DrawerBase from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge'

import PaymentIcon from '@material-ui/icons/Payment'
import Store from '@material-ui/icons/StoreOutlined'
import BarChart from '@material-ui/icons/BarChartOutlined'
import Group from '@material-ui/icons/GroupOutlined'
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined'
import Receipt from '@material-ui/icons/ReceiptOutlined'
import ShoppingBasket from '@material-ui/icons/ShoppingBasketOutlined'
import LocalOffer from '@material-ui/icons/LocalOfferOutlined'
import Exit from '@material-ui/icons/ExitToAppOutlined'
import LocalShipping from '@material-ui/icons/LocalShippingOutlined'
import Description from '@material-ui/icons/DescriptionOutlined'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'

import { useTheme } from '@material-ui/core/styles'

import useStyles from './styles'

import Signout from '../../dialogs/Signout'
import Settings from '../../dialogs/Settings'

import Import from '../../styles/icons/import-icon'

import NavLink from '../NavLink'

import { GET_APP, TOGGLE_DRAWER, OPEN_SIGNOUT } from '../../graphql/app/gqls'
import { OPEN_SETTINGS } from '../../graphql/settings/queries'

import useWidth from '../../utils/useWidth'
import { Paths } from '../../utils/enums'

const items = (permissions) => {
  const grocery = {
    title: 'Loja',
    subitems: []
  }

  if (permissions.myStore) {
    grocery.subitems.push({
      link: Paths.store.path,
      icon: <Store />,
      title: Paths.store.label
    })
  }

  if (permissions.reports) {
    grocery.subitems.push({
      link: Paths.reports.path,
      icon: <BarChart />,
      title: Paths.reports.label
    })
  }

  if (permissions.billing) {
    grocery.subitems.push({
      link: Paths.billing.path,
      icon: <PaymentIcon />,
      title: Paths.billing.label
    })
  }

  const sales = {
    title: 'Pedidos',
    subitems: []
  }

  if (permissions.checkout) {
    sales.subitems.push({
      link: Paths.checkout.path,
      icon: <ShoppingCart />,
      title: Paths.checkout.label
    })
  }

  if (permissions.orders) {
    sales.subitems.push({
      link: Paths.orders.path,
      icon: <Receipt />,
      title: Paths.orders.label
    })
  }

  if (permissions.products) {
    sales.subitems.push({
      link: Paths.products.path,
      icon: <ShoppingBasket />,
      title: Paths.products.label
    })
  }

  // todo fix
  if (permissions.customers) {
    sales.subitems.push({
      link: Paths.customers.path,
      icon: <Group />,
      title: Paths.customers.label
    })
  }

  if (permissions.tags) {
    sales.subitems.push({
      link: Paths.tags.path,
      icon: <LocalOffer />,
      title: Paths.tags.label,
      badge: 'beta'
    })
  }

  const inventory = {
    title: 'Estoque',
    subitems: []
  }

  if (permissions.purchases) {
    inventory.subitems.push({
      link: Paths.purchases.path,
      icon: <Description />,
      title: Paths.purchases.label,
      badge: 'beta'
    })
  }

  if (permissions.purchases) {
    inventory.subitems.push({
      link: Paths.purchase.path,
      icon: <Import />,
      title: Paths.purchase.label
    })
  }

  if (permissions.suppliers) {
    inventory.subitems.push({
      link: Paths.suppliers.path,
      icon: <LocalShipping />,
      title: Paths.suppliers.label
    })
  }

  const menu = {}

  if (permissions.myStore || permissions.reports) menu.grocery = grocery

  if (permissions.checkout || permissions.orders || permissions.products || permissions.customers || permissions.tags) {
    menu.sales = sales
  }

  if (permissions.purchases || permissions.suppliers) menu.inventory = inventory

  return menu
}

const Drawer = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const width = useWidth()
  const upMedium = useMediaQuery(theme.breakpoints.up('md'))

  const {
    data: {
      app: { logged, openDrawer, grocery }
    }
  } = useQuery(GET_APP)
  const [toggleDrawer] = useMutation(TOGGLE_DRAWER)
  const [openSignout] = useMutation(OPEN_SIGNOUT)
  const [openSettings] = useMutation(OPEN_SETTINGS)

  const handleOpenDialog = (key) => async () => {
    switch (key) {
      case 'openSignout':
        openSignout()
        break
      case 'openSettings':
        openSettings()
        break
      default:
        break
    }
  }

  const handleToggleDrawer = async () => {
    toggleDrawer({ variables: { width } })
  }

  const renderList = (item) => (
    <div key={item.title}>
      <List component='nav' subheader={<ListSubheader component='div'>{item.title}</ListSubheader>}>
        {item.subitems.map(renderItem)}
      </List>
      <Divider />
    </div>
  )

  const renderItem = (subitem) => {
    const { link, icon, title, badge } = subitem
    // const { match: { path } } = props

    // const iPurchaseIdPath = path === '/purchases/:purchaseId'
    // const isPurchaseIdLink = link === '/purchases/:purchaseId'
    const hasBadge = !!badge

    // if (!isPurchaseIdLink || (isPurchaseIdLink && iPurchaseIdPath)) {
    return (
      <ListItem
        classes={{ root: classes.listItemRoot }}
        className={classes.listItem}
        key={title}
        button
        component={NavLink}
        to={link}
        activeClassName={classes.active}
        // disabled={isPurchaseIdLink && iPurchaseIdPath}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          classes={{
            root: classes.listItemTextRoot,
            primary: classes.listItemTextPrimary
          }}
          primary={
            <Badge className={classes.padding} color='secondary' badgeContent={badge} invisible={!hasBadge}>
              {title}
            </Badge>
          }
        />
      </ListItem>
    )
    // }
  }

  if (!logged) return null

  return (
    <>
      <DrawerBase
        className={classes.root}
        variant={upMedium ? 'permanent' : 'temporary'}
        open={openDrawer[width]}
        classes={{
          paper: classNames(classes.drawerPaper, {
            [classes.drawerPaperClose]: !openDrawer[width] && upMedium,
            [classes.drawerPaperOpen]: openDrawer[width] && upMedium
          })
        }}
        onClose={handleToggleDrawer}
      >
        {upMedium && <div className={classes.toolbar} />}
        <div onClick={upMedium ? null : handleToggleDrawer} onKeyDown={upMedium ? null : handleToggleDrawer}>
          {Object.values(items(grocery.permissions)).map(renderList)}
          <Divider />
          <List component='nav'>
            <ListItem
              classes={{ root: classes.listItemRoot }}
              className={classes.listItem}
              button
              onClick={handleOpenDialog('openSettings')}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  root: classes.listItemTextRoot,
                  primary: classes.listItemTextPrimary
                }}
                primary='Configurações'
              />
            </ListItem>
            <ListItem
              classes={{ root: classes.listItemRoot }}
              className={classes.listItem}
              button
              onClick={handleOpenDialog('openSignout')}
            >
              <ListItemIcon>
                <Exit />
              </ListItemIcon>
              <ListItemText
                classes={{
                  root: classes.listItemTextRoot,
                  primary: classes.listItemTextPrimary
                }}
                primary='Sair'
              />
            </ListItem>
          </List>
        </div>
      </DrawerBase>
      <Signout />
      <Settings />
    </>
  )
}

Drawer.propTypes = {
  link: PropTypes.any,
  icon: PropTypes.any,
  title: PropTypes.any,
  badge: PropTypes.any
}

export default Drawer
