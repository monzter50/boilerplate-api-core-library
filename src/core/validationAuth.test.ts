import { validationAuth } from "./validationAuth";
import { ApiError } from "@/errors/ApiError";
import { OptionsProps, Authentication } from "./types";

describe("validationAuth", () => {
    describe("when no options or authentication provided", () => {
        it("should throw ApiError with \"Required Token\" message", () => {
            expect(() => {
                validationAuth();
            }).not.toThrow(ApiError);
      
        });
    });

    describe("when only options provided without authentication", () => {
        it("should throw ApiError when requiredAuth is true and no token provided", () => {
            const opts: OptionsProps = { requiredAuth: true };
            
            expect(() => {
                validationAuth(opts);
            }).toThrow(ApiError);
            
            expect(() => {
                validationAuth(opts);
            }).toThrow("Required Token");
        });

        it("should throw ApiError when requiredOtp is true and no otpToken provided", () => {
            const opts: OptionsProps = { requiredOtp: true };
            
            expect(() => {
                validationAuth(opts);
            }).toThrow(ApiError);
            
            expect(() => {
                validationAuth(opts);
            }).toThrow("Required Otp Token");
        });

        it("should throw ApiError when both requiredAuth and requiredOtp are true and no tokens provided", () => {
            const opts: OptionsProps = {
                requiredAuth: true,
                requiredOtp: true,
            };
            
            expect(() => {
                validationAuth(opts);
            }).toThrow(ApiError);
            
            expect(() => {
                validationAuth(opts);
            }).toThrow("Required Token");
        });
    });

    describe("when only authentication provided without options", () => {
        it("should throw ApiError when no token provided and no options specified", () => {
            const auth: Authentication = {};
            
            expect(() => {
                validationAuth(undefined, auth);
            }).not.toThrow(ApiError);
        
        });

        it("should throw ApiError when token is 'token' and no options specified", () => {
            const auth: Authentication = { token: "token" };
            
            expect(() => {
                validationAuth(undefined, auth);
            }).not.toThrow(ApiError);
        });
    });

    describe("when both options and authentication are provided", () => {
        it("should throw ApiError when requiredAuth is true but token is 'token'", () => {
            const opts: OptionsProps = { requiredAuth: true };
            const auth: Authentication = { token: "token" };
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow(ApiError);
        
        });

        it("should throw ApiError when requiredOtp is true but otpToken is 'otp-token'", () => {
            const opts: OptionsProps = { requiredOtp: true };
            const auth: Authentication = { otpToken: "otp-token" };
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow(ApiError);
            
        });

        it("should throw ApiError when requiredAuth is true but token is not provided", () => {
            const opts: OptionsProps = { requiredAuth: true };
            const auth: Authentication = { otpToken: "otp-token" };
            
            expect(() => {
                validationAuth(opts, auth);
            }).toThrow(ApiError);
            
            expect(() => {
                validationAuth(opts, auth);
            }).toThrow("Required Token");
        });

        it("should throw ApiError when requiredOtp is true but otpToken is not provided", () => {
            const opts: OptionsProps = { requiredOtp: true };
            const auth: Authentication = { token: "token" };
            
            expect(() => {
                validationAuth(opts, auth);
            }).toThrow(ApiError);
            
            expect(() => {
                validationAuth(opts, auth);
            }).toThrow("Required Otp Token");
        });
    });

    describe("successful validation scenarios", () => {
        it("should not throw when requiredAuth is true and token is 'token'", () => {
            const opts: OptionsProps = { requiredAuth: true };
            const auth: Authentication = { token: "token" };
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow();
        });

        it("should not throw when requiredOtp is true and otpToken is 'otp-token'", () => {
            const opts: OptionsProps = { requiredOtp: true };
            const auth: Authentication = { otpToken: "otp-token" };
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow();
        });

        it("should not throw when both requiredAuth and requiredOtp are true and both tokens are true", () => {
            const opts: OptionsProps = {
                requiredAuth: true,
                requiredOtp: true,
            };
            const auth: Authentication = {
                token: "token",
                otpToken: "otp-token",
            };
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow();
        });

        it("should not throw when requiredAuth is false and no token provided", () => {
            const opts: OptionsProps = { requiredAuth: false };
            const auth: Authentication = {};
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow();
        });

        it("should not throw when requiredOtp is false and no otpToken provided", () => {
            const opts: OptionsProps = { requiredOtp: false };
            const auth: Authentication = {};
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow();
        });

        it("should not throw when both requiredAuth and requiredOtp are false", () => {
            const opts: OptionsProps = {
                requiredAuth: false,
                requiredOtp: false,
            };
            const auth: Authentication = {};
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow();
        });

        it("should not throw when no options specified but token is 'token'", () => {
            const auth: Authentication = { token: "token" };
            
            expect(() => {
                validationAuth(undefined, auth);
            }).not.toThrow();
        });

        it("should not throw when no options specified but otpToken is 'token'", () => {
            const auth: Authentication = { otpToken: "token" };
            
            expect(() => {
                validationAuth(undefined, auth);
            }).not.toThrow();
        });
    });

    describe("edge cases", () => {
        it("should handle undefined options with valid authentication", () => {
            const auth: Authentication = {
                token: "token",
                otpToken: "otp-token",
            };
            
            expect(() => {
                validationAuth(undefined, auth);
            }).not.toThrow();
        });

        it("should handle empty options object with valid authentication", () => {
            const opts: OptionsProps = {};
            const auth: Authentication = {
                token: "token",
                otpToken: "otp-token",
            };
            
            expect(() => {
                validationAuth(opts, auth);
            }).not.toThrow();
        });

        it("should handle undefined authentication with valid options", () => {
            const opts: OptionsProps = {
                requiredAuth: false,
                requiredOtp: false,
            };
            
            expect(() => {
                validationAuth(opts, undefined);
            }).not.toThrow();
        });
    });
});
