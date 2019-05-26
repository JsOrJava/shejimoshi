class Inferface {
    constructor (name) {
        this.name = name
    }
    addWatcher (obj) {
        console.info(obj, '添加观察者')
    }
    removeWatcher (obj) {
        console.info(obj, '移除观察者')
    }
    notifyWatcher (obj) {
        console.info(obj, '向观察者发出通知')
    }
}

class ObservePassed extends Inferface {
    constructor (name, age) {
        super(name)
        this.list = []
        this.content = '拉模型来了'
    }
    addWatcher (obj) {
        this.list.push(obj)
    }
    removeWatcher (obj) {
        this.list.splice(this.list.indexOf(obj), 1)
    }
    notifyWatcher (context) {
        this.list.forEach((ele, index) => {
            ele.update(context)
        })
    }
    /**
     * 通知所有注册的观察者对象 - 拉模型
     */
    _nodifyWatchers () {
        this.list.forEach((ele, index) => {
            ele._updates(this)
        })
    }
}
const o = new ObservePassed('刘文华女神')
export default o 