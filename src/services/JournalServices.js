import Client from './api'

export const GetEntries = async (data) => {
  try {
    const res = await Client.get(`/api/entries/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const NewEntry = async (data) => {
  try {
    const res = await Client.post(`/api/entries/new`, data)
    return res.data
  } catch (error) {
    throw error
  }
}