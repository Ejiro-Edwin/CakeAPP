import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CommentYumfactor extends Component {
	constructor() {
		super();
		this.state = {
			text: '',
			value: ''
		};
	}
	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	};
	onSubmit = (e) => {
		e.preventDefault();

		const { text, value } = this.state;

		axios.post('/api/cake/comment/' + this.props.match.params.id, { text }).then((result) => {
			this.props.history.push('/');
		});
		axios.post('/api/cake/yumFactor/' + this.props.match.params.id, { value }).then((resuyumlt) => {
			this.props.history.push('/');
		});
	};
	render() {
		const { text, value } = this.state;
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Comment and add yumFactor</h3>
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
								<label>Comment:</label>
								<textArea
									className="form-control"
									name="text"
									onChange={this.onChange}
									placeholder="comment"
									cols="80"
									rows="3"
								>
									{text}
								</textArea>
							</div>
							<div className="form-group">
								<label>yumFactor:</label>
								<input
									type="text"
									className="form-control"
									name="value"
									value={value}
									onChange={this.onChange}
									placeholder="yumFactor"
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

export default CommentYumfactor;
