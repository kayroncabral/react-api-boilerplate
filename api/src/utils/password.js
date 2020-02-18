import bcrypt from 'bcryptjs'

import { MIN_PASSWORD_LENGTH } from './constants'

export const hash = password => {
  if (password.length < MIN_PASSWORD_LENGTH) throw new Error('Senha deve ter 6 caracteres ou mais')

  return bcrypt.hash(password, 10)
}