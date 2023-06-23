// async  Promise 语法糖  在函数前添加async返回的是promise对象    ----- async 类似 Promise.resolve
const fn = async ():Promise<string>=>{
    return "success"
    // return Promise.resolve("success1")
}
console.log(fn().then((value)=>{
    console.log(value)
}))

// await 必须与 async 配合使用  异步代码的同步写法
// await 会自动阻塞代码，等 await 代码的结果返回后才之后下面的代码 
const gn = async ()=>{
    let res = await "res success"
    console.log(res)
    console.log(123)
}













