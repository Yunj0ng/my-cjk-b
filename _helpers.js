function getUser(req){
	console.log(req.user)
	return req.user
}

module.exports={
	getUser
}