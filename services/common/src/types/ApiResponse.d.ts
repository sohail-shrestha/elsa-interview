type ApiResponse<T = undefined> = {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
};
export { ApiResponse };
