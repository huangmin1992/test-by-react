import React,{Component} from 'react';
import imagesData from '../imagesData/imagesData.json'

//图片详情
class ImgList extends Component{
	handleClik(e){
		if(this.props.arrange.isCenter){
			this.props.inVerses()
		}else{
			this.props.center()
		}
		e.stopPropagation();
		e.preventDefault();
	}
	render(){
		const {imgsList} = this.props;
		var styleObj = {};
		//如果props属性中指定了这种图片位置，则使用
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos
		}
		//如果图片旋转角度有值，并且不为0，就添加角度
		if(this.props.arrange.rotate){
			['MozTransform','msTransform','WebkitTransform','transform'].forEach(function(value){
		        styleObj[value] = 'rotate('+this.props.arrange.rotate+'deg)'
		        styleObj = {
		        	...styleObj
		        }
		    }.bind(this));
		}
		if(this.props.arrange.isCenter){
			 styleObj = {
		        	...styleObj,
		        	value:'rotate('+this.props.arrange.rotate+'deg)',
		        	zIndex:11
		        }
		}else{
			styleObj = {
		        	...styleObj,
		        	value:'rotate('+this.props.arrange.rotate+'deg)',
		        	zIndex:0
		        }
		}
		var imgFigureClassName = 'img-figure';
			imgFigureClassName += this.props.arrange.inVerse?' is-inverse':''
		return(
			<figure className={imgFigureClassName} style = { styleObj } ref="figure" onClick = {this.handleClik.bind(this)}>
				<img src={imgsList.fileName} alt = {imgsList.fileName} />
				<figcaption>
					<h2 className="img-title">{imgsList.title}</h2>
					<div className="img-back" onClick = {this.handleClik.bind(this)}>
						{imgsList.desc}
					</div>
				</figcaption>
			</figure>
		)
	}
}

//控制组件
class ControllUnits extends Component{
	handleClik(e){
		if(this.props.arrange.isCenter){
			this.props.inVerses()
		}else{
			this.props.center()
		}
		e.stopPropagation();
		e.preventDefault();
	}
	render(){
		var controllUnitsClassName = "controll-unit";
			if(this.props.arrange.isCenter){
				controllUnitsClassName+=" is-center";
				if(this.props.arrange.inVerse){
					controllUnitsClassName+=" is-inverses";
				}
			}
		return(
			<span className={controllUnitsClassName} onClick = {this.handleClik.bind(this)}></span>
		)
	}
}


class ImgState extends Component{
	constructor(){
		super();
		this.state = {
			imgsArrangeArr:[
				/*{
					pos:{
						left:0,
						top:0
					},
					rotate:0,//旋转角度,
					inVerse:false,//图片正反面
					isCenter:false//图片是否居中
				}*/
			]
		}
		this.Constant={
			centerPos:{//中心位置点
				left:0,
				right:0
			},
			hPosRange:{//水平方向的取值范围
				leftSecX:[0,0],//左分区
				rightSecX:[0,0],//右分区
				y:[0,0]
			},
			vPosRange:{//垂直方向
				x:[0,0],
				topY:[0,0]
			}

		}
	}
	//获取区间内的随机值
	getRangeRandom(low,high){
		return Math.ceil(Math.random()*(high-low)+low);
	}
	//获取0-30度之间的任意正副职
	get30DegRandom(){
		return 	((Math.random()>0.5?"":"-")+Math.ceil(Math.random()*30))
	}
	// 图片翻转
	inVerses(index){
		return function(){
			var imgsArrangeArr = this.state.imgsArrangeArr;
				imgsArrangeArr[index].inVerse = !imgsArrangeArr[index].inVerse;
				this.setState({
					imgsArrangeArr:imgsArrangeArr
				})
		}.bind(this)
	}
	//juzhong
	center(index){
		return function(){
			this.rearRange(index)
		}.bind(this)
	}
	// 重新布局所有图片，centerIndex为居中位置下标
	rearRange(centerIndex){
		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],//上册区域图片的状态信息
			topImgNum = Math.floor(Math.random()*2),//取一个或者不取
			topImgSpliceIndex = 0,//布局上册图片的下标
			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1)//居中图片

			//居中centerindex图片
			//imgsArrangeCenterArr[0].pos = centerPos;
			//居中位置图片没有旋转
			//imgsArrangeCenterArr[0].rotate = 0;
			imgsArrangeCenterArr[0] = {
				pos:centerPos,
				rotate:0,
				isCenter:true
			}

			//取出要布局上册图片的状态信息
			topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
			//布局位于上册的图片
			imgsArrangeTopArr.forEach(function(value,index){
				imgsArrangeTopArr[index] = {
					pos : {
						top:this.getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
						left:this.getRangeRandom(vPosRangeX[0],vPosRangeX[1])
					},
					rotate:this.get30DegRandom(),
					isCenter:false
				}
			}.bind(this))

			//布局左右两侧
			for(var i=0,j = imgsArrangeArr.length,k= j/2;i<j;i++){
				var hPosRangeLorX = null;
				//前半部分左边，后半部分右边
				if(i<k){
					hPosRangeLorX = hPosRangeLeftSecX;
				}else{
					hPosRangeLorX = hPosRangeRightSecX;
				}
				imgsArrangeArr[i] = {
					pos : {
						top:this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
						left:this.getRangeRandom(hPosRangeLorX[0],hPosRangeLorX[1])
					},
					rotate:this.get30DegRandom(),
					isCenter:false
				}
			}
			// 合并
			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
			}
			imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0])
			this.setState({
				imgsArrangeArr:imgsArrangeArr
			})

	}
	//组件加载以后，为每张图片初始化位置
	componentDidMount(){

		//舞台大小
		var stageDOM = this.refs.stages,
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW/2),
			halfStageH = Math.ceil(stageH/2);
		//firgure的大小
		var imgFigureDOM = this.refs.imgFigures0.refs.figure,
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW/2),
			halfImgH = Math.ceil(imgH/2);

		//计算中心点位置
		this.Constant.centerPos = {
			left:halfStageW - halfImgW,
			top:halfStageH - halfImgH
		}
		//计算水平区域
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW+halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		// 垂直
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;
		this.rearRange(0)
	}


	render(){
		let imgFigures = [];
		let controllUnits = [];
		imagesData.forEach(function (imgs, index) {
			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index]={
					pos:{
						left:0,
						top:0
					},
					rotate:0,
					inVerse:false,
					isCenter:false
				}
			}
			imgFigures.push(<ImgList key={index} imgsList = {imgs} ref={"imgFigures"+index} arrange = {this.state.imgsArrangeArr[index]}  inVerses = {this.inVerses(index).bind(this)} center={this.center(index).bind(this)}/>)
			controllUnits.push(<ControllUnits key={index} arrange = {this.state.imgsArrangeArr[index]} inVerses = {this.inVerses(index).bind(this)} center = {this.center(index).bind(this)}/>)
		}.bind(this))
		return(
			<section className="img-state" ref="stages">
				<section className="img-list">
					{
						imgFigures
					}
				</section>
				<nav className="img-nav">
					{controllUnits}
				</nav>
			</section>
		)
	}
}
export default ImgState;