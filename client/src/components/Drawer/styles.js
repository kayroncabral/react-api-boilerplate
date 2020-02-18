import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 260

const useStyles = makeStyles((theme) => ({
  root: {
    '@media print': {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    borderRight: 'unset',
    overflowX: 'hidden'
  },
  drawerPaperOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    width: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: theme.mixins.toolbar,
  listItemRoot: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  listItem: {
    borderTopRightRadius: theme.spacing(3),
    borderBottomRightRadius: theme.spacing(3)
  },
  listItemTextRoot: {
    padding: 0
  },
  listItemTextPrimary: {
    fontWeight: 500
  },
  active: {
    backgroundColor: theme.palette.action.selected
  },
  padding: {
    paddingRight: theme.spacing(2)
  }
}))

export default useStyles
