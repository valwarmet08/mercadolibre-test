import React, { Component } from 'react';

import Products from '../controllers/products';

import Item from '../components/Item';
import Breadcrumb from '../components/Breadcrumb';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters : [],
            products : [],
            category : {}
        }
    }

    componentDidMount() {
        this.getParams();
    }

    getParams = () => {
        var url = new URL(window.location.href);
        var query = url.searchParams.get("search");
        this.getListProducts( query )
    }

    getListProducts( query ){
        let data =  { 
            product : query 
        }

        Products.search( data , ( response ) => {
            if(response.success){
                this.setDataSearch(response.data)
            }
        });
    }


    setDataSearch( response ){
        this.setState({
            filters : response.filters.length ? response.filters[0].values[0].path_from_root : this.filterCargetories(response.available_filters[0].values),
            products : response.results
        });
    }

    filterCargetories( filters ){
        let mayor = 0;
        let data = {};
        for( let filter of filters ){
            if( mayor == 0){
                mayor = filter.results;
                data = filter;
            }
            if ( Number(filter.results) > Number(mayor) ) {
                mayor = filter.results;
                data = filter;
            }
        }

        return [data]
    }

    render() {
        return (
            <div className="ml-home">
                
                <Breadcrumb filters={this.state.filters}/>

                <div className="content-results-ml">
                    {
                        this.state.products.map( ( product , key ) => 
                            <Item 
                                key={key}
                                id={product.id}
                                image={product.thumbnail}
                                price={product.price}
                                title={product.title}
                                address={product.address.state_name}/>

                        )
                    }
                </div>
            </div>
        );
    }
}

export default SearchResults;
