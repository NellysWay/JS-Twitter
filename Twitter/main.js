import { currentUser, saveUser } from './module/users.js';
import {createPost, loginUser } from './module/ajax.js';
import { displayPosts } from './module/posts.js';



(function(){

    $("#logbtn").click(() =>  $(".home_container").hide());
    $("#logbtn").click(() =>  $(".login_container").show());
    

    $("#signup-btn").click(() => $(".home_container").hide());
    $("#signup-btn").click(() => $(".signUp_container").show());


    $("#login-btn").click(() => loginUser(saveUser));
    $("#login-btn").click(() => $(".main_container").show());
    

    $("#post-btn").click(() => createPost(displayPosts));
    $("#post-btn").click(() => $(".main_container").show());

    
    $("#logout-btn").click(() => $(".home_container").show());
    $("#logout-btn").click(() => $(".main_container").hide());

     
})();
