// lib/auth.ts
import { config } from "@/config";
import axios from "axios";
import { FormikErrors } from "formik";
import { useRouter } from "next/navigation";
import { UserModel } from "../types/types";
import { createAffiliate } from "./affiliate";
import api from "./api";

interface LoginResponse {
    access: string;
    refresh: string;
    user: UserModel;

    // data: UserModel;
}

interface SignupResponse {
    access: string;
    refresh: string;
    user: UserModel;
}

interface RefreshTokenResponse {
    access: string;
    refresh: string;
}

// export async function login(
//   email: string,
//   password: string
// ): Promise<LoginResponse> {
//   const response = await axios.post<LoginResponse>("/api/auth/signin", {
//     email,
//     password,
//   });
//   console.log("login", response);
//   console.log(response.data);
//   return response.data;
// }

const baseURL = config.url.API_URL;

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
        `${baseURL}/auth/login/`,
        {
            email,
            password,
        }
    );
    console.log(response.data)
    return response.data;
}



// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SignupResponse {
    access: string;
    refresh: string;
    user: UserModel;

}

export async function signup(
    email: string,
    password: string,
    re_password: string,
    becomeAffiliate: boolean = true
): Promise<SignupResponse & { affiliate?: any }> {
    const create_affiliate = true
    const response = await api.post<SignupResponse>(
        `${baseURL}/auth/users/`,
        {
            email,
            password,
            re_password,
            create_affiliate
        }
    );

    // if (becomeAffiliate) {
    //     try {
    //         const affiliate = await createAffiliate({});
    //         return { ...response.data, affiliate };
    //     } catch (error) {
    //         console.error('Affiliate creation failed:', error);
    //         return response.data;
    //     }
    // }

    console.log(response)
    return response.data;
}

// export async function signup(
//     email: string,
//     password: string,
// ): Promise<SignupResponse> {
//     const response = await axios.post<SignupResponse>(
//         `${baseURL}/auth/users/`,
//         {
//             email,
//             password,
//             re_password: password,
//         }
//     );
//     console.log(response);
//     console.log(response.data);
//     return response.data;
// }


export async function refreshToken(
    refreshToken: string
): Promise<RefreshTokenResponse> {
    const response = await axios.post<RefreshTokenResponse>(
        `${baseURL}/auth/jwt/refresh/`,
        {
            // refreshToken,
            refresh: refreshToken,

        }
    );
    // console.log("Refreshed TOKEN!!!!!!!", response.data);
    return response.data;
}




// Define types for the error states
interface Errors {
    password?: string;
    new_password?: string;  // Changed from string[] to string
}

interface Status {
    non_field_errors?: string[];
}

interface PasswordResetResponse {
    detail?: string;
    new_password?: string;  // API response still returns string[]
    non_field_errors?: string[];
}


interface ForgetPasswordResponse {
    detail?: string;
    success: boolean;
}
interface Errors {
    password?: string;
}

export async function forgetPassword(
    email: string,
    setErrors: (errors: FormikErrors<{ email: string; }>) => void
): Promise<boolean> {
    console.log("form submitted");


    try {
        // let response = await fetch(`http://localhost:8000/auth/custom_reset_password/`, {
        // let response = await fetch(`http://localhost:8000/auth/social/google-oauth2/`, {
        let response = await fetch(`http://localhost:8000/auth/users/reset_password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });

        console.log("response:", response);

        if (response.status === 204) {
            console.log("success");
            return true; // Indicates success
        } else {
            let data = await response.json();
            console.log("data:", data);

            console.log("something went wrong");
            console.log(data.detail);
            setErrors({ email: "something went wrong" });
            return false; // Indicates failure
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle any network or fetch-related errors here
        return false; // Indicates failure
    }
};
export async function confirmResetPassword(
    uID: string,
    token: string,
    new_password: string,
    re_new_password: string,
    setErrors: (errors: Errors) => void,
    setStatus: (status: Status) => void
): Promise<boolean> {
    if (!token || !uID) {
        console.log("token or uID is missing");
        return false; // Explicitly return false if required data is missing
    }

    console.log("token", token);
    console.log("uid", uID);

    try {
        const response = await fetch(
            `${baseURL}/auth/users/reset_password_confirm/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: encodeURIComponent(uID),
                    token: encodeURIComponent(token),
                    new_password,
                    re_new_password,
                }),
            }
        );

        console.log("response:", response);

        if (response.status === 204) {
            console.log("success");
            localStorage.setItem("passwordResetSuccess", "true");
            return true;
        } else {
            const data: PasswordResetResponse = await response.json();
            console.log("data:", data);
            console.log("something went wrong");

            if (data.non_field_errors) {
                setStatus({ non_field_errors: data.non_field_errors });
            }
            if (data.new_password) {
                setErrors({ new_password: data.new_password });
            }

            return false; // ✅ Return false if API response is not 204
        }
    } catch (error) {
        console.error("Error:", error);
        setErrors({ new_password: "An error occurred during password reset" });
        return false; // ✅ Return false if an exception occurs
    }
}
