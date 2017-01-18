# mobileRotate.js
移动端rotate插件，支持IOS，安卓，安卓同IOS一样流畅
# 属性  
`el` 选择器 (必需)  
```javascript
el:'#zhuanpanBg > img', // 必选element
```  
`angle` 旋转角度   
```javascript
angle:'1400', //旋转角度 默认360
```  
`random` 随机数   
```javascript
random:'600,1400',//设置随机数,默认false,设置随机数会覆盖angle的值
```  
`time` 持续时间   
```javascript
time:'2000', //旋转时间 默认2000ms
```  
`tween` 缓动    
```javascript
tween:'linear', //支持 linear ease-in ease-out ease-in-out 默认ease-in-out
```  
`pluse` 增量  
```javascript
pluse:'false', // 是否增量旋转 默认false
```  
`callback` 回调   
```javascript
callback:function(){ //回调
    console.log('callback')
  }
```  

# 方法  
`setDef()` 设置属性值  
```javascript
test.setDef({
    angle:dd,
    ...
  })
```  

# 实例
```javascript
var test = new mobileRotate({  
  el:'#zhuanpanBg > img', // 必选element
  angle:'1400', //旋转角度 默认360
  random:'600,1400',//设置随机数,默认false,设置随机数会覆盖angle的值
  time:'2000', //旋转时间 默认2000ms
  tween:'linear', //支持 linear ease-in ease-out ease-in-out 默认ease-in-out
  pluse:'false', // 是否增量旋转 默认false
  callback:function(){ //回调
    console.log('callback')
  }
})
$('#test2').on('touchend', function(){
  //没点击一次都随机旋转
  var random = (parseInt(10) + Math.floor(Math.random() * ((parseInt(640) + 1) - 10)))
  test.setDef({
    angle:random,
  })
  test.rotate();
})
```

# 手机实例
http://km2.kmguguan.com/Xz/xincheng/2017/1.17.2/index.html  
![qrcode](https://github.com/q310550690/mobileRotate.js/blob/master/qrcode.png?raw=true "二维码")
