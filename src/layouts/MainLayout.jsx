import React from "react";
import NavbarMl from '../components/NavbarMl';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

export default class MainLayout extends React.Component {
    constructor(props) {
		super(props);
		this.state = {};
    }


    render() {
        return (
            <div className="content-layout-ml">
                
                <NavbarMl />

                <div className="container container-ml"> 
                    {this.props.children}
                </div>
                
            </div>            
        )
    }
}
