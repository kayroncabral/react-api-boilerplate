import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      background: 'url(images/background.jpg)',
      backgroundSize: 'cover',
    },
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  box: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    borderRadius: 0,
    background: '#fff',
    textAlign: 'center',
    zIndex: theme.zIndex.drawer,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(55),
      height: 'auto',
      borderRadius: theme.spacing(1),
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  googleButton: {
    backgroundColor: '#fff',
    '&:hover': { backgroundColor: '#f5f5f5' },
    maxWidth: theme.spacing(45),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(34),
    },
  },
})

export default withStyles(styles)
