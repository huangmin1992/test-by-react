import React,{Component} from 'react';
import imagesData from '../imagesData/imagesData.json'

//图片详情
class ImgList extends Component{
	render(){
		const {imgsList} = this.props;
		return(
			<figure className='img-figure'>
				<img src={imgsList.fileName}/>
				<figcaption>
					<h2 className="img-title">{imgsList.title}</h2>
				</figcaption>
			</figure>
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
					}
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
			topImgNum = Math.ceil(Math.random()*2),//取一个或者不取
			topImgSpliceIndex = 0,//布局上册图片的下标
			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1)//居中图片

			//居中centerindex图片
			imgsArrangeCenterArr[0].pos = centerPos;

			//取出要布局上册图片的状态信息
			topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
			//布局位于上册的图片
			imgsArrangeTopArr.forEach(function(value,index){
				imgsArrangeTopArr[index].pos = {
					top:this.getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
					left:this.getRangeRandom(vPosRangeX[0],vPosRangeX[1])
				}
			}.bind(this))

			//布局左右两侧
			for(var i=0;j = imgsArrangeArr.length,k= j/2;i<j;i++){
				var hPosRangeLorX = null;
				//前半部分左边，后半部分右边
				if(i<k){
					hPosRangeLorX = hPosRangeLeftSecX;
				}else{
					hPosRangeLorX = hPosRangeRightSecX;
				}
				imgsArrangeArr[i].pos = {
					top:this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
					left:this.getRangeRandom(hPosRangeLorX[0],hPosRangeLorX[1])
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
		var imgFigureDOM = this.refs.imgFigure0,
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
		return(
			<section className="img-state" ref="stages">
				<section className="img-list">
					{
						imagesData.map(function(imgs,index){
							if(!this.state.imgsArrangeArr[index]){
								this.state.imgsArrangeArr[index]={
									pos:{
										left:0,
										top:0
									}
								}
							}
				            return(<ImgList key={index} imgsList = {imgs} ref = {"imgFigure"+index} arrange = {this.state.imgsArrangeArr[index]}/>)
						
				        }.bind(this))
					}
				</section>
				<nav className="img-nav"></nav>
			</section>
		)
	}
}
export default ImgState;