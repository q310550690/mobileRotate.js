/**
 * 
 * @param {*} obj 默认参数
 * @author 变异小僵尸
 * @version 0.0.2
 * 
 */
function mobileRotate(obj) {
	var that = this;
	// 默认参数
	var t = 0, // 当前时间.解释为:开始的步数(一般从0开始),预示着一段动画的开始.
		b = 0, // 初始值.解释为:开始量(开始的属性值)
		c = 0, // 变化量.解释为属性值的改变量:结束位置的属性值 - 开始位置的属性值
		d = 0, // 持续时间.解释为:结束的步数(运动的总时间)
		intTime = 16, // 每秒60fps 1000/60 = 16
		isRotate = true, // 是否可以旋转
		isRandom = true, // 随机数是否正确
		oldAngle = 360, // 存储上一次旋转的值
		elAngle = '', //el中的角度
		def = { //默认参数
			el: '', //el元素
			speed: 1, // 速度 仅对ios有效
			angle: 360, // 角度 最大360
			random: false, //随机数 启用随机数 angle参数会失效
			beforeReset: false, //旋转之前复位
			afterReset: false, //旋转完毕后复位
			time: 2000, // 持续时间
			tween: 'ease-in-out',
			turn: 0, //旋转圈数,区间值，会加上angle的值 360*(1|5) + angle
			callback: function () { //回调
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
	// 原型链
	that.pro = mobileRotate.prototype;
	// 获取旋转角度 传入旋转元素的style
	that.pro.getRotate = function () {
		var el = that.select().getAttribute('style');
		if (el != undefined) {
			if (el.indexOf('rotate') != -1) {
				return el.match(/(rotate\([\-\+]?((\d+(\.\d+)?)(deg))\))/i);
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	// 分割随机数、圈数初始化def.angle
	that.pro.splitRT = function () {
		// 分割随机数
		if (def.random != false) {
			def.random = def.random.split(",");
			if (def.random instanceof Array) {
				if (def.random.length == 2) {
					def.random = that.random(def.random[0], def.random[1])
				} else {
					console.log('random 配置参数不正确 请输入与 "1~360"之间的值，如："20,360"');
					isRandom = false;
					return false;
				}
			}
			def.angle = Math.abs(def.random % 360 ? def.random % 360 : 360);
		} else {
			// 设置def.angle不能大于360
			def.angle = Math.abs(def.angle % 360 ? def.angle % 360 : 360);
		}
		// 分割随机圈数
		if (def.turn != false) {
			def.turn = def.turn.split(",");
		}
	}
	// 分割随机数、圈数
	that.splitRT();
	// 保留小数 传入值和保留的位数
	that.pro.fomatFloat = function (src, pos) {
		return (Math.round(src * 100) / 100).toFixed(pos);
	}
	// 获取元素
	that.pro.select = function () {
		return document.querySelector(def.el);
	}
	// 判定UA
	that.pro.getUa = function () {
		var ua = navigator.userAgent;
		if (ua.indexOf("Android") > -1 || ua.indexOf("android") > -1) {
			return "android";
		} else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iphone") > -1) {
			return "iphone";
		}
	}
	// 旋转
	that.pro.rotate = function () {
		// 判定随机数是否正确
		if (!isRandom) {
			isRandom = true;
			return false;
		}
		// 判定是否可以旋转
		if (isRotate) {
			isRotate = false;
		} else {
			return false;
		}
		// 获取随机的圈数
		if (def.turn != false) {
			if (def.turn instanceof Array) {
				if (def.turn.length == 2) {
					def.turn = that.random(def.turn[0], def.turn[1])
				} else if (def.turn.length == 1) {
					def.turn = def.turn[0];
				} else {
					console.log('turn 配置参数不正确 请输入与 "1,5" 或 "1"');
					return false;
				}
			}
		}
		var turnAngle = def.turn * 360, // 旋转圈数增量角度
			sportAngle = ''; //最终旋转结果
		// 判定和获取el中的角度
		elAngle = that.getRotate();
		// 苹果为了解决rotateBUG 走js动态路线
		if (that.getUa() == 'iphone') {
			// 判定旋转之前是否复位
			if (def.beforeReset) {
				oldAngle = 360;
				that.select().setAttribute('style', 'transform:rotate(0deg)')
			}
			var sportD = parseInt(d / intTime), // 持续时间
				sportC = def.angle + turnAngle, // 变化量c
				sportT = t, // 开始时间T
				sportB = b; // 开始量
			// 判定之前是否旋转过了
			if (elAngle !== false) {
				sportB = parseFloat(elAngle[3]) % 360;
				sportC = def.angle + turnAngle - sportB;
			}

			function sport() {
				//每次运行函数使t的值增加speed
				sportT += def.speed;
				//当t追赶到tweend 之后清除定时器并回调
				if (sportT == sportD) {
					clearInterval(timer);
					isRotate = true;
					def.callback();
					// 判定是否复位
					if (def.afterReset) {
						oldAngle = 360;
						that.select().setAttribute('style', 'transform:rotate(0deg)')
					}
				} else {
					sportAngle = that.tween(sportT, sportB, sportC, sportD);
					sportAngle = that.fomatFloat((sportAngle % 360), 2);
					that.select().setAttribute('style', 'transform:rotate(' + sportAngle + 'deg)')
				}
			}
			var timer = setInterval(sport, intTime);
		} else {
			// 判定旋转之前是否复位
			if(def.beforeReset){
				oldAngle = 0;
			}
			// 判定之前是否旋转过了
			if (elAngle !== false) {
				// 如果这次的角度比上次的小
				if ((oldAngle % 360) > def.angle) {
					if (turnAngle >= 360) { //如果turnAngle角度大于360就直接加turnAngle
						sportAngle = oldAngle = oldAngle - (oldAngle % 360 - def.angle) + turnAngle;
					} else {
						sportAngle = oldAngle = oldAngle - (oldAngle % 360 - def.angle) + 360;
					}
				} else if (def.angle > (oldAngle % 360)) { // 如果这次的角度比上次的大
					if (turnAngle >= 360) { //如果turnAngle角度大于360就直接加turnAngle
						sportAngle = oldAngle = oldAngle + (def.angle - oldAngle % 360) + turnAngle;
					} else {
						sportAngle = oldAngle = oldAngle + (def.angle - oldAngle % 360) + 360;
					}
				} else { // 如果角度相等
					if (turnAngle >= 360) { //如果turnAngle角度大于360就直接加turnAngle
						sportAngle = oldAngle = oldAngle + turnAngle;
					} else {
						sportAngle = oldAngle = oldAngle + 360;
					}
				}
			} else {
				sportAngle = oldAngle = def.angle + turnAngle;
			}
			// 判定旋转之前是否复位
			if (def.beforeReset) {
				that.select().setAttribute('style', 'transform:rotate(0deg);transition:all 0ms')
				setTimeout(function () {
					// 复制style开始执行css3动画
					that.select().setAttribute('style', 'transform:rotate(' + sportAngle + 'deg);transition:all ' + def.time + 'ms ' + def.tween + ';')
				}, 30)
			} else {
				// 复制style开始执行css3动画
				that.select().setAttribute('style', 'transform:rotate(' + sportAngle + 'deg);transition:all ' + def.time + 'ms ' + def.tween + ';')
			}
			setTimeout(function () {
				isRotate = true;
				def.callback();
				// 判定是否复位
				if (def.afterReset) {
					setTimeout(function () {
						oldAngle = 0;
						that.select().setAttribute('style', 'transform:rotate(0deg);transition:all 0ms;')
					}, 30)
				}
			}, def.time)
		}
	}
	// console
	that.pro.cle = function (c) {
		console.log('mobileRotate.js: ' + c);
	}
	// 随机数
	that.pro.random = function (n, m) {
		return (parseInt(n) + Math.floor(Math.random() * ((parseInt(m) + 1) - n)))
	}
	//tween
	that.pro.tween = function (t, b, c, d) {
		switch (def.tween) {
			case 'linear':
				return c * t / d + b;
				break;
			case 'ease-in':
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
				break;
			case 'ease-out':
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
				break;
			case 'ease-in-out':
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
				break;
		}
	}

	// 方法
	that.pro.setDef = function (obj) {
		if (obj != "") {
			for (var i in obj) {
				if (obj[i]) {
					def[i] = obj[i];
				}
			}
			// 分割随机数、圈数
			that.splitRT();
		}
	}
}
