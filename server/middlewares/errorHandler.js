

function errorHandler(err, req, res, next){
    let status = err.status || 500
    let message = err.msg || "Internal Server Error"

    console.log(err);
    switch (err.name){
        case "EmailPasswordRequired":
            status = 400
            message = "Email/Password is required"
        break;
        case "SequelizeValidationError":
            status = 400
            message = err.errors[0].message
        break;
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
        break;
        case "InvalidEmailPassword":
            status = 401
            message = "Email and Password didn't match"
        break;
        case "NotFound":
            status = 404
            message = "Not Found"
        break;
        case "Forbidden":
            status = 403
            message = "Forbidden"
        break;
        case "Unauthorized":
            status = 401
            message = "User not found"
        break;
        case "Duplicated":
            status = 409
            message = "Product already in your wishlist"
        break;
    }

    res.status(status).json({msg: message})
}

module.exports = errorHandler
