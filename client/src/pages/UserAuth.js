
import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "./axiosInstance";


 const UserAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();

    const checkUser = async () => {
        try {
            const response = await axiosInstance.get("/check",);
            setUser(true);
        } catch (error) {
            navigate("/login");
            console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

    return user ? children : null;
};


export default UserAuth