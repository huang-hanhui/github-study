// 防抖 -> 就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

function fd(func: Function, delay: number) {
    let timer
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func()
        }, delay)
    }
}


function fd1(func: Function, delay: number) {
    let timer  //设置全局变量
    return function () {
        let context = this
        clearTimeout(timer)
        timer = setTimeout(function () {
            func.call(context) // 改变this指向
        }, delay)
    }
}

