/**
 * 
 * @param {*} obj 默认参数
 * @author 变异小僵尸
 * @version 0.0.1
 * 
 */
function mobileRotate(obj){
  var that = this;
  // 默认参数
  var t = 0, // 当前时间.解释为:开始的步数(一般从0开始),预示着一段动画的开始.
  b = 0, // 初始值.解释为:开始量(开始的属性值)
  c = 0,  // 变化量.解释为属性值的改变量:结束位置的属性值 - 开始位置的属性值
  d = 0, // 持续时间.解释为:结束的步数(运动的总时间)
  intTime = 16, // 每秒60fps 1000/60 = 16
  isRotate = true // 是否可以旋转
  elAngle = '' ,//el中的角度
  def = { //默认参数
    el : '', //el元素
    speed : 1, // 速度
    angle : 360, // 角度
    random : false, //随机数
    time : 2000,// 持续时间
    pluse : false, //增量旋转
    tween : 'ease-in-out',
    callback : function(){  //回调
      that.cle('rotateEnd');
    },
  };
  // 遍历obj
  if (obj != "") {
    for (var i in obj) {
      def[i] = obj[i];
    }
  }
  // 设置时间
  d = def.time;
  // 分割随机数
  if(def.random != false){
    def.random = def.random.split(",");
  }
  // 原型链
  that.pro = mobileRotate.prototype;
  // 获取旋转角度 传入旋转元素的style
  that.pro.getRotate = function(){
    var el = that.select().getAttribute('style');
    if(el != undefined){
      if (el.indexOf('rotate') != -1) {
        return el.match(/(rotate\([\-\+]?((\d+(\.\d+)?)(deg))\))/i);
      } else {
        return false;
      }
    }else{
      return false;
    }
  }
  // 保留小数 传入值和保留的位数
  that.pro.fomatFloat = function(src,pos){
     return (Math.round(src*100)/100).toFixed(pos);
  }
  // 获取元素
  that.pro.select = function(){
    return document.querySelector(def.el);
  }
  // 判定UA
  that.pro.getUa = function(){
    var ua = navigator.userAgent;
    if(ua.indexOf("Android") > -1 || ua.indexOf("android") > -1) {
      return "android";
    }else if(ua.indexOf("iPhone") > -1 || ua.indexOf("iphone") > -1) {
      return "iphone";
    }
  }
  // 旋转
  that.pro.rotate = function(){
    // 判定是否可以旋转
    if(isRotate){
      isRotate = false;
    }else{
      return false;
    }
    if(def.random != false){
      def.angle = that.random(def.random[0],def.random[1])
    }
    // 判定和获取el中的角度
    elAngle = that.getRotate();
    if(that.getUa() == 'iphone'){
      // 持续时间
      var sportD = parseInt(d / intTime);
      // 变化量c
      var sportC = def.angle;
      // 开始时间T
      var sportT = t;
      // 开始量
      var sportB = b;
      //开始旋转
      var sportAngle = '';
      if(elAngle !== false) {
        if(def.pluse){
          sportC = def.angle;
          sportB = parseFloat(elAngle[3]) % 360;
        }else{
          if(def.angle <= 360){
            sportC = ((360 + parseFloat(elAngle[3])) - parseFloat(elAngle[3]));
            sportB = parseFloat(elAngle[3]) % 360;
          }else{
            //sportC = def.angle - (parseFloat(elAngle[3]) % 360);
            sportC = def.angle;
            sportB = parseFloat(elAngle[3]) % 360;
          }
        }
      }
      function sport(){
        //每次运行函数使t的值增加speed
        sportT += def.speed;
        //当t追赶到tweend 之后清除定时器并回调
        if (sportT == sportD){
          clearInterval(timer);
          isRotate = true;
          def.callback();
        }else{
          sportAngle = that.tween(sportT, sportB, sportC, sportD);
          sportAngle = that.fomatFloat((sportAngle % 360),2);
          // console.log(sportAngle)
          that.select().setAttribute('style','transform:rotate(' + sportAngle + 'deg)')
        }
      }
      var timer = setInterval(sport, intTime);
    }else{
      if(elAngle !== false) {
        if(def.pluse){
          sportAngle = (parseFloat(elAngle[3]) + parseFloat(def.angle));
        }else{
          if(def.angle <= 360){
            sportAngle = 360 + (parseFloat(elAngle[3]) + parseFloat(def.angle)) - (parseFloat(def.angle) % 360);
          }else{
            //sportAngle = (parseFloat(elAngle[3]) + parseFloat(def.angle)) - (parseFloat(def.angle) % 360);
            sportAngle = (parseFloat(elAngle[3]) + parseFloat(def.angle));
          }
        }
      }else{
        sportAngle = def.angle;
      }
      //console.log(sportAngle)
      that.select().setAttribute('style','transform:rotate(' + sportAngle + 'deg);transition:all '+ def.time +'ms '+ def.tween +';')
      setTimeout(function(){
        isRotate = true;
        def.callback();
      },def.time)
    }
  }
  // console
  that.pro.cle = function(c){
    console.log('mobileRotate.js: ' + c);
  }
  // 随机数
  that.pro.random = function(n, m){
    return (parseInt(n) + Math.floor(Math.random() * ((parseInt(m) + 1) - n)))
  }
  //tween
  that.pro.tween = function(t, b, c, d){
    switch (def.tween) {
      case 'linear':
        return c*t/d + b;
        break;
      case 'ease-in':
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        break;
      case 'ease-out':
        return c * Math.sin(t/d * (Math.PI/2)) + b;
        break;
      case 'ease-in-out':
        return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        break;
    }
  }

  // 方法
  that.pro.setDef = function(obj){
    if (obj != "") {
      for (var i in obj) {
        def[i] = obj[i];
      }
    }
  }
}
