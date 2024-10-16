import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import UserAuth from "./pages/UserAuth";


const route=createBrowserRouter([
    {
        path:'/login',
        element:<Login/>

    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:'/',
        element: <UserAuth><Todo/></UserAuth>   
    }
])
export default route