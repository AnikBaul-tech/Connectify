async function authUserMiddleware(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please Login"
        })
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        req.user = user
        next()
       
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = {
    authUserMiddleware
}