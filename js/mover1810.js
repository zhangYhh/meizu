

//匀速运动：
//参数：
	//dom对象
	//样式属性
	//起始值
	//结束值
	//方向
	//步长
	//时间间隔
//返回值：无	

function moveYun(domObj,styleAttr,startValue,endValue,direction,step,timeSpace,func){
	var value = startValue;

	var myTimer = setInterval(function(){
		//一、数据处理
		//1、改变数据
		value = value+direction*step;
		
		//2、边界
		//if(value>=endValue){
		if(direction>0?value>=endValue:value<=endValue){
			value = endValue;
			window.clearInterval(myTimer);
			//func&&func();
			if(func){
				func();
			}
		}

		//二、改变外观
		if(styleAttr=="opacity"){
			domObj.style[styleAttr] = value;
		}else{
			domObj.style[styleAttr] = value+"px";
		}
	},timeSpace);	
}

//匀速运动：
//参数：
	//dom对象
	//样式属性
	//结束值
	//时长
//返回值：无	

function moveYun02(domObj,styleAttr,endValue,timeLong,func){

	var startValue=parseInt(getStyle(domObj,styleAttr));

	var direction = startValue>endValue?-1:1;

	//已知：时长，距离（Math.abs(startValue-endValue)）
	var timeSpace =  10;
	var step =Math.abs(startValue-endValue)/(timeLong/timeSpace) ;//(步长= 距离/总步数;  总步数 = 时长/时间间隔)

	moveYun(domObj,styleAttr,startValue,endValue,direction,step,timeSpace,func);
	
}

//完成两张图片的滑入滑出
//参数:
//出去的图片
//进来的图片
//样式属性
//结束值(以出去的图片准)
//两张图片的距离差。
//时长

//思路：以出去的图片为准进行运动，即运动中的任何数据都是以出去的图片为准
function slideInOut(domObjOut,styleAttr,endValue,timeLong,domObjIn,diff,func){
	var startValue=parseInt(getStyle(domObjOut,styleAttr));

	var direction = startValue>endValue?-1:1;

	//已知：时长，距离（Math.abs(startValue-endValue)）
	var timeSpace =  10;
	var step =Math.abs(startValue-endValue)/(timeLong/timeSpace) ;//(步长= 距离/总步数;  总步数 = 时长/时间间隔)

	
	var value = startValue;

	var myTimer = setInterval(function(){
		//一、数据处理
		//1、改变数据
		value = value+direction*step;
		
		//2、边界
		//if(value>=endValue){
		if(direction>0?value>=endValue:value<=endValue){
			value = endValue;
			window.clearInterval(myTimer);
			func&&func();
		}

		//二、改变外观
		domObjOut.style[styleAttr] = value+"px";
		domObjIn.style[styleAttr] = (value+diff)+"px";
		
	},timeSpace);

}

//淡入淡出的函数
//参数:
//出去的图片（淡出）
//进来的图片（淡入）
//时长

function fadeInOut(domObjOut,timeLong,domObjIn,func){

	var startValue=1;
	var endValue = 0;

	var direction = -1;

	//已知：时长，距离（Math.abs(startValue-endValue)）
	var timeSpace =  10;
	var step =Math.abs(startValue-endValue)/(timeLong/timeSpace) ;//(步长= 距离/总步数;  总步数 = 时长/时间间隔)

	
	var value = startValue;

	var myTimer = setInterval(function(){
		//一、数据处理
		//1、改变数据
		value = value+direction*step;
		
		//2、边界
		//if(value>=endValue){
		if(direction>0?value>=endValue:value<=endValue){
			value = endValue;
			window.clearInterval(myTimer);
			func&&func();
		}

		//二、改变外观
		domObjOut.style.opacity = value;
		domObjIn.style.opacity = (1-value);
		
	},timeSpace);

}

//匀速运动(多属性运动)：
//参数：
	//dom对象
	//样式属性
	//结束值
	//时长
//返回值：无

// animate($("#box"),{
// 	"width":500,
// 	"height":400,
// 	"left":300
// },2000);

function animate(domObj,obj,timeLong,func){
	//var startValue=parseInt(getStyle(domObj,styleAttr));
	var startValueObj = {};
	for(let key in obj){
		startValueObj[key] = parseInt(getStyle(domObj,key));
	}

	// var direction = startValue>endValue?-1:1;
	var directionObj = {};
	for(let key in obj){
		directionObj[key] = startValueObj[key]>obj[key]?-1:1;
	}

	//已知：时长，距离（Math.abs(startValue-endValue)）
	var timeSpace =  10;
	// var step =Math.abs(startValue-endValue)/(timeLong/timeSpace) ;//(步长= 距离/总步数;  总步数 = 时长/时间间隔)
	let stepObj = {};
	for(let key in obj){
		stepObj[key] = Math.abs(startValueObj[key]-obj[key])/(timeLong/timeSpace) ; 
	}

	// var value = startValue;
	let valueObj = {};
	for(let key in obj){
		valueObj[key] = startValueObj[key]; 
	}

	var myTimer = setInterval(function(){
		//一、数据处理
		//1、改变数据
		// value = value+direction*step;	
		for(let key in valueObj){
			valueObj[key] = valueObj[key]+directionObj[key]*stepObj[key];
		}

		//2、边界
		//if(value>=endValue){

		for(let key in obj){
			if(directionObj[key]>0?valueObj[key]>=obj[key]:valueObj[key]<=obj[key]){
				valueObj[key] = obj[key];
				if(myTimer!=null){
					window.clearInterval(myTimer);
					myTimer = null;
					func&&func();
				}
				
			}
		}

		//二、改变外观
		for(let key in obj){
			if(key=="opacity"){
				domObj.style[key] = valueObj[key];
			}else{
				domObj.style[key] = valueObj[key]+"px";
			}
		}

	},timeSpace);	
}




//抛物线运动
//dom元素
//起始位置
//结束位置
//时间长度
//开口方向（上下左右）
//回调函数（当运动做完后，要执行的代码）
	
function parabola03(domObj,startPoint,endPoint,timeLong,openDirection,func){
	//计算起点和终点所成夹角的度数，来决定开口的方向
	
	//起点和终点
	//let startPoint = {x:$("#startDiv").offsetLeft,y:$("#startDiv").offsetTop};
	//let endPoint = {x:$("#endDiv").offsetLeft,y:$("#endDiv").offsetTop};
	//平移到原点
	let x = endPoint.x-startPoint.x;
	let y = endPoint.y-startPoint.y;
	
	//let p = y*y/(2*x);//y^2=2px;  p = y^2/(2x);//依赖于：开口方向决定
	let p;
	switch(openDirection){
		case "左": p = Math.abs(y*y/(2*x));break; //y^2=-2px;
		case "上": p = Math.abs(x*x/(2*y));break; //x^2=2py;
		case "右": p = Math.abs(y*y/(2*x));break; //y^2=2px;
		case "下": p = Math.abs(x*x/(2*y));break; //x^2=-2py;
		default: p = Math.abs(y*y/(2*x));break;
	}
	
	let left = 0;//x
	let top1 = 0;//y;
	
	//let direction = 1;//依赖于：起点和终点的位置，开口方向决定
	let direction;
	switch(openDirection){
		case "左":  direction=-1;break;
		case "上":  direction=-1;break;
		case "右":  direction=1;break; 
		case "下":  direction=1;break; 
		default:direction=1;break;
	}
	
	let timeSpace = 10;
	
	//let step = Math.abs(startPoint.x-endPoint.x)/(timeLong/timeSpace);//依赖于：开口方向决定
	let dis;
	switch(openDirection){
		case "左":; 
		case "右":dis = startPoint.x-endPoint.x;break; 
		case "上": 
		case "下":dis = startPoint.y-endPoint.y;break; 
		default:dis = startPoint.x-endPoint.x;break;
	}
	let step = Math.abs(dis)/(timeLong/timeSpace);
	
	var myTimer = setInterval(function(){
		//1、改变数据		
		switch(openDirection){
			case "左":
			case "右":{
						//纵向的方向
						let VDirection = endPoint.y>startPoint.y?1:-1;
						
						left=left+direction*step;

					    top1= VDirection*Math.sqrt(2*p*Math.abs(left));
						break;
			          }
			case "上": 
			case "下":{
						//横向的方向
						let HDirection = endPoint.x>startPoint.x?1:-1;
						top1=top1+direction*step;
					    left= HDirection*Math.sqrt(2*p*Math.abs(top1));//x^2 = 2py
						break; 
			          } 
			default:{
						//纵向的方向
						let VDirection = endPoint.y>startPoint.y?1:-1;
						left=left+direction*step;
					    top1= VDirection*Math.sqrt(2*p*Math.abs(left));
						break;
			        }
		}
				

		//2、边界处理 
		let isOver = false;
		switch(openDirection){
			case "左":if(left<=endPoint.x-startPoint.x){
						left=endPoint.x-startPoint.x;
						isOver = true;
					}
					break;  
			case "右":if(left>=(endPoint.x-startPoint.x)){
						left=endPoint.x-startPoint.x;
						isOver = true;
					}
					break;
			case "上": if(top1<=(endPoint.y-startPoint.y)){
							top1=endPoint.y-startPoint.y;
							isOver = true;
						}
						break;
			case "下":if(top1>=(endPoint.y-startPoint.y)){
							top1=endPoint.y-startPoint.y;
							isOver = true;
						}
						break;
			default:if(left>=(endPoint.x-startPoint.x)){
						left=endPoint.x-startPoint.x;
						isOver = true;
					}
					break;
		}
		
		if(isOver){
			window.clearInterval(myTimer);	
			func&&func();
		}
		
		//3、改变外观
		domObj.style.left = left+startPoint.x+"px";
		domObj.style.top = top1+startPoint.y+"px";		
	},timeSpace);
}

