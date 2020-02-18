import isEmail from 'validator/lib/isEmail'

const isCPF = (value) => /\d{11}$/.test(value) && value.length === 11

export { isEmail, isCPF }
