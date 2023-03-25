// import { doc } from 'firebase/firestore';

export const setupPosts = (data) => {
  if (data.length) {
    let html = '';
    data.forEach((doc) => {
      const post = doc.data();
      console.log(post);
      const section = `
        <article class="post-box">
          <section class="user-box">
            <aside class="info">
                <figure class="profile-postbox">
                <img src="./images/profilepic.jpg" alt="profile pic">
                </figure>
              <aside class="auto-layout">
                <p class="username-post"> dpretswellh </p>
                <p class="date-post"> 12/03/23 </p>
              </aside>
            </aside>
            <aside class="options-post">
              <button id="option" <img src="./images/3 dots.png" alt="three dots"></button>
              <button class='btn-delete' data-id="${doc.id}">Delete</button>
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
            <figure class="item">
              <img src="./images/like.png" alt="" class="icon-post">
              <p class="count">156</p>
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
