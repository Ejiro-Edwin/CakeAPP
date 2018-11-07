import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Img from 'react-image';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cakes: []
		};
	}

	componentDidMount() {
		axios.get('/api/cake').then((res) => {
			this.setState({ cakes: res.data });
			console.log(this.state.cakes);
		});
	}

	render() {
		return (
			<div className="landing">
				<div className="container">
					<br />
					<Link to="/create">
						<button className="btn btn-primary" aria-hidden="true">
							{' '}
							Add Cake
						</button>
					</Link>{' '}
					<div className="row">
						{this.state.cakes.map((cake) => (
							<div
								key={cake._id}
								className="card"
								style={{ width: '15rem', marginRight: '10px', marginTop: '10px' }}
							>
								<Link to={`/Show/${cake._id}`}>
									<img className="card-img-top" src={cake.imageUrl} alt="Cake image" />
									<div className="card-body">
										<h5 className="card-title">{cake.name}</h5>
									</div>
								</Link>
								<Link to={`/CommentYumfactor/${cake._id}`} className="btn btn-primary">
									Comment Here
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
