import Client from './api'

export const GetQuests = async (data) => {
  try {
    const res = await Client.get(`/api/quests/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}