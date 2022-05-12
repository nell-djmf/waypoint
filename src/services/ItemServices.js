import Client from './api'

export const GetInventory = async (data) => {
  
  try {
    const res = await Client.get(`/api/items/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteItem = async (user, item) => {
  
  try {
    const res = await Client.delete(`/api/items/remove/${user}/${item}`)
    return res.data
  } catch (error) {
    throw error
  }
}