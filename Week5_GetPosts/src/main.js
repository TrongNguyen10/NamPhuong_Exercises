const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const postsContainer = document.getElementById('posts');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumberSpan = document.getElementById('page-number');

let currentPage = 1;
const postsPerPage = 10;
let totalPage;
async function fetchPosts(page) {
    const response = await fetch(`${apiUrl}?_page=${page}&_limit=${postsPerPage}`);
    const posts = await response.json();
    totalPage = posts.length
    return posts;
}

function renderPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.id}. Post ${post.id}</h2>
            <h2>Title: ${post.title}</h2>
            <p><b>Content:</b> ${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

async function updatePosts() {
    const posts = await fetchPosts(currentPage);
    renderPosts(posts);
    pageNumberSpan.textContent = `${currentPage} / ${totalPage}`;
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePosts();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < totalPage) {
        currentPage++;
        updatePosts();
    }
});

// Load First Page
updatePosts();
