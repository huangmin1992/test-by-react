import React,{Component} from 'react';
import imagesData from '../imagesData/imagesData.json'

class ImgState extends Component{
	render(){
		return(
			<section className="img-state">
				<section className="img-list">
					{
						imagesData.map((imgs,index)=>
				            (<img key={index} src={imgs.fileName} />)
				        )
					}
				</section>
				<nav className="img-nav"></nav>
			</section>
		)
	}
}
export default ImgState;