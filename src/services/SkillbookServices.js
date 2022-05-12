import Client from './api'

export const CreateSkillbook = async (data) => {
  
  try {
    const res = await Client.post(`/api/skills/find/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}