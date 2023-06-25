class AppError extends Error {
    // message:string
    statusCode:Number
    isOperational:boolean
    status:string
    constructor( message:string,statusCode:Number) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export {AppError}
  