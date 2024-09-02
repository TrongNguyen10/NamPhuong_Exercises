// src/api.ts
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  }
  