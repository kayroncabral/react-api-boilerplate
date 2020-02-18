import jwt from 'jsonwebtoken'

import User from '../models/user'

export const authenticate = async (request, requireAuth = true, forceUseEmployee = false) => {
  const header = request ? request.headers.authorization : request.connection.context.Authorization

  if (header) {
    const token = header.replace('Bearer ', '')
    let decoded

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      Sentry.captureException(error)
      throw error
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      const error = new Error('User not found')
      Sentry.captureException(error)
      throw error
    }

    return decoded.userId
  }

  if (requireAuth) throw new Error('Authentication required')

  return null
}
