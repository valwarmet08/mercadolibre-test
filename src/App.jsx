import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Layouts
import MainLayout from './layouts/MainLayout';
//Layouts

//Pages
import Home from './pages/Home.jsx';
import DetailProduct from './pages/DetailProduct.jsx';
import SearchResults from './pages/SearchResults.jsx';
import NotFound from './pages/NotFound.jsx';
//Pages

const AppRoute = ({ component:Component , layout:Layout ,...rest  } ) => (
    <Route {...rest} render={props=> (
        <Layout > <Component {...props}></Component></Layout>
    )}></Route>
);

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter basename="/">
                <Switch>
                    <AppRoute path="/" exact layout={MainLayout} component={Home} />
                    <AppRoute path="/items" exact layout={MainLayout}  component={SearchResults} />
                    <AppRoute path="/item/:id" exact layout={MainLayout} component={DetailProduct} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}
