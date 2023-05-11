import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage, { loader as initialListLoader } from "./Homepage";
import SocietyDashboard from "../../../SocietyDashboard";
import Login from "../login/Login";
import { Navigate } from 'react-router-dom';
import RootLayout from "../../../RootLayout";
import { useState } from "react";
import { AuthProvider } from "../../context";
import { auth } from "../../../config/firebase";
import { useEffect } from "react";
import { AuthContext } from "../../context";
import { useContext } from "react";

function HomepageLayout() {

    const {currentUser} = useContext(AuthContext);
    console.log("layout",currentUser);
    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to='/login' />
    }

    const router = createBrowserRouter([
        {
            path: '/', element: <RootLayout />,
            children: [
                { index:true, element: <RequireAuth><Homepage /></RequireAuth>, loader: initialListLoader },
                { path: 'login', element: <Login />},
                { path: ':societyID', element: <RequireAuth><SocietyDashboard /></RequireAuth> },
            ]
        }
    ])


    return (
        <div className="routerProvider">
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        </div>
    )
}

export default HomepageLayout;