// const updatePost = document.getElementById('clickDivUpdate');
// const commentPost = document.getElementById('clickDivComment');

// if(updatePost){
//     updatePost.addEventListener('click', async event => {
//         let dataset = event.target.parentElement.dataset
//         console.log(dataset.id);
//         await getBlogToUpdate(dataset.id);
//     });
// }

// if(commentPost){
//     commentPost.addEventListener('click', async event => {
//         let dataset = event.target.parentElement.dataset;
//         console.log(dataset.id);
//         await getBlogToComment(dataset.id);
//     })
// }

// async function getBlogToUpdate(id){ 
//     // let request = await axios.get(`/update/${id}`);    
//     // console.log(request.data);
//     if(id){
//         let req = await axios.post(`/new_post/update/${id}`, {
//             update: true
//         });
//         await updateRoute();
//     }
    
// }
// //front end redirect
// async function updateRoute(){
//     console.log("changeWindow called");
//     window.location.replace = '/update';
// }

// async function getBlogToComment(id){
//     let blogToComment;
    // if(id){
    //     blogToComment = await axios.get(`/comment/${id}`);
    //     console.log(blogToComment);
    // };
    // if(blogToComment){
    //     console.log(JSON.stringify(blogToComment));
    //     let payload = JSON.stringify(blogToComment)
    //     try {
    //         await axios.post(`/new_post/comment`, payload)
    //     } catch (error) {
    //         console.log(error.response.data);
    //     }
    // }

    // if(id){
    //     axios.get(`/comment/${id}`)
    //         .then(data => {
    //             console.log(data.data);
    //             let payload = data.data
    //             try {
    //                 axios.get(`/new_post/comment`, payload)
    //             } catch (error) {
    //                 console.log(error.response);
    //             }
                
    //         })
    // }
    // await commentRoute();
// }

// async function commentRoute(){
//     window.location.replace = '/comment'
// }