// 节流 -> 就是指连续触发事件但是在 n 秒中只执行一次函数。**节流会稀释函数的执行频率。

// 时间戳
function throttle(func:Function, wait:number) {
    var previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

// 定时器
function throttle1(func:Function, wait:number) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}


