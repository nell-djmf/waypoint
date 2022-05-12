import Client from './api'

export const GetInventory = async (data) => {
  
  try {
    const res = await Client.get(`/api/items/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}