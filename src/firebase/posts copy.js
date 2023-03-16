// // cremos esta condicional donde decimos que si existen datos los recorremos

// import { doc } from 'firebase/firestore';

// export function posts() {
//   const article = document.createElement('article');
//   const section = document.createElement('section');
//   section.innerHTML = `
//     <aside class='aside'>
//       <ul class= "posts"> </ul>
//     </aside>
//   </nav>
//     `;

//   article.append(section);
//   return article;
// }

// export const setupPosts = (data) => {
//   if (data.length) {
//     let html = '';
//     data.forEach((doc) => {
//       console.log(doc);
//       const post = doc.data();
//       console.log(post);
//       const li = `
//       <li>
//       <h5> ${post.title} </h5>
//       <p> ${post.content} </p>
//       </li>
//       `;
//       html += li;
//     });
//     return html;
//   }
//   posts.innerHTML = '<p> Post vacio </p>';
//   console.log('no posts');
// };

// export function posts(arrPosts) {
//     let htmlPost = '';
//     arrPosts.forEach((element) => {
//       htmlPost += `
//           <p> ${element.texto} </p>
//           `;
//     });
//     return htmlPost;
//   }
