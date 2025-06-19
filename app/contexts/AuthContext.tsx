"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAccessToken, removeTokens, setTokens } from "../lib/tokenStorage";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";
import useSWR from "swr";
import { UserModel } from "../types/types";
import Loader from "../components/Loader";

// Define user roles
export enum UserRole {
  JOBSEEKER = "jobseeker",
  RECRUITER = "recruiter",
}

// Define permission type
export type Permission = "view_jobseeker_pages" | "view_recruiter_pages";

interface AuthContextType {
  user: UserModel | null;
  login: (userData: UserModel, access: string, refresh: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userID: string | null;
  userRole: UserRole | null;
  hasPermission: (permission: Permission) => boolean;
  isJobseeker: () => boolean;
  isRecruiter: () => boolean;
}

interface JWTPayload {
  email: string;
  user_id: string;
  user_role: string;
  iat: string;
  exp: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Map roles to permissions
const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.JOBSEEKER]: ["view_jobseeker_pages"],
  [UserRole.RECRUITER]: ["view_recruiter_pages"],
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const fetcher = (url: string) =>
    api.get(url).then((res) => {
      console.log(res);
      return res.data;
    });

  // Move useSWR to the top level
  const { data: userData, error } = useSWR(
    userID ? `/auth/users/me/` : null,
    fetcher
  );

  useEffect(() => {
    console.log("Checking authentication status");
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        console.log("Access token is available");
        setIsAuthenticated(true);

        const decoded = jwtDecode<JWTPayload>(token);
        console.log("USER ID", decoded.user_id);
        setUserID(decoded.user_id);

        // Set user role from JWT
        if (decoded.user_role) {
          setUserRole(decoded.user_role as UserRole);
        }
      } else {
        setIsAuthenticated(false);
        setUserID(null);
        setUserRole(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  console.log("fetch error ", error);

  // Use another useEffect to set the user when the data is loaded
  useEffect(() => {
    if (userData) {
      console.log("Setting user data", userData);
      setUser(userData);

      // If role not in token, get it from user data
      if (!userRole && userData.role) {
        setUserRole(userData.role as UserRole);
      }
    }
  }, [userData, userRole]);

  // Function to check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    if (!isAuthenticated || !userRole) return false;

    return rolePermissions[userRole].includes(permission);
  };

  // Helper functions for role checks
  const isJobseeker = (): boolean => userRole === UserRole.JOBSEEKER;
  const isRecruiter = (): boolean => userRole === UserRole.RECRUITER;

  // Handle loading state
  if (isLoading) return <Loader />;

  const login = (userData: UserModel, access: string, refresh: string) => {
    setTokens(access, refresh);
    console.log("userData", userData);
    setUser(userData);
    setIsAuthenticated(true);

    // Set the user role on login
    if (userData.role) {
      setUserRole(userData.role as UserRole);
    } else {
      // Try to get role from token
      const decoded = jwtDecode<JWTPayload>(access);
      if (decoded.user_role) {
        setUserRole(decoded.user_role as UserRole);
      }
    }
  };

  const logout = () => {
    console.log("Logging out");
    removeTokens();
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        userID,
        userRole,
        hasPermission,
        isJobseeker,
        isRecruiter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
