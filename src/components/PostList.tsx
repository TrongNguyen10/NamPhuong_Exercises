// src/components/PostList.tsx
// const [posts, setPosts] = useState<Post[]>([]);
// useEffect(() => {
//     fetchPosts().then((data) => setPosts(data));
// }, []);
import axios from 'axios'
import { fetchPosts, postsAPI } from '../api'; // Import hooks from api
import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useState } from 'react';

const PostList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0); // 0-based index
    const postsPerPage = 10;

    const $ = document.querySelector.bind(document)
    let modalLayout: any, boxHeader: any, postOrder: any, titleInput: any, contentInput: any, createBtn: any, updateBtn: any, postId: any

    function initialQueryElements() {
        modalLayout = $('.modal-layout')
        boxHeader = $('.update-box_header h3')
        postOrder = $('.update-box_body h2')
        titleInput = $('#title-input') as HTMLTextAreaElement
        contentInput = $('#content-input') as HTMLTextAreaElement
        createBtn = $('.create-btn')
        updateBtn = $('.update-btn')
        postId = $('.update-box_body #post-id')
    }

    //#region get api useQuery and update post useMutation

    const query = useQuery({ queryKey: ['getPosts'], queryFn: fetchPosts });
    const posts = query.data || []

    let newPostId = posts[posts.length - 1]?.id * 1 + 1

    const mutation = useMutation({
        mutationKey: ['updatePosts'], mutationFn: ({ type, id, newPost }: { type: string, id: any, newPost: any }) => {
            return Promise.resolve(updateMethods(type, id, newPost))
        }
        , onSuccess: () => {
            alert('Successfully updated')
        }, onError: () => {
            alert('Failed to update')
        },
        onSettled: () => {
            query.refetch()
        }
    })

    const updateMethods = (type: string, id: any, newPost: any) => {
        switch (type.trim()) {
            case 'create':
                return axios.post(postsAPI, newPost);
            case 'update':
                return axios.patch(`${postsAPI}/${id}`, newPost)
            case 'delete':
                return axios.delete(`${postsAPI}/${id}`)
        }
    }
    if (query.error) { return <h2 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Request Failed</h2> }
    if (query.isLoading) { return <h2 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Loading Posts...</h2> }

    //#endregion

    //#region CRUD functionality
    const handleCreatePost = () => {
        mutation.mutate({
            type: "create",
            id: '',
            newPost: {
                "id": newPostId + '',
                "userId": posts[posts.length - 1].userId,
                "title": titleInput.value,
                "body": contentInput.value,
            }
        })
        modalLayout?.setAttribute('style', 'display: null')
    }

    const handleUpdatePost = () => {
        mutation.mutate({
            type: "update",
            id: postId.textContent.trim(),
            newPost: {
                "title": titleInput.value,
                "body": contentInput.value,
            }
        })
        modalLayout?.setAttribute('style', 'display: null')
    }

    const handleDeletePost = (id: any) => {
        mutation.mutate(
            {
                type: "delete",
                id: id,
                newPost: ''
            })
    }
    //#endregion

    //#region Open edit form when click create or edit 
    const openCreateBox = () => {
        initialQueryElements()
        modalLayout?.setAttribute('style', 'display: flex')
        if (boxHeader) boxHeader.textContent = 'Create new Post'
        if (postOrder) postOrder.textContent = `${newPostId}. Post ${newPostId}`
        updateBtn?.classList.add('hide')
        createBtn?.classList.remove('hide')
    }
    const openEditBox = (id: any) => {
        initialQueryElements()
        modalLayout?.setAttribute('style', 'display: flex')
        if (postId) postId.textContent = id
        if (boxHeader) boxHeader.textContent = 'Edit Post'
        if (postOrder) postOrder.textContent = $(`.post-${id} h2`)?.textContent?.trim()
        if (titleInput) titleInput.value = ($(`.post-${id} .post-title`) as HTMLElement)?.innerText.trim()
        if (contentInput) contentInput.value = ($(`.post-${id} .post-content`) as HTMLElement)?.innerText.trim()
        createBtn?.classList.add('hide')
        updateBtn?.classList.remove('hide')
    }
    //#endregion

    //#region pagination buttons
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    //#endregion pagination buttons

    // close modal layout
    const handleModalLayout = (e: any) => {
        if (e.target.matches('.close-btn') || e.target.matches('.modal-layout')) {
            modalLayout?.setAttribute('style', 'display: null')
        }
    }

    // Dark mode
    const switchMode = () => {
        $('body')?.classList.toggle('light')
        $('#switch-btn i')?.classList.toggle('fa-moon')
        let mode = $('.header label')
        if (mode) {
            mode.textContent = mode.textContent == 'Light Mode' ? 'Dark Mode' : 'Light Mode'
        }
    }

    // Array of 10 posts to render on 1 page
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const offset = currentPage * postsPerPage;
    const currentPosts = posts.slice(offset, offset + postsPerPage);

    return (
        <div className='container'>
            <div className='header'>
                <button onClick={openCreateBox} className='create'>Create post</button>
                <h1>Posts</h1>
                <div>
                    <label htmlFor='switch-btn'>Light Mode</label>
                    <button id='switch-btn' onClick={switchMode}><i className="fa-regular fa-sun"></i></button>
                </div>
            </div>
            <div className='post-list'>
                {/* Hiển thị danh sách bài viết */}
                {currentPosts.map((post: any) => (
                    <div className={`post post-${post.id}`} key={post.id}>
                        <h2>{post.id}. Post {post.id}</h2>
                        <div style={{ fontSize: '20px' }}>
                            <b>Title: </b><h4 className='post-title' style={{ display: 'inline' }}>{post.title}</h4>
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <b>Content: </b><p className='post-content' style={{ display: 'inline' }}>{post.body}</p>
                        </div>
                        <button onClick={() => openEditBox(post.id)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
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
            {/* Hiển thị box thêm và chỉnh sửa */}
            <div onClick={handleModalLayout} className='modal-layout'>
                <div className='update-box'>
                    <header className='update-box_header'>
                        <h3></h3>
                        <i className="close-btn fa-solid fa-xmark"></i>
                    </header>

                    <div className='update-box_body'>
                        <h2></h2>
                        <p id='post-id' style={{ display: 'none' }}></p>
                        <div className='update-title'>
                            <h3>Title:</h3>
                            <textarea name="title" id="title-input" cols={30} rows={10}></textarea>
                        </div>
                        <div className='update-content'>
                            <h3>Content:</h3>
                            <textarea name="content" id="content-input" cols={30} rows={10}></textarea>
                        </div>
                    </div>

                    <div className='update-box_footer'>
                        <button onClick={handleCreatePost} className='create-btn'>Create</button>
                        <button onClick={handleUpdatePost} className='update-btn'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PostList;