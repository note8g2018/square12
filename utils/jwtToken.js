

const sendToken = ({user, statusCode, res
}    )=>{
    const token = user.getSignedToken();
    return res.status(statusCode).json({
        result: true,
        success: true,
        statusCode: statusCode,
        isLogin: true,
        token: token,
    });
}

module.exports = sendToken;