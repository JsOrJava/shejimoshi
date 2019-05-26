class Inferface {
    constructor (name) {
        this.name = name
    }
}
// 定义发布者
class Pubish extends Inferface {
    constructor (name, age) {
        super(name)
        this.list = [] // 缓存列表 存放订阅者回调函数
    }
    // 增加订阅者 = 都会接受到
    _listener (key, fn) {
        this.list.push(fn) // todo 这里假如多次添加相同的fn是不是会重复发布
    }
    // 发布消息 = 都会接受到
    _trigger = function(){
        for(var i = 0,fn; fn = this.list[i++];) {
            fn.apply(this,arguments); 
        }
    }
    // 们看到订阅者接收到发布者的每个消息，但是呢，对于小红来说，她只想接收颜色为红色的消息
    // ，不想接收颜色为黑色的消息，为此我们需要对代码进行如下改造下，我们可以先增加一个key，
    // 使订阅者只订阅自己感兴趣的消息。
    listener (key, fn) {
        if (!this.list[key]) {
            // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
            this.list[key] = []
        }
        // 订阅消息添加到缓存列表
        this.list[key].push(fn) // todo 这里假如多次添加相同的fn是不是会重复发布
    }
    // 发布消息
    trigger () {
        const key = Array.prototype.shift.call(arguments) // 取出消息类型名称
        const fns = this.list[key] // 取出该消息对应的回调函数的集合
        // 如果没有订阅过该消息的话，则返回
        if (!fns || fns.length === 0) {
            return
        }
        for (let i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
    // 取消订阅
    remove (key, fn) {
        let fns = this.list[key]
        // 如果对应的消息没人订阅，直接返回
        if (!fns) {
            return
        }
        // 如果没有传入回调函数，表示取消key对应消息的所有订阅
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (let l = fns.length - 1; l >= 0; l--) {
                let _fn = fns[l]
                if (_fn === fn) {
                    fns.splice(l, 1)
                    // break
                } 
            }
        }
    }
}
const o = new Pubish('刘文华')

// let b = Pubish
export default o