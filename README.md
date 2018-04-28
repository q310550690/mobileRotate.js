# mobileRotate.js
移动端rotate插件，支持IOS，安卓，安卓同IOS一样流畅
使用场景：H5大转盘抽奖、PC端大转盘抽奖
# 属性  
`el` 选择器 (必需)  
```javascript
el:'#zhuanpanBg > img', // 必选element
```  
`angle` 旋转角度   
```javascript
angle:'360', // 旋转角度 最大360 默认值360 接受值：1~360 之间数字
```  
`random` 随机数   
```javascript
random:false,//随机数 启用随机数 angle参数会失效 接受值 false | '1,360'(区间值,意思在1,360随机一个，不能直接输入固定的数字)
```  
`beforeReset` 开始旋转之前复位
```javascript
beforeReset: false, //接受参数 true | false
```
`afterReset` 旋转停止之后复位
```javascript
afterReset: false, ////接受参数 true | false
```
`time` 持续时间   
```javascript
time:'2000', //旋转时间 默认2000ms
```  
`tween` 缓动
```javascript
tween:'linear', //接受参数 linea | ease-in | ease-out | ease-in-out 默认ease-in-out
```  
`turn` 旋转圈数  
```javascript
turn:0, // 区间值，会加上angle的值 360*(1|5) + angle 接受值 2(旋转圈数，0和false效果想吐) | false | '1,5'(表示1~5随机转)
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
    angle:60,
    ...
})
``` 
`rotate()` 开始旋转  
```javascript
test.rotate();
``` 
`reset(fn)` 复位  
```javascript
// fn 为复位后的回调函数
test.reset(function(){
  ...
});
``` 

# 实例
```javascript
var test = new mobileRotate({
  el:'#zhuanpanBg > img',
  time:'2000', //旋转时间 默认2000ms
  tween:'linear', //支持 linear ease-in ease-out ease-in-out 默认ease-in-out
  turn:'1,6',//1~6圈随机转在加上angle
  callback:function(){ //回调
    console.log('callback')
  }
})
$('#test2').on('touchend', function(){
  test.setDef({
    angle:60,

  })
  test.rotate();
})
```
