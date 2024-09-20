// src/api.ts
import axios from 'axios'
export const postsAPI = 'http://localhost:3000/posts'
export async function fetchPosts() {
    const response = await axios.get(postsAPI)
    return response.data
}

