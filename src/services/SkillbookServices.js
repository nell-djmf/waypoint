import Client from './api'

export const GetUser = async (data) => {
  try {
    const res = await Client.get(`/api/skills/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateSkillbook = async (data) => {
  
  try {
    const res = await Client.post('/api/skills/new', data)
    return res.data
  } catch (error) {
    throw error
  }
}