import { Outlet } from "react-router-dom";
import { NavBar } from "./Components/NavBar/NavBar";


function App() {


  return (
    <main className="flex flex-col pt-[10vh] pb-24 items-center justify-center w-full min-h-screen bg-st">
      <NavBar/>
      <Outlet/>
    </main>
  )
}

export default App
