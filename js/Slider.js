
//轮播图
function Slider(obj){

	//宽，高，图片数组，定时器，时长（两张图片的间隔），
	//图片的切换效果
	//豆豆的大小，颜色（原始和高亮），是否是圆的，位置（上，下，左，右）

	//当前图片序号，

	//连接数组

	let defaultObj = {
		boxDom:null,
		imgDoms:[],//图片的标签
		liDoms:[],//豆豆的标签
		width:1240,
		height:400,
		imgs:[],
		myTimer:null,
		timeSpace:3000,
		type:"slide",/*"slide"：表示滑入滑出，fade：淡入淡出*/

		btnSize:10,
		btnColor:"white",
		btnHighColor:"red",
		isCircle:true,
		btnPos:"bottom",/* left:左，right：右 */
		currIndex:0,
		hrefs:[]
	}

	for(let key in defaultObj){
		if(obj[key]!=undefined){
			this[key] = obj[key] ;
		}else{
			this[key] =  defaultObj[key];
		}		
	}
	this.createUI();
	this.addEvent();
	this.autoPlay();
}

Slider.prototype.createUI = function(){
	//1、创建图片
	for(let i in this.imgs){
		let imgDom = document.createElement("img");
		imgDom.src = this.imgs[i];
		imgDom.style.cssText = `
				position: absolute;	
				left:${this.width}px;
				top:0px;
				width: 100%;
				height: 100%;`;
		if(i==0){
			imgDom.style.left="0px";
		}
		this.imgDoms.push(imgDom);
		this.boxDom.appendChild(imgDom);
	}
	//2、创建ul
	let ulDom = document.createElement("ul");
	ulDom.style.cssText= `
				position: absolute;
				list-style: none;
				z-index: 3;`;
	if(this.btnPos=="bottom"){
		let left1 =  (this.width-(this.btnSize*2)*this.imgs.length)/2;
		ulDom.style.left = left1+"px";
		console.log(left1);
		ulDom.style.bottom = "20px";
	}else if(this.btnPos == "top"){
		let left1 =  (this.width-(this.btnSize*2)*this.imgs.length)/2;
		console.log(left1);
		ulDom.style.left = left1+"px";
		ulDom.style.top = "20px";
	}

	this.boxDom.appendChild(ulDom);

	//3、li
	for(let i in this.imgs){
		let liDom = document.createElement("li");
		liDom.style.cssText = `
				float:left;
				width:${this.btnSize}px;
				height: ${this.btnSize}px;
				margin-right: ${this.btnSize}px;
				background-color: ${this.btnColor};`;
		if(this.isCircle){
			liDom.style.borderRadius="50%";
		}
		if(i=="0"){
			liDom.style.backgroundColor = this.btnHighColor;
		}
		this.liDoms.push(liDom);
		ulDom.appendChild(liDom);
	}
}

Slider.prototype.addEvent = function(){

	//2、鼠标进入停止播放
	this.boxDom.onmouseover = ()=>{
		this.stopPlay();
	}

	//3、鼠标离开继续播放
	this.boxDom.onmouseout = ()=>{
		this.autoPlay();
	}

	for(let i=0;i<this.liDoms.length;i++){
		//绑定了事件
		this.liDoms[i].onclick = (event)=>{
			let evt = event || window.event;
			this.goImg(i);
			evt.stopPropagation();
		}
	}

	//5、超链
	this.boxDom.onclick = ()=>{
		location.href = this.hrefs[this.currIndex];

	}
}

Slider.prototype.autoPlay=function(){
	if(this.myTimer!=null){
		return;
	}
	this.myTimer = setInterval(()=>{
		//一、数据处理
		let outIndex = this.currIndex;
		this.currIndex=this.currIndex+1;

		if(this.currIndex>=this.imgs.length){
			this.currIndex=0;
		}

		//二、外观呈现
		this.showImg(outIndex,this.currIndex);

	},this.timeSpace);

}

//停止播放	
Slider.prototype.stopPlay= function(){
	window.clearInterval(this.myTimer);
	this.myTimer = null;
}

//跳转到对应的图片上
Slider.prototype.goImg= function(index){
	//一、数据处理
	let outIndex = this.currIndex;
	this.currIndex = index;

	if(this.currIndex>=this.imgs.length || this.currIndex<0){
		this.currIndex=0;
	}

	//二、外观呈现
	this.showImg(outIndex,this.currIndex);
}

//显示指定的图片
Slider.prototype.showImg= function(outOrd,inOrd){
	if(outOrd==inOrd){
		return;
	}
	//1、改图片
	//一个淡入，一个淡出
	
	this.imgDoms[inOrd].style.left= this.width+"px";
	slideInOut(this.imgDoms[outOrd],"left",-this.width,200,this.imgDoms[inOrd],this.width);

	//2、改豆豆
	
	for(var i=0;i<this.liDoms.length;i++){
		this.liDoms[i].style.backgroundColor = this.btnColor;
	}
	this.liDoms[inOrd].style.backgroundColor = this.btnHighColor;
}

