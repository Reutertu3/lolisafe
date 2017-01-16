const config = require('../config.js')
const routes = require('express').Router()
const uploadController = require('../controllers/uploadController')
const galleryController = require('../controllers/galleryController')

routes.get ('/check', (req, res, next) => {
	return res.json({token: config.TOKEN})
})

routes.get('/info', (req, res, next) => {

	if(config.TOKEN === true)
		if(req.headers.auth !== config.clientToken)
			return res.status(401).send('not-authorized')
		
	return res.json({
		maxFileSize: config.uploads.maxsize.slice(0, -2)
	})
})

routes.get  ('/uploads', (req, res, next) => uploadController.list(req, res))
routes.post ('/upload', (req, res, next) => uploadController.upload(req, res, next))
routes.get  ('/gallery', (req, res, next) => galleryController.list(req, res, next))
routes.get  ('/gallery/test', (req, res, next) => galleryController.test(req, res, next))

module.exports = routes
