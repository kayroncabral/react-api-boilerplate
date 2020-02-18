import mongoose, { ObjectId, Mixed } from '../db/mongoose'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `${props.value} não é um e-mail válido.`
      }
    },
    password: {
      type: String,
      minlength: 6,
      select: false
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    cnpj: String,
    description: {
      type: String,
      trim: true
    },
    cpf: String,
  },
  {
    timestamps: true
  }
)

UserSchema.statics.findByCredentials = function({ email, password }) {
  const User = this

  return User.findOne({ email }, { email: 1, password: 1, name: 1, cnpj: 1, description: 1 }).then((user) => {
    if (!user) return Promise.resolve(user)

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          user.password = undefined
          resolve(user)
        } else {
          reject(err)
        }
      })
    })
  })
}

UserSchema.index({ email: 1 }, { unique: true, name: 'email_' })

export default mongoose.model('User', UserSchema)
