const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Cake model
const Cake = require('../../models/Cake');

// Validation
const validateCakeInput = require('../../validation/cake');
const validateCommentInput = require('../../validation/comment');
const validateYumFactorInput = require('../../validation/yumFactor');
// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Cake Factory Works' }));

// @route   GET api/cake
// @desc    Get cakes
// @access  Public
router.get('/', (req, res) => {
	Cake.find()
		// .sort({ date: -1 })
		.then((cake) => {
			if (!cake) {
				res.status(404).json({ nocakefound: 'No cakes found ' });
			} else {
				res.json(cake);
			}
		})
		.catch((err) => res.status(404).json({ nocakesfound: 'No cakes found' }));
});

// @route   GET api/cake/:id
// @desc    Get cake by id
// @access  Public
router.get('/:id', (req, res) => {
	Cake.findById(req.params.id)
		.then((cake) => {
			if (cake) {
				res.json(cake);
			} else {
				console.log(cake);
				res.status(404).json({ nocakefound: 'No cake found with that ID' });
			}
		})
		.catch((err) => res.status(404).json({ nocakefound: 'No cake found with that ID' }));
});

// @route   POST api/cake
// @desc    Create cake
// @access  Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateCakeInput(req.body);

	// Check Validation
	if (!isValid) {
		// If any errors, send 400 with errors object
		return res.status(400).json(errors);
	}

	const newCake = new Cake({
		name: req.body.name,
		imageUrl: req.body.imageUrl
	});

	newCake.save().then((cake) => res.json(cake));
});

router.put('/:id', (req, res) => {
	const { errors, isValid } = validateCakeInput(req.body);

	// Check Validation
	if (!isValid) {
		// If any errors, send 400 with errors object
		return res.status(400).json(errors);
	}
	const updateCake = Cake.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			imageUrl: req.body.imageUrl
		},
		{ new: true }
	).then((cake) => res.json(cake));
	// if (!updateCake) return res.status(404).send('The Cake with the given ID was not found');

	// res.send(updateCake);
});

// @route   DELETE api/cake/:id
// @desc    Delete cake
// @access  Public
router.delete('/:id', (req, res) => {
	Cake.findById(req.params.id)
		.then((cake) => {
			// Delete
			cake.remove().then(() => res.json({ success: true }));
		})
		.catch((err) => res.status(404).json({ cakenotfound: 'No cake found' }));
});

// @route   POST api/cake/comment/:id
// @desc    Add comment to cake
// @access  Public
router.post('/comment/:id', (req, res) => {
	const { errors, isValid } = validateCommentInput(req.body);

	// Check Validation
	if (!isValid) {
		// If any errors, send 400 with errors object
		return res.status(400).json(errors);
	}

	Cake.findById(req.params.id)
		.then((cake) => {
			const newComment = {
				text: req.body.text
			};

			// Add to comments array
			cake.comments.unshift(newComment);

			// Save
			cake.save().then((cake) => res.json(cake));
		})
		.catch((err) => res.status(404).json({ cakenotfound: 'No cake found' }));
});

// @route   DELETE api/cake/comment/:id/:comment_id
// @desc    Remove comment from cake
// @access  Public
router.delete('/comment/:id/:comment_id', (req, res) => {
	Cake.findById(req.params.id)
		.then((cake) => {
			// Check to see if comment exists
			if (cake.comment.filter((comments) => comments._id.toString() === req.params.comments_id).length === 0) {
				return res.status(404).json({ commentnotexists: 'Comment does not exist' });
			}

			// Get remove index
			const removeIndex = cake.comment.map((item) => item._id.toString()).indexOf(req.params.comments_id);

			// Splice comment out of array
			cake.comment.splice(removeIndex, 1);

			cake.save().then((cake) => res.json(cake));
		})
		.catch((err) => res.status(404).json({ cakenotfound: 'No cake found' }));
});

// @route   POST api/cake/yumFactor/:id
// @desc    Add yumFactor to cake
// @access  Public
router.post('/yumFactor/:id', (req, res) => {
	const { errors, isValid } = validateYumFactorInput(req.body);

	// Check Validation
	if (!isValid) {
		// If any errors, send 400 with errors object
		return res.status(400).json(errors);
	}

	Cake.findById(req.params.id)
		.then((cake) => {
			const newYumFactor = {
				value: req.body.value
			};
			// Add to Yumfactor to post
			cake.yumFactor.unshift(newYumFactor);
			// Save
			cake.save().then((cake) => res.json(cake));
		})
		.catch((err) => res.status(404).json({ cakenotfound: 'No Cake found' }));
});

module.exports = router;
