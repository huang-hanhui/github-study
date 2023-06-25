// 原理
// 用户在第三方网站点击 Github授权登录 后，浏览器跳转到 Github 登录页面。
// 用户在 Github 登录成功后，浏览器重定向回第三方网站。此时浏览器会携带一个 code。
// 第三方网站服务器通过 code 向 Github 索取 token。
// Github 返回 token。
// 第三方网站服务器收到 token 后，就可以通过 token 获取用户信息了。
