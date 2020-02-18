import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    '@media print': {
      display: 'none'
    }
  },
  appBarShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: 236
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: theme.spacing(0.5)
  },
  icon: {
    fontSize: 40,
    marginRight: theme.spacing(0.5)
  },
  title: {
    marginLeft: theme.spacing(1),
    flex: 1
  }
}))

export default useStyles
