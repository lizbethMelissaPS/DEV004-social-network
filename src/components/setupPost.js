export const setupPosts = (data, user) => {
  let html = '';
  data.forEach((doc) => {
    const post = doc.data();
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
              ${post.email === user.email ? `<button class='btn-delete btn-post' data-id="${doc.id}">
                ...
              </button>` : ''} 
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
              <img data-id="${doc.id}" src="./images/like-icon.svg" alt="" class="icon-like">
              <p class="count">${post.like}</p>
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
};
