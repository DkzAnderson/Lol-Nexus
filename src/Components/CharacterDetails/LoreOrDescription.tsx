import { useEffect, useState } from "react";

interface Props {
  lore: string;
  description: string;
}



export const LoreOrDescription: React.FC< Props > = ({lore,description}) => {
  
  const [showLore,setShow] = useState <boolean>(false);
  const [info,setInfo] = useState< string >('')
  



  useEffect(()=>{
    setInfo(description)
  },[lore,description])
  
  return (
    <div className="size-full flex">
      <div className="w-full flex flex-col">
        <span className="flex w-full h-14 text-white shadow-[0px_2px_4px_0px] md:shadow-[0px_0px_8px_0px] rounded shadow-nd">
          <button 
            className={`w-full text-center  ${showLore == false ? 'bg-nd font-bold' : 'cursor-pointer hover:bg-interaction'} duration-300`}
            onClick={()=>{
              setShow(false)
              setInfo(description)
            }}
          >
            <h1 className="text-lg">
              Descripción
            </h1>
          </button>

          <button 
            className={`w-full text-center ${showLore ? 'bg-nd font-bold' : 'cursor-pointer hover:bg-interaction'} duration-300`}
            onClick={()=>{
              setShow(true)
              setInfo(lore)
            }}
          >
            <h1 className="text-lg">
              Lore
            </h1>
          </button>
        </span>
        <p className="p-4 text-txt font-light">
          {info}
        </p>
      </div>
    </div>
  )
}
