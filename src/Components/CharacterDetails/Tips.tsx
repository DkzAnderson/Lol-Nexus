import { useEffect, useState } from 'react'

interface Props {
    allyTips: string[];
    enemyTips: string[];
}

export const Tips: React.FC< Props > = ({allyTips, enemyTips}) => {
    const [allyIsShow, setShow] = useState(false);
    const [info,setInfo] = useState<string[]>(allyTips);


    useEffect(()=>{
        setInfo(enemyTips);
    },[])

  return (
    <div className='size-full flex'>
        <div className='flex flex-col w-full'>
            <span className='flex text-white w-full h-14 shadow-[0px_2px_4px_0px] md:shadow-[0px_0px_8px_0px] rounded shadow-nd'>
                <button
                        className={`w-full px-4 text-center ${allyIsShow == false ? 'bg-nd font-bold' : 'cursor-pointer hover:bg-interaction'} duration-300`}
                        onClick={()=>{
                            setShow(false)
                            setInfo(enemyTips)
                        }}
                    >
                        Consejos sobre enemigos
                    </button>
                <button
                    className={`w-full px-4 text-center ${allyIsShow ? 'bg-nd font-bold' : 'cursor-pointer hover:bg-interaction'} duration-300`}
                    onClick={()=>{
                        setShow(true)
                        setInfo(allyTips)
                    }}
                >
                    Consejos de aliados
                </button>
            </span>
            {info.length > 0 ?
                            <ul className='w-full flex flex-col overflow-auto p-4 px-8 gap-4 list-disc'>

                            {info.map((data,i)=>(
                                <li
                                    className='text-white'
                                    key={i}
                                >
                                    <h4 className='font-light'>
                                        {data}
                                    </h4>
                                </li>
                            ))}
                        </ul>
                        :
                        <div className='flex w-full h-42 items-center justify-center px-10'>
                            <h1 className='text-2xl text-txt font-bold text-center'>
                                Sin consejos para este campeón actualmente.
                            </h1>
                        </div>
            }


        </div>
    </div>
  )
}
