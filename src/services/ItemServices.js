import Client from './api'

export const GetInventory = async (data) => {
  try {
    const res = await Client.get(`/api/items/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const RemoveFromInventory = async (user, item) => { 
  try {
    const res = await Client.delete(`/api/items/remove/${user}/${item}`)
    return res.data
  } catch (error) {
    throw error
  }
}

//BULK DELETE
// export const RemoveFromInventory = async (data) => { 
//   try {
// 		console.log(data)
//     const res = await Client.delete(`/api/items/remove`, data)
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }


export const AddItemToInv = async (data) => { 
  try {
    const res = await Client.put(`/api/items/update`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetShop = async () => {
  try {
    const res = await Client.get(`/api/items`)
    return res.data
  } catch (error) {
    throw error
  }
}