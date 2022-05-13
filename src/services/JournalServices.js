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

export const DeleteEntry = async (data) => {
  try {
    const res = await Client.delete(`/api/entries/delete/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const EditEntry = async (id, data) => {
  try {
    const res = await Client.put(`/api/entries/update/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}