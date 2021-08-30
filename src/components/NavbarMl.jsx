
import React, { Component } from 'react';


class NavbarMl extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	handlerSubmitSearch = ( event ) =>{
        event.preventDefault();
		let form = event.currentTarget;
        if( form["search-ml"].value != "" ){
            window.location.href = `${window.location.origin}/items?search=${form["search-ml"].value}`
        }
    }

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg bg-ml-navbar">
					<div className="container-fluid container">
						
						<a className="navbar-brand" href="/">
							<img 
								src="/assets/Logo_ML@2x.png" 
								alt="" 
								width={60} 
								height={40} 
								className="d-inline-block align-text-top" />
						</a>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<form onSubmit={this.handlerSubmitSearch} className="d-flex search-ml">

								{/* <div className="input-group mb-3">
									<input 
										type="text" 
										id="search-ml"
										className="form-control" 
										placeholder="Recipient's username" 
										/>
									<span class="input-group-text" >
										<img 
											src="/assets/ic_Search@2x.png" 
											alt="" 
											width={17} 
											height={17} 
											/>
									</span>
								</div> */}

								<input 
									id="search-ml"
									className="form-control me-2 " 
									type="text" 
									placeholder="Nunca dejes de buscar" 
									aria-label="Search" />

								<button className="btn btn-light" type="submit">
									<img 
										src="/assets/ic_Search@2x.png" 
										alt="" 
										width={17} 
										height={17} 
										/>
								</button>
							</form>
						</div>
					</div>
				</nav>

			</div>
		);
	}
}

export default NavbarMl;