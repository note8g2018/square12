

const testPrivate = async (req, res, next)=>{
    res.status(200).json({
        success: true,
        data: "You got access to privat data baby loooooool in this route",
    });
}


module.exports = testPrivate;