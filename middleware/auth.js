const passport = require('../config/passport')


const authenticator = (req,res,next)=>{
	passport.authenticate('jwt', {session:false}, (err,user)=>{
		if(err || !user) return res.status(401).json({success:false, message:'unauthorized'})
		req.user = user //重新設定req.user 傳給下個middleware
		next()
	})(req,res,next)
}

module.exports ={
	authenticator
}