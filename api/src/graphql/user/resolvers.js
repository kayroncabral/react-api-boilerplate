import axios from 'axios'
import { ObjectID } from 'mongodb'

import User from '../../models/user'

import { authenticate } from '../../utils/user'
import { generateToken } from '../../utils/token'
import { hash } from '../../utils/password'

import {
  Roles
} from '../../utils/enum'

export const signinGoogleEmployer = async (parent, args, context, info) => {
  const { status, data: { aud, email, name, picture } } = await axios(`${process.env.GOOGLE_API}/oauth2/v3/tokeninfo?id_token=${args.googleIdToken}`)
  if (status === 400 || aud !== process.env.GOOGLE_CLIENT_ID) throw new Error('Error signin in google')

  let grocery = await User.findByGoogleUser(email, { name, picture })

  if (!grocery) {
    const data = {
      email,
      name,
      picture,
      role: Roles.EMPLOYER,
      permissions: {
        myStore: true,
        reports: true,
        billing: true,
        checkout: false,
        products: true,
        customers: true,
        orders: {
          create: true,
          edit: true,
          list: true,
          closeOrder: true,
          addPayment: true,
          addItem: true
        },
        tags: false,
        purchases: false,
        suppliers: false
      },
      employees: [],
      companyNumber: 1
    }

    const options = { sort: { companyNumber: -1 }, limit: 1 }
    const [lastUser] = await User.find(null, null, options)

    if (lastUser) data.companyNumber = lastUser.companyNumber + 1

    grocery = await User.create(data)
    if (!grocery) throw new Error('Erro ao criar usuário')
  }

  const authPayload = {
    token: generateToken(grocery._id),
    grocery,
  }

  return authPayload
}

export const signinGoogleEmployee = async (parent, args, context, info) => {
  const { status, data: { aud, email, name, picture } } = await axios(`${process.env.GOOGLE_API}/oauth2/v3/tokeninfo?id_token=${args.googleIdToken}`)
  if (status === 400 || aud !== process.env.GOOGLE_CLIENT_ID) throw new Error('Error signin in google')

  let grocery = await User.findByGoogleUser(email, { name, picture })
  if (!grocery) {
    const data = {
      email,
      name,
      picture,
      role: Roles.EMPLOYEE,
      permissions: {
        myStore: false,
        reports: false,
        checkout: false,
        products: false,
        customers: false,
        orders: {
          create: true,
          edit: false,
          list: false,
          closeOrder: false,
          addPayment: false,
          addItem: false
        },
        tags: false,
        purchases: false,
        suppliers: false
      }
    }

    const options = { sort: { companyNumber: -1 }, limit: 1 }
    const [lastUser] = await User.find(null, null, options)

    if (lastUser) data.companyNumber = lastUser.companyNumber + 1

    grocery = await User.create(data)
    if (!grocery) throw new Error('Erro ao criar usuário')
  }

  return {
    token: generateToken(grocery._id),
    grocery
  }
}

export const addEmployee = async (parent, args, { request }, info) => {
  const employer =  await User.findOne({ email: args.employer })

  const employee = await User.findOne({ email: args.employee, role: Roles.EMPLOYEE })

  if (!employee) throw new Error('Funcionário não está cadastrado')
  if (employee.employer) throw new Error('Funcionário já tem outro estabelecimento cadastrado')

  const hasEmployee = employer.employees && employer.employees.find((id) => id.equals(employee._id))
  if (hasEmployee) throw new Error('Funcionário já está cadastrado no estabelecimento')

  const updatedGrocery = await User.findOneAndUpdate({
    _id: new ObjectID(employer._id),
  }, {
    $push: { employees: employee._id }
  }, {
    new: true
  })

  if (!updatedGrocery) throw new Error('Usuário não encontrado')

  await employee.update({ employer: new ObjectID(employer._id) })

  return updatedGrocery
}

export const createGrocery = async (parent, args, { request }, info) => {
  const newGrocery = new User(args.data)
  const grocery = await newGrocery.save()
  if (!grocery) throw new Error('Error saving grocery')

  const authPayload = {
    token: generateToken(grocery._id),
    grocery,
  }

  return authPayload
}

export const updateMe = async (parent, args, { request }, info) => {
  const userId = await authenticate(request)

  if (args.data.password) {
    args.data.password = await hash(args.data.password)
  }

  const updatedGrocery = await User.findOneAndUpdate({
    _id: new ObjectID(userId),
  }, {
    $set: args.data
  }, {
    new: true
  })
  if (!updatedGrocery) throw new Error('Usuário não encontrado')

  return updatedGrocery
}
