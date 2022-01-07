class ErrorResponse extends Error
{
    constructor({ message, statusCode = 400, result = false, success=false}={})
    {
        super(message);
        this.statusCode = statusCode;
        this.result = result;
        this.success = success;
    }
}

module.exports = ErrorResponse;