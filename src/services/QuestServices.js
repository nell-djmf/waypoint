import Client from './api'

export const GetQuests = async (data) => {
  try {
    const res = await Client.get(`/api/quests/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const NewQuest = async (data) => {
  try {
    const res = await Client.post(`/api/quests/new`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteQuest = async (data) => {
  try {
    const res = await Client.delete(`/api/quests/delete/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const EditQuest = async (id, data) => {
  try {
    const res = await Client.put(`/api/quests/update/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}