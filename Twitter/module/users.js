export let currentUser = {};

export class CreateUser {
    constructor(fullname, username, email) {
        this.fullname = fullname;
        this.email = email;
        this.username = username;
    }
};

export function displayUserOnPost(user, postId) {
    
    $(`#username${postId}`).html(`@${user.username}`);
}

export function saveUser(user) {
    currentUser = user;
    
};