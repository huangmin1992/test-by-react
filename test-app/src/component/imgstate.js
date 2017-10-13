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
	render(){
		return(
			<section className="img-state">
				<section className="img-list">
					{
						imagesData.map((imgs,index)=>
				            (<ImgList key={index} imgsList = {imgs} />)
				        )
					}
				</section>
				<nav className="img-nav"></nav>
			</section>
		)
	}
}
export default ImgState;