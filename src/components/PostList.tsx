// src/components/PostList.tsx
import React, { useState, useEffect } from 'react';
import { fetchPosts, Post } from '../api'; // Import kiểu dữ liệu Post

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(0); // 0-based index
    const postsPerPage = 10;

    useEffect(() => {
        fetchPosts().then((data) => setPosts(data));
    }, []);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const turnOnLightMode = () => {
        document.querySelector('#root')?.classList.add('light')
    }
    const turnOffLightMode = () => {
        document.querySelector('#root')?.classList.remove('light')
    }

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const offset = currentPage * postsPerPage;
    const currentPosts = posts.slice(offset, offset + postsPerPage);
    return (
        <div className='container'>
            <div className='header'>
                <h1>Posts</h1>
                <div className='header-btn'>
                    <button onClick={turnOnLightMode}><i className="fa-regular fa-sun"></i></button>
                    <button onClick={turnOffLightMode}><i className="fa-regular fa-moon"></i></button>
                </div>
            </div>
            <div className='post-list'>
                {/* Hiển thị danh sách bài viết */}
                {currentPosts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.id}. Post {post.id}</h2>
                        <h3>Title: {post.title}</h3>
                        <p><b>Content: </b>{post.body}</p>
                    </div>
                ))}
            </div>
            {/* Hiển thị phân trang ngang */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <span>{`Trang ${currentPage + 1} / ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostList;
