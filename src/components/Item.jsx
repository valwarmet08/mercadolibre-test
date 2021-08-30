import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handlerClickDetail = (event) => {
        event.preventDefault();
        window.location.replace("/item/"+event.currentTarget.id)

        /* let form = event.currentTarget;
        if( form["search-ml"].value != ""){
            window.location.href = `${window.location.origin}/items?search=${form["search-ml"].value}`
        } */
    }

    render() {
        return (
            <div id={this.props.id} className="card item-result-ml" onClick={this.handlerClickDetail}>
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={this.props.image ? this.props.image : "http://via.placeholder.com/180x180"} className="search-result-products-ml img-fluid rounded-start" alt={this.props.title} />
                    </div>
                    <div className="col-md-7 container-description">
                        <div className="card-body">
                            <h3 className="card-title ml-item-title">$ {this.props.price ? Number(this.props.price).toLocaleString() : 0 } <img src="/assets/ic_shipping.png"/></h3>
                            <p className="card-text ml-item-description"> {this.props.title } </p>
                            <p className="card-text ml-item-description">Completo unico</p>
                        </div>
                    </div>

                    <div className="col-md-2 container-description">
                        <div className="card-body">
                            <p className="align-middle">{this.props.address ? this.props.address : "" }</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

Item.propTypes = {
    id: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    address : PropTypes.string
};

export default Item;