// import { doc } from 'firebase/firestore';

// export const setupPosts = (data) => {
//   if (data.length) {
//     let html = '';
//     data.forEach((doc) => {
//       console.log(doc);
//       const post = doc.data();
//       console.log(post);
//       const section = `
//         <article class="post-box">
//         <section class="user-box">
//           <aside class="info">
//               <figure class="profile-postbox">
//               <img src="./images/profilepic.jpg" alt="profile pic">
//               </figure>
//             <aside class="auto-layout">
//               <p class="username-post"> dpretswellh </p>
//               <p class="date-post"> 12/03/23 </p>
//             </aside>
//           </aside>
//           <aside class="options-post">
//             <img data-id='${post.id}' src="./images/3 dots.png" alt="three dots">
//           </aside>
//         </section>

//         <section class="card">
//           <figure class="photo-post">
//             <img src="./images/profilepic.jpg" alt="post" class="img-post">
//           </figure>
//           <section class="description-box">
//             <p class="pp">${post.content}</p>
//             <p class="pp">${post.title}</p>
//           </section>
//         </section>

//         <section class="interaction-box">
//           <figure class="item">
//             <img src="./images/like.png" alt="" class="icon-post">
//             <p class="count">156</p>
//           </figure>
//           <figure class="item">
//             <img src="./images/comment.png" alt="" class="icon-post">
//             <p class="count">13</p>
//           </figure>
//           <figure class="item">
//             <img src="./images/bucket.png" alt="" class="icon-post">
//           </figure>
//           <figure class="item">
//             <img src="./images/share.png" alt="" class="icon-post">
//           </figure>
//         </section>
//       </article>
//               `;
//       html += section;
//     });
//     return html;
//   }
//   console.log('no posts');
// };

export const setupPosts = (data) => {
  if (data.length) {
    let html = '';
    data.forEach((doc) => {
      console.log(doc);
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
            <img data-id='${post.id}' src="./images/3 dots.png" alt="three dots">
          </aside>
        </section>

        <section class="card">
          <figure class="photo-post">
            <img src="./images/profilepic.jpg" alt="post" class="img-post">
          </figure>
          <section class="description-box">
            <p class="pp">${post.content}</p>
            <p class="pp">${post.title}</p>
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
  }
  console.log('no posts');
};
