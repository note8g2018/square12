class ErrorResponse extends Error
{
    constructor({message, statusCode=400, result=false, seccuss=false}={})
    {
        super(message);
        this.statusCode = statusCode;
        this.result = result;
        this.seccuss = seccuss;
    }
}

module.exports = ErrorResponse;