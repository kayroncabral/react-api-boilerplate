import { ObjectID } from 'mongodb'

import User from '../../models/user'

import { authenticate } from '../../utils/user'
import { generateToken } from '../../utils/token'
import { hash } from '../../utils/password'

export const me = async (parent, args, { request }, info) => {
  const userId = await authenticate(request, true, true)

  const me = await User.findById(userId)
  if (!me) throw new Error('User not found')

  return me
}

export const user = async (parent, { id }, { request }, info) => {
  await authenticate(request)

  if (!ObjectID.isValid(id)) throw new Error('Usuário não encontado')

  const user = await User.findById(id)
  if (!user) throw new Error('Usuário não encontado')

  return user
}

export const createUser = async (parent, { input }, { request }, info) => {
  const user = await new User(input)
  if (!user) throw new Error('Unable to save user')

  const authPayload = {
    token: generateToken(user._id),
    user,
  }

  return authPayload
}

export const updateMe = async (parent, { input }, { request }, info) => {
  const userId = await authenticate(request)

  if (args.data.password) {
    input.password = await hash(input.password)
  }

  const conditions = { _id: new ObjectID(userId) }
  const update = { $set: input }
  const options = { new: true }
  const updatedUser = await User.findOneAndUpdate(conditions, update, options)
  if (!updatedUser) throw new Error('User not found')

  return updatedUser
}
