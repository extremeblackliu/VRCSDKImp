# 不信任我？来教你搭建一个自己的代理

注意：本文仅介绍目前本库中使用的反向代理的办法，并不代表只能通过这种办法来达到反向代理的目的。本文仅限于高级用户，如果您在尝试本文中的步骤时遇到您无法解决的困难，我无法提供帮助。

本文将介绍使用 Cloudflare Worker 来搭建反向代理，唯一使用到的源代码位于 [这里](https://github.com/extremeblackliu/VRCSDKImp/blob/main/worker.js)

### 要求

- Cloudflare 账号。
- 在自己的 Cloudflare 账号中有一个自己的域名，这是因为 worker.dev 被墙了，你必须要有一个自己的域名。
- [dnSpy](https://github.com/dnSpyEx/dnSpy) 用于反编译，修改 VRCSDK 中的请求地址。

没有cloudflare账号的我就不教怎么注册账号了，访问 https://dash.cloudflare.com 按照页面指引注册就可以。

如果有cloudflare账号的直接用上面的链接登录就行了

# 创建 Worker

登录之后会在主页，点击 Worker 和 Pages

![](https://i0.hdslb.com/bfs/new_dyn/4365f494a3d06913e2d9bd878bc8150d182460046.png)

然后点击 创建应用程序

![](https://i0.hdslb.com/bfs/new_dyn/c40d86cd4ab0b0d6b6dd03115475d61e182460046.png)

然后到这个页面，默认就是Worker 然后点创建 Worker

![](https://i0.hdslb.com/bfs/new_dyn/f626357c357cdc9b3c75a4dbe163d0ee182460046.png)

然后会要求你为项目命名，随便写一个就行，或者你喜欢填什么就填什么，为了方便记忆你可以写个 vrcproxy 之类的

![](https://i0.hdslb.com/bfs/new_dyn/00484f8c1f0407ed4d6a7fae296092cb182460046.png)

接着点保存，如果保存的时候说什么名字被占用了就换一个，保存之后多出一个框，不用管，直接点完成

![](https://i0.hdslb.com/bfs/new_dyn/d8c75f7d963f2e9e7f84381a96fa8da1182460046.png)

接下来点编辑代码

![](https://i0.hdslb.com/bfs/new_dyn/86ff31f086ce328c68b4e0dbd3b40a86182460046.png)

然后按图片操作

![](https://i0.hdslb.com/bfs/new_dyn/23fff42de403be426c2d6c00b4107b8a182460046.png)

```js
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
```


然后部署

![](https://i0.hdslb.com/bfs/new_dyn/43e6143538a108859cba2f9d357d0645182460046.png)

保存并部署之后，点左上角 ← 退回去

![](https://i0.hdslb.com/bfs/new_dyn/04d1998b233afca04b490c2da39a24e4182460046.png)

退回来之后，我们要设置绑定的域名了

![](https://i0.hdslb.com/bfs/new_dyn/9ca5046bf70bbdbf1a5077be50fb43f6182460046.png)

然后填入你在cloudflare中托管的域名

![](https://i0.hdslb.com/bfs/new_dyn/67ffa1ae9deef277fc43fa3117297d4d182460046.png)

此时，访问 `https://你绑定的域名/api/1/config`

![](https://i0.hdslb.com/bfs/new_dyn/fb7b110382a42b3e4558cbf7a55e821e182460046.png)

对于其它浏览器可能看到的格式不一样，但是只要有数据返回基本上是没有问题的。

# VRCSDK 修改

明天再加







