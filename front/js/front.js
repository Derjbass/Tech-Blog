const updatePost = document.getElementById('clickDiv')

updatePost.addEventListener('click', async event => {
    let dataset = event.target.parentElement.dataset
    console.log(dataset.id);
    await getBlogToUpdate(dataset.id);
})

async function getBlogToUpdate(id){ 
    let request = await axios.get(`/update/${id}`);    
    console.log(request.data);
    await axios.post(`/new_post/update/${id}`, {
        update: true
    });
}