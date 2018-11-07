import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Create from './components/layout/Create';
import Show from './components/layout/Show';
import Edit from './components/layout/Edit';
import Comments from './components/layout/CommentYumfactor';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<Route component={Landing} />
					<div className="container">
						<Route path="/edit/:id" component={Edit} />
						<Route exact path="/create" component={Create} />
						<Route exact path="/show/:id" component={Show} />
						<Route exact path="/commentYumfactor/:id" component={Comments} />
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
