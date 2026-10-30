import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Notfound from "./Pages/Notfound/Notfound";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import PostDetails from "./Pages/PostDetails/PostDetails";
import {useNetworkState }from "react-use"
import Offline from './Components/Offline/Offline';
import { Toaster } from 'react-hot-toast';
import PostEdit from "./Pages/PostEdit/PostEdit";


const query = new QueryClient
const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home/></ProtectedRoute> },
      { path: "home", element:<ProtectedRoute><Home/></ProtectedRoute>},
      { path: "profile", element:<ProtectedRoute><Profile/></ProtectedRoute>},
      { path: "postdetails/:id", element:<ProtectedRoute><PostDetails/></ProtectedRoute>},
      { path: "postedit/:id", element:<ProtectedRoute><PostEdit/></ProtectedRoute>},
      { path: "login", element: <Login/> },
      { path: "register", element:<Register/> },
      { path: "notfound", element: <Notfound/> },
    ],
  },
]);
function App() {
  const {online} = useNetworkState()
  
  return (
    <>
    {!online&& <Offline/>}
    <QueryClientProvider client={query}>
       <AuthContextProvider>
        <Toaster />
      <RouterProvider router={routers}></RouterProvider>
      </AuthContextProvider>
    </QueryClientProvider>
   
        
    </>
  );
}

export default App;
