import Client from './api'

export const GetUsers = async () => {
  try {
    const res = await Client.get(`/api/users`)
    return res.data
  } catch (error) {
    throw error
  }
}