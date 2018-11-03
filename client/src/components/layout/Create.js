import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			imageUrl: ''
		};
	}
	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { name, imageUrl } = this.state;

		axios.post('/api/cake/register', { name, imageUrl }).then((result) => {
			this.props.history.push('/');
		});
	};
	render() {
		const { name, imageUrl } = this.state;
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">ADD Cake</h3>
					</div>
					<div className="panel-body">
						<h4>
							<Link to="/">
								<button className="btn btn-default" aria-hidden="true">
									{' '}
									Cake List
								</button>
							</Link>
						</h4>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label>Name:</label>
								<input
									type="text"
									class="form-control"
									name="name"
									value={name}
									onChange={this.onChange}
									placeholder="Name"
								/>
							</div>
							<div className="form-group">
								<label>ImageUrl:</label>
								<input
									type="text"
									class="form-control"
									name="imageUrl"
									value={imageUrl}
									onChange={this.onChange}
									placeholder="ImageUrl"
								/>
							</div>

							<button type="submit" class="btn btn-default">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Create;
