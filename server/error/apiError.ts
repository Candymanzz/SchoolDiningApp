export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(message: string): ApiError {
        return new ApiError(404, message);
    }

    static internal(message: string): ApiError {
        return new ApiError(500, message);
    }

    static forbidden(message: string): ApiError {
        return new ApiError(403, message);
    }
}
