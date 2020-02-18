import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

const Mixed = mongoose.Schema.Types.Mixed

mongoose.Promise = global.Promise

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}

if (process.env.NODE_ENV === 'development') options.replicaSet = 'rs0'

mongoose.connect(process.env.MONGODB_HOST, options)

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected!')
})

mongoose.connection.on('error', error => {
  console.log('Mongoose error!')
  console.log(error)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected!')
})

ObjectId.prototype.valueOf = function () {
	return this.toString()
}

export {
  mongoose as default,
  ObjectId,
  Mixed,
}
