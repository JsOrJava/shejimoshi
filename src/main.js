// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import observe from './utils/observer'
import observePassed from './utils/observer-passed'
import subscrib from './utils/subscrib'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


// // 观察者模式是多中设计模式中的一种，主要包括观察者和被观察者两个对象，这种设计模式完美的将观察者和被观察者的对象隔离，在模块之间画定了清晰的界限，提高了程序的可维护性和重用行。

// 举个栗子：海岛上有一个女神，和若干个屌丝，可以把女神作为被观察者，屌丝作为观察者，屌丝时时刻刻而观察女神的一举一动，女神说渴了，屌丝都知道了。。。

// 这是栗子实在简单粗暴，但是大致就那个意思。

// 现在上代码吧

// 1，首先定义观察者，这里定义一个接口，updata方法在观察到被观察者有动作之后可以做相应的处理
const o = new observe()
console.log(o.update('fdasdffdfd'))

// 2，定义被观察者接口
observePassed.addWatcher(o)
observePassed.notifyWatcher('女神想和你聊天')
// observePassed.removeWatcher(o)
observePassed.notifyWatcher('女神不想和你聊天')


// 在观察者模式中，又分为推模型和拉模型两种方式。

// 　　●　　推模型

// 　　　　 主题对象向观察者推送主题的详细信息，不管观察者是否需要，推送的信息通常是主题对象的全部或部分数据。

// 　　●　　拉模型

// 　　　　 主题对象在通知观察者的时候，只传递少量信息。如果观察者需要更具体的信息，由观察者主动到主题对象中获取，相当于是观察者从主题对象中拉数据。一般这种模型的实现中，会把主题对象自身通过update()方法传递给观察者，这样在观察者需要获取数据的时候，就可以通过这个引用来获取了。

// 　　根据上面的描述，发现前面的例子就是典型的推模型，下面给出一个拉模型的实例。

observePassed._nodifyWatchers()

//  -------------------------------------

// 现实生活中的发布-订阅模式；

// 比如小红最近在淘宝网上看上一双鞋子，但是呢 联系到卖家后，才发现这双鞋卖光了，但是小红对这双鞋又非常喜欢，
// 所以呢联系卖家，问卖家什么时候有货，卖家告诉她，要等一个星期后才有货，卖家告诉小红，要是你喜欢的话
// ，你可以收藏我们的店铺，等有货的时候再通知你，所以小红收藏了此店铺，但与此同时，小明，小花等也喜欢这双鞋
// ，也收藏了该店铺；等来货的时候就依次会通知他们；

// 在上面的故事中，可以看出是一个典型的发布订阅模式，卖家是属于发布者，小红，小明等属于订阅者，
// 订阅该店铺，卖家作为发布者，当鞋子到了的时候，会依次通知小明，小红等，依次使用旺旺等工具给他们发布消息；

// 如何实现发布--订阅模式？

// 首先要想好谁是发布者(比如上面的卖家)。
// 然后给发布者添加一个缓存列表，用于存放回调函数来通知订阅者(比如上面的买家收藏了卖家的店铺，
// 卖家通过收藏了该店铺的一个列表名单)。
// 最后就是发布消息，发布者遍历这个缓存列表，依次触发里面存放的订阅者回调函数。
// 我们还可以在回调函数里面添加一点参数，比如鞋子的颜色，鞋子尺码等信息；

// 我们先来实现下简单的发布-订阅模式；代码如下：
let fn1
subscrib.listener('buy', function (color, size) {
    console.log('颜色是：'+color, '尺寸：'+size)
})
subscrib.remove('buy', 'asdsdfaf')
subscrib.trigger('buy', '红色', 20)
