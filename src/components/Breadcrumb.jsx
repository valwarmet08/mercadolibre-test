import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {
                        this.props.filters.map( ( filter , key ) => 
                            <li id={filter.id} key={key} className="breadcrumb-item">
                                {filter.name}
                            </li>
                        )
                    }
                </ol>
            </nav>
        )
    }

}

Breadcrumb.propTypes = {
    filters: PropTypes.array,
};

export default Breadcrumb;