import Client from './api'

export const GetAchievements = async (data) => {
  try {
    const res = await Client.get(`/api/milestones/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}