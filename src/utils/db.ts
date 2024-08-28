import mongoose from 'mongoose'

export const connect = async (): Promise<mongoose.Mongoose> => await mongoose.connect(process.env.MONGO_URI ?? '')
