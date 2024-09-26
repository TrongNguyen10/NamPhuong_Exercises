// src/components/PostList.tsx
// const [posts, setPosts] = useState<Post[]>([]);
// useEffect(() => {
//     fetchPosts().then((data) => setPosts(data));
// }, []);
import axios from 'axios'
import { postsAPI } from '../api';
import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useState } from 'react';
import ModalForm from './updateForm';

const PostsList: React.FC = () => {
    const $ = document.querySelector.bind(document)
    let titleInput: any, contentInput: any

    function initialQueryElements() {
        titleInput = $('.title-input') as HTMLTextAreaElement
        contentInput = $('.content-input') as HTMLTextAreaElement
    }
    // initial info of update form
    let formData = {
        header: '',
        order: '',
        btnText: '',
        titleValue: '',
        contentValue: '',
        postId:''
    } 
    // Show and hide modal update form
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    // Set Update form info when open 
    const [formInfo, setFormInfo] = useState(formData)
    const setInfo = (formData:any) => setFormInfo(formData)

    const [currentPage, setCurrentPage] = useState(0); // 0-based index
    const postsPerPage = 10;

    
    //#region get api useQuery and update post useMutation

    const query = useQuery({
        queryKey: ['getPosts'], queryFn: async () => {
            const response = await axios.get(postsAPI)
            return response.data
        }
    });
    const posts = query.data || []

    // Id of newPost - calc based on ordered number
    let newPostId = posts[posts.length - 1]?.id * 1 + 1

    const mutation = useMutation({
        mutationKey: ['updatePosts'], mutationFn: async ({ method, id, newPost }: { method: string, id: any, newPost: any }) => {
            switch (method.trim()) {
                case 'create':
                    return axios.post(postsAPI, newPost);
                case 'update':
                    return axios.patch(`${postsAPI}/${id}`, newPost)
                case 'delete':
                    return axios.delete(`${postsAPI}/${id}`)
            }
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

    if (query.error) { return <h2 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Request Failed</h2> }
    if (query.isLoading) { return <h2 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Loading Posts...</h2> }

    //#endregion

    //#region CRUD functionality
    const handleCreatePost = () => {
        mutation.mutate({
            method: "create",
            id: '',
            newPost: {
                "id": newPostId + '',
                "userId": posts[posts.length - 1].userId,
                "title": titleInput?.value,
                "body": contentInput?.value,
            }
        })
    }

    const handleEditPost = () => {
        mutation.mutate({
            method: "update",
            id: formInfo.postId.trim(),
            newPost: {
                "title": titleInput?.value,
                "body": contentInput?.value,
            }
        })
    }

    const handleUpdatePost = () => {
        initialQueryElements()
        if(formInfo?.btnText.includes("Create") ) {
            handleCreatePost()
        }else {
            handleEditPost()
        }
    }

    const handleDeletePost = (id: any) => {
        mutation.mutate(
            {
                method: "delete",
                id: id,
                newPost: ''
            })
    }
    //#endregion

    //#region Open update form when click create or edit 
    const openCreateBox = () => {
        formData.header = 'Create new Post'
        formData.order = `${newPostId}. Post ${newPostId}`
        formData.btnText = "Create"
        setInfo(formData)
        handleOpen()
    }
    const openEditBox = (id: any) => {
        formData.postId = id + ''
        formData.header = 'Edit Post'
        formData.order = $(`.post-${id} h2`)?.textContent?.trim() + ''
        formData.titleValue = ($(`.post-${id} .post-title`) as HTMLElement)?.innerText.trim()
        formData.contentValue = ($(`.post-${id} .post-content`) as HTMLElement)?.innerText.trim()
        formData.btnText = "Update"
        setInfo(formData)
        handleOpen()
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
        <>
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
            </div>
            <ModalForm open={open} onClose={handleClose} onUpdate={handleUpdatePost} formInfo={formInfo}/>
        </>
    );
};
export default PostsList;
