import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cake: {}
		};
	}

	componentDidMount() {
		axios.get('/api/cake/' + this.props.match.params.id).then((res) => {
			this.setState({ cake: res.data });
			console.log(this.state.cake);
		});
	}
	onChange = (e) => {
		const state = this.state.cake;
		state[e.target.name] = e.target.value;
		this.setState({ cake: state });
	};
	onSubmit = (e) => {
		e.preventDefault();

		const { name, imageUrl } = this.state.cake;

		axios.put('/api/cake/' + this.props.match.params.id, { name, imageUrl }).then((result) => {
			this.props.history.push('/show/' + this.props.match.params.id);
		});
	};

	render() {
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">EDIT CAKE</h3>
					</div>
					<div className="panel-body">
						<h4>
							<Link to={`/show/${this.state.cake._id}`}>
								<span className="glyphicon glyphicon-eye-open" aria-hidden="true" /> Cake List
							</Link>
						</h4>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label>NAME:</label>
								<input
									type="text"
									className="form-control"
									name="name"
									value={this.state.cake.name}
									onChange={this.onChange}
									placeholder="NAME"
								/>
							</div>
							<div className="form-group">
								<label for="title">imageUrl:</label>
								<input
									type="text"
									className="form-control"
									name="imageUrl"
									value={this.state.cake.imageUrl}
									onChange={this.onChange}
									placeholder="imageUrl"
								/>
							</div>

							<button type="submit" className="btn btn-default">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Edit;
