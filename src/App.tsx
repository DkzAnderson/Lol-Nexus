import { Outlet } from "react-router-dom";
import { NavBar } from "./Components/NavBar/NavBar";


function App() {


  return (
    <main className="flex flex-col pt-[10vh] pb-24 md:pt-20 items-center w-full min-h-screen bg-st">
      <NavBar/>
      <div className="size-full max-w-[1024px]">
        <Outlet/>
      </div>
      
    </main>
  )
}

export default App
