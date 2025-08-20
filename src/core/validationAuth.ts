import { ApiError } from "@/errors/ApiError";
import { Authentication, OptionsProps } from "./types";

export function validationAuth(opts?:OptionsProps, authentication?:Authentication) {

    if (opts?.requiredAuth && !authentication?.token) {
        throw new ApiError("Required Token");
    }
    if (opts?.requiredOtp && !authentication?.otpToken) {
        throw new ApiError("Required Otp Token");
    }

}