import Home from "./Components/Home/Home"
import Login from "./Components/Signin/Login"
import Signup from "./Components/Signup/Signup"




export const routes=[
    {path:"/", element:<Home/>},
    {path:"/login", element:<Login/>},
    {path:"/signup", element:<Signup/>},
]