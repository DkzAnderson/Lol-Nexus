import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/index.css'
import App from './App.tsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'; // Cambiado a createHashRouter
import { CharacterDetails } from './Components/CharacterDetails/CharacterDetails.tsx';
import { CharacterList } from './Components/CharacterList/CharacterList.tsx';



const router = createHashRouter([
  {
    path: '/',
    element: <App/>,
    //errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <CharacterList/>
      },
      {
        path: '/champion-list',
        element: <CharacterList/>
      },

      {
        path: '/details/:id/:version',
        element: <CharacterDetails/>
      }
    ]

  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
