var express = require('express');
var	http = require('http');
var xmlToJs = require('xml-js');
const { body, validationResult } = require('express-validator/check');
var router = express.Router();

/* GET products. */
router.get('/inventory', function(req, res, next) {
  	
  	const options = {
	    host: "www.partechgss.com",
	    path: "/inventory",
	    method: "GET"
	};

	const httpReq = http.request(options, (reqRes)=>{
		let xmlData = "";

		reqRes.on('data', (data)=>{
			xmlData += data;
		});
		reqRes.on('end', ()=>{
			
			const result = xmlToJs.xml2js(xmlData, {compact: true});

			res.status(200).json({status:'Success', data: result});
		})
	});
	httpReq.write("");
	httpReq.end();
});

/* checkout products  */
router.post('/checkout',body(['products']).not().isEmpty(), function(req, res, next) {
  	
  	const errors = validationResult(req);
	if(errors.isEmpty()){
		res.status(200).json({status:'Success'});
	}
	else{
		res.status(400);
		res.json({status:'Error'});
	}
  	
});

module.exports = router;
