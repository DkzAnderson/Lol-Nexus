import { useEffect, useState } from 'react'
import { getChampions } from '../../Services/api';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { BiSolidCategory } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";

export interface Champion {
    version: string;
    id: string;
    key: string;
    name: string;
    title:string;
    blurb:string;
    info:{
        attack: number,
        defense: number,
        magic: number,
        difficulty: number
    };
    image: {
        "full": string,
        "sprite": string,
        "group": string,
        "x": number,
        "y": number,
        "w": number,
        "h": number
    };
    tags: string[];
    partype: string;
    stats: {
        "hp": number,
        "hpperlevel": number,
        "mp": number,
        "mpperlevel": number,
        "movespeed": number,
        "armor": number,
        "armorperlevel": number,
        "spellblock": number,
        "spellblockperlevel": number,
        "attackrange": number,
        "hpregen": number,
        "hpregenperlevel": number,
        "mpregen": number,
        "mpregenperlevel": number,
        "crit": number,
        "critperlevel": number,
        "attackdamage": number,
        "attackdamageperlevel": number,
        "attackspeedperlevel": number,
        "attackspeed": number
    }
}













export const CharacterList = () => {

    const [champions, setChampions] = useState<any>([]);
    const [loading,setLoading] = useState(true);
    const [listType,setListType] = useState(false);

    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await getChampions();
            console.log(data)
            if(data){
                setChampions(Object.values(data.data));
            }

            setLoading(false);
        }

        fetchData();
    },[])

    if(loading){
        return(
            <div className='w-full min-h-screen flex items-center justify-center'>
                <h1 className='text-txt animate-pulse'>
                    Cargando...
                </h1>
            </div>
        )
    }


  return (
    <div className='w-full min-h-screen flex flex-col gap-5 items-center justify-center'>
        
        <div className='flex w-full px-5 text-gray-400 text-4xl pt-10'>
            <button
                className={`p-2 ${listType ? 'bg-nd text-txt' : 'bg-card-bg'} rounded-l-lg`}
                onClick={()=>setListType(true)}
            >
                <FaListUl/>
            </button>

            <button
                className={`p-2 ${listType ? 'bg-card-bg' : 'bg-nd text-txt'} rounded-r-lg`}
                onClick={()=>setListType(false)}
            >
                <BiSolidCategory/>
            </button>
            
            
        </div>
        
        <ul className={`size-full ${listType ? 'flex flex-col' : 'grid grid-cols-2 px-4'} gap-2 text-txt`}>
            {champions.map((champion:any)=>(
                <li
                    key={champion.id}
                    className='size-full'
                >
                    <CharacterCard
                       data={champion}
                       showType={listType}
                    />
                </li>
            ))}
        </ul>
    </div>
  )
}
