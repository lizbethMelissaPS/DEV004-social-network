// import { doc } from 'firebase/firestore';
import { updateTask } from '../firebase/firestore.js';

// eslint-disable-next-line consistent-return
export const setupPosts = (data, user) => {
  if (data.length || user.length) {
    let html = '';
    data.forEach((doc) => {
      // const userA = currentUser();
      const post = doc.data();
      // const likeCounter = post.likes;
      const section = `
        <article class="post-box">
          <section class="user-box">
            <aside class="info">
                <figure class="profile-postbox">
                <img src="${post.photo}" alt="profile pic">
                </figure>
              <aside class="auto-layout">
                <p class="username-post"> ${post.name} </p>
                <p class="date-post"> ${post.date} </p>
              </aside>
            </aside>
            <aside class="options-post">
              <button class='btn-delete' data-id="${doc.id}">
                delete
              </button>
          </section>
          <section class="card">
            <figure class="photo-post">
              <img src="${post.img}" alt="post" class="img-post">
            </figure>
            <section class="description-box">
              <p class="pp">${post.description}</p>
              <p class="pp">${post.location}</p>
            </section>  
          </section>
          <section class="interaction-box">
            <figure class=" item">
            <img id="like" src="./images/like-icon.svg" alt="" class="icon-post">
              <p class="count"> 156</p>
            </figure>
            <figure class="item">
              <img src="./images/comment.png" alt="" class="icon-post">
              <p class="count">13</p>
            </figure>
            <figure class="item">
              <img src="./images/bucket.png" alt="" class="icon-post">
            </figure>
            <figure class="item">
              <img src="./images/share.png" alt="" class="icon-post">
            </figure>
          </section>
        </article>
              `;
      html += section;
    });

    return html;
    //   posts.innerHTML = html;
  }
  // posts.innerHTML = '<p> Post vacio </p>';
  console.log('no posts');
};

// <img src="./images/like.png" alt="" class="icon-post">
