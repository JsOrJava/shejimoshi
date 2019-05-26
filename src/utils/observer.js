class Inferface {
    constructor (name) {
        this.name = name
    }
    update (content) {
        console.info(content, '接口')
    }
}

class Observe extends Inferface {
    constructor (name, age) {
     super(name)
    }
    update (content) {
        console.log(content)
    }
    /**
     * 通知观察者对象更新 - 拉模型
     */
    _updates (obj) {
      console.log(obj.content, '-------拉模型')
    }
}
const o = new Observe('刘文华')

let b = Observe
export default b 