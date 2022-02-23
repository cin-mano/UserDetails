const jwt=require("jsonwebtoken");

exports.checkToken=(req,res,next)=>{
    jwt.verify(req.headers.token,"jwt", function (err, decoded) {
        if (err) {
            console.log(err);
            return res.status(200).json({
                httpCode: 200,
                code: 302,
                message: 'Please login again.'
            });
        
        }
        else {
            req.userId = decoded.id;
            // console.log(decoded);
            next();
        }
    })
}