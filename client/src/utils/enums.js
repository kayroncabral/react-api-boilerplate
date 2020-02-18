export const Gender = Object.freeze({
  male: {
    type: 'male',
    name: 'Masculino'
  },
  female: {
    type: 'female',
    name: 'Feminino'
  },
  others: {
    type: 'others',
    name: 'Outros'
  }
})

export const SnackbarVariations = Object.freeze({
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  refresh: 'refresh'
})

export const Paths = Object.freeze({
  home: {
    path: '/',
    label: 'Home'
  },
  wait_for_employer: {
    path: '/wait-for-employer',
    label: 'Aguardar Estabelecimento'
  }
})