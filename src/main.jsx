import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Protected from './component/AuthLayout.jsx'
import Login from './component/Login.jsx'
import Home from './Pages/Home.jsx'
import Signup from './component/Signup.jsx'
import AllPost from './Pages/AllPost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Post from './Pages/Post.jsx'
import AddPost from './Pages/AddPost.jsx'
const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            // Here Today I Learned Very imporant Topic very Routing is Based on the Authentication or Conditins 
          {
            path:'/',
            element:<Home/>
          },
          {
            path:'/login',
            element:(
                // Here Today WE Learned About the Imporatnt topic Named How to Need to Router 
                // Authentication Menas 
              <Protected authentication={false}>
                <Login/>
              </Protected>
            ),
          },
          {
            path:'/signup',
            element:(
                // Where evr the Authentication Fase Menas ThereAnd All We Need the Authenticaion
                <Protected authentication={false}>
                    <Signup/>
                </Protected>
            )
          },
          {
            path:'/all-posts',
            element:(
                //  Authetication True MAtlab 
                <Protected authentication={true}>
                    <AllPost/>
                </Protected>
            )
          },
        
          {
            path:'/edit-post/:slug',
            element:(
                <Protected authentication={true}>
                    <EditPost/>
                </Protected>
            )
          },
          {
            path:'/post/:slug',
            element:<Post/>

            
          },{
            path:'/add-post',
            element:(
              <Protected>
                <AddPost/>
              </Protected>
            )
          }
            
        ]
    },

])
createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
   <RouterProvider router={router}/>
    </Provider>
   
 
)
