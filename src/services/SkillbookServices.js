import Client from './api'

export const GetUsers = async () => {
  try {
    const res = await Client.get(`/api/skills`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateSkillbook = async (data) => {
  try {
    const res = await Client.post(`/api/skills/find/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateSkillbook = async (id, data) => {
  try {
    const res = await Client.put(`/api/skills/update/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}