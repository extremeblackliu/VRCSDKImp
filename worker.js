export default {
 async fetch(request, env) {
   const url = new URL(request.url);
   url.host = "api.vrchat.cloud"; 
   return await fetch(url, {
     headers: request.headers,
     method: request.method,
     body: (request.method !== 'GET' ? request.body : null),
     redirect: 'follow'
   });
}}