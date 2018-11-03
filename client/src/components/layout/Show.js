import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Img from 'react-image';

class Show extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cake: []
		};
	}

	componentDidMount() {
		axios.get('/api/cake/' + this.props.match.params.id).then((res) => {
			this.setState({ cake: res.data });
			console.log(this.state.cake);
		});
	}

	delete(id) {
		console.log(id);
		axios.delete('/api/cake/' + id).then((result) => {
			this.props.history.push('/');
		});
	}

	render() {
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-body">
						<h4>
							<Link to="/">
								<button className="btn btn-default" aria-hidden="true">
									{' '}
									Cake List
								</button>
							</Link>
						</h4>
						<div className="card">
							<div className="card-body">
								<h1 className="card-title">{this.state.cake.name}</h1>
								<a href="#" className="btn btn-primary">
									{this.state.cake.name}
								</a>
							</div>
							<Img className="card-img-top" src={this.state.cake.imageUrl} alt="Card image" />
							<Link to={`/edit/${this.state.cake._id}`} class="btn btn-success">
								Edit
							</Link>&nbsp;
							<button onClick={this.delete.bind(this, this.state.cake._id)} class="btn btn-danger">
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Show;
