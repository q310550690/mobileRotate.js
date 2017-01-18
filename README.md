# mobileRotate.js
移动端rotate插件，支持IOS，安卓，安卓同IOS一样流畅

# 实例
```javascript
var test = new mobileRotate({  
  el:'#zhuanpanBg > img',
  angle:'1500', //旋转角度 默认360
  time:'2000', //旋转时间 默认2000ms
  tween:'linear', //支持 linear ease-in ease-out ease-in-out 默认ease-in-out
  pluse:'false', // 是否增量旋转 默认false
  callback:function(){ //回调
    console.log('callback')
  }
})
$('#test2').on('touchend', function(){
  test.rotate();
})
```

# 手机实例
http://km2.kmguguan.com/Xz/xincheng/2017/1.17.2/index.html  
![baidu](http://www.baidu.com/img/bdlogo.gif "百度logo")
