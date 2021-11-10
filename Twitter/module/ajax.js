import { getRandomInt, guidGenerator } from "./helpers.js";
import { displayPosts } from "./posts.js";
import { currentUser, CreateUser } from "./users.js";


const baseUrl = 'https://twitter-info-72023-default-rtdb.firebaseio.com/';
const ext = '.json';



//user input username and email
export function loginUser(callback) {
    $.get({
        url: `${baseUrl}users${ext}`,
        
        success: (response) => {
            const $username = $("[name='username']").val();
            const $email = $("[name='email']").val();
            const allUsers = response.filter((user) => !!user);
            const user = allUsers.find(user => user.username === $username && user.email === $email);
           

            if(user) {
                callback(user);
                getPosts(displayPosts);
                $(".main_container").css("display", "grid");
                $("#main-feed").css("display", "flex");
                $(".login_container").hide();

            } else {
                alert("User is not found");
            }
        }
    })
}

export function signupUser() {
    let $fullname = $("[name='fullname']").val();
    let $username = $("[name='username']").val();
    let $email = $("[name='email']").val();
    const newUser = guidGenerator();
    [newUser] = CreateUser(  $fullname,  $username,  $email, newUser);
    console.log([newUser]);
    $.ajax({
        type: "PATCH",
        url: `${baseUrl}users${ext}`,
        data: JSON.stringify(newUser),

        success: (response) => {
            if(newUser) {
                callback(newUser);
                getPosts(displayPosts);
                $(".main_container").css("display", "grid");
                $("#main-feed").css("display", "flex");
                $(".signUp_container").hide();
            }
        },
        error: err => console.log(err)
    })
    
};

export function getPosts(callback = console.log) {
    $.get({
     url: `${baseUrl}posts${ext}`,
     success: (res) => {
        let keys = Object.keys(res);
        let posts = keys.map(key => { 
             return res[key];
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
        callback(posts);
    },
    error: (err) => {
        console.log(err)
    }

    })
};
export function getUser(userId, callback = console.log, postId) {
    $.get({
        url: `${baseUrl}users/${userId}${ext}`,
        success: user => {
            callback(user, postId);
        },
        error: err => console.log(err)
    })
}

export function createPost(callback = console.log) {
    const newId = guidGenerator();
    const newPost = {
        [newId]: {
            body: $("#post-text").val(),
            date: new Date(),
            userId: currentUser.id,
            likes: getRandomInt(1, 100),
            comments: getRandomInt(1, 25),
            id: newId
        }
    };

    $.ajax({
        type: "PATCH",
        url: `${baseUrl}posts${ext}`,
        data: JSON.stringify(newPost),
        
        success: () => {
            getPosts(callback);
            $("#post-text").val("");
        },
        error: err => console.log(err)
    })
};

export function deletePost(postId) {
    $.ajax({
        type: "DELETE",
        url: `${baseUrl}posts/${postId}${ext}`,
        success: () => {
            getPosts(displayPosts)
        },
        error: err => console.log(err)
    })
};

export function updatePost(postId, editedText) {
    const editedPost = {
        body: editedText,
        date: new Date()
    }
    $.ajax({
        type: "PATCH",
        url: `${baseUrl}posts/${postId}${ext}`,
        data: JSON.stringify(editedPost),
        success: () => {
            getPosts(displayPosts);
            
        },
        error: err => console.log(err)
    })
}