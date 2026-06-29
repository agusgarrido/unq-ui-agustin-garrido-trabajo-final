import axios from 'axios'

const api = axios.create({
  baseURL: 'https://word-api-hmlg.vercel.app',
})

export async function validateWord(word: string): Promise<boolean> {
  const { data } = await api.get('/api/validate', {
    params: { word },
  })
  return data.exists === true
}