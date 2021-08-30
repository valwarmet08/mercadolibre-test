
import React, { Component } from 'react';

import Products from '../controllers/products';
import Breadcrumb from '../components/Breadcrumb';
class DetailProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product : {},
			description : {},
			filters : []
		}
	}

	componentDidMount() {
        this.getParams(); 
    }

	getParams = () =>{
		let id = this.props.match.params.id;
        this.getDataProduct( id )
    }

	getDataProduct(id){
		Products.detailProduct({ id : id }, (response) => {
            if(response.success){
                this.setDataProduct(response.data[0].body)
				this.getDescriptionProduct(id);
				this.getDataCategory(response.data[0].body.category_id)
            }
        });
	}

	getDescriptionProduct(id){
		Products.desriptionProduct({ id : id }, (response) => {
            if(response.success){
                this.setDescriptionProduct(response.data[0].body) 
            }
        });
	}

	getDataCategory( id ){
        Products.categoryProduct( { id : id } , ( response ) => {
            if(response.success){
                this.setState({
                    filters : response.data.path_from_root.length > 0 ? response.data.path_from_root : [] 
                }); 
            }
        });
    }

	setDataProduct(data){
		this.setState({
			product : data
		});
	}

	setDescriptionProduct(data){
		this.setState({
			description : data
		});
	}

	render() {
		
		return (
			<div >

				<Breadcrumb filters={this.state.filters}/>

				{
					Object.keys(this.state.product).length > 0 ?
						<div className="row content-results-ml" style={{background:"white"}}>
							<div className="col-md-7 item-photo">
								<img
									alt={this.state.product.title} 
									style={{ width: '680px' }} 
									src={this.state.product.pictures[0].secure_url}/>
							</div>
							<div className="col-md-3" >

								<div className="container-ml-detail-product">

									<p className="quantity-ml-text margin-ml-detail">
										{this.state.product.condition == "new" ? "Nuevo" : this.state.product.condition } - { Number(this.state.product.initial_quantity) - Number(this.state.product.available_quantity) } vendidos
									</p>


									<h3 className="title-ml-product">{this.state.product.title}</h3>
							
									<h3 className="price-ml-product margin-ml-detail" >$ {Number(this.state.product.price).toLocaleString()}</h3>
						
									<div className="margin-ml-detail" >
										<button className="btn btn-primary btn-block btn-ml">
											Comprar
										</button>
									</div>

								</div>
							</div>

							<div className="container-ml-description-prod col-md-6 container margin-ml-detail-left">
								<h2 className="title-ml-description-prod">Descripcion de producto </h2>
								<div className="description-ml margin-ml-detail" style={{ width: '100%'}}>
									<p>
										{this.state.description.plain_text}
									</p>
								</div>
							</div>
						</div>
					:

					""
				}
				
			</div>
		);
	}
}

export default DetailProduct;
