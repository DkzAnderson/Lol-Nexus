import {  useEffect, useState } from 'react'
import { getChampions } from '../../Services/api';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { BiSolidCategory } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RxDoubleArrowUp } from "react-icons/rx";
import CustomSelect from './Select';


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
    const [allChampions,setAllChampions] = useState<any>([])
    const [loading,setLoading] = useState(true);
    const [listType,setListType] = useState(false);

    const options = [
        { value: 'all', label: 'Todos'},
        { value: 'Fighter', label: 'Luchador' },
        { value: 'Mage', label: 'Mago' },
        { value: 'Assassin', label: 'Asesino' },
        { value: 'Tank', label: 'Tanque' },
        { value: 'Support', label: 'Soporte' },
        { value: 'Marksman', label: 'Tirador' }
    ];

    const handleSelectChange = (value: string) => {
        FilterChampionsByTag(allChampions,value)
    };

    const FilterChampionsByTag = (champions: Champion[], tag: string) => {
        
        if(tag === 'all'){
            setChampions(allChampions);
        } else {
            const filterData = champions.filter(champion => champion.tags.includes(tag));
            setChampions(filterData);
        }
    };

    const FilterChampionsByName = (champions: Champion[], value: React.ChangeEvent<HTMLInputElement>) => {
        const input = value.target.value.toLowerCase();
        if (input.length > 2) {
            const filterData = champions.filter(champion => 
                champion.name.toLowerCase().includes(input) || 
                champion.id.toLowerCase().includes(input)
            );
            setChampions(filterData);
        } else {
            setChampions(allChampions);
        }
    }

    const ScrollToTop = ()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    

    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await getChampions();
            if(data){
                setChampions(Object.values(data.data));
                setAllChampions(Object.values(data.data));
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
        <div className='w-full relative min-h-screen flex flex-col gap-5 items-center justify-start'>
            {/* Barra de Busqueda / filtrar / tipo de lista */}
            <div className='w-full grid grid-cols-2 grid-rows-2 sm:grid-cols-6 lg:grid-cols-7 sm:grid-rows-1 md:grid-rows-1 gap-y-2 sm:gap-x-2 pt-8 px-4'>

                <div className='relative size-full flex bg-nd rounded-lg col-span-2'>
                    <input
                        className='h-full w-[90%] p-2 text-lg md:text-base outline-none'
                        placeholder='buscar'
                        type="text"
                        onChange={(e) => FilterChampionsByName(allChampions, e)}
                    />
                    <span className='absolute right-2 top-2.5 text-3xl md:text-2xl md:top-3'>
                        <IoSearch />
                    </span>
                </div>
                
                <div className='size-full sm:col-span-2 md:col-start-4 lg:col-start-5'>
                    <CustomSelect
                        options={options}
                        onChange={handleSelectChange}
                    />
                </div>

                <div className='flex h-12 md:h-10 text-gray-400 text-4xl md:text-2xl place-self-end'>
                    <button
                        className={` p-2 ${listType ? 'bg-nd text-txt' : 'bg-card-bg'} rounded-l-lg`}
                        onClick={() => setListType(true)}
                    >
                        <FaListUl />
                    </button>

                    <button
                        className={`p-2 ${listType ? 'bg-card-bg' : 'bg-nd text-txt'} rounded-r-lg`}
                        onClick={() => setListType(false)}
                    >
                        <BiSolidCategory />
                    </button>


                </div>

            </div>

            {/* Lista de resultados */}
            {champions.length > 0 ?
                <ul className={`size-full ${listType ? 'px-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-2' : 'grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 px-4 gap-2'}  text-txt`}>
                    {champions.map((champion: any) => (
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
                :
                <div className='w-full h-96 flex items-center justify-center'>
                    <h1 className='text-4xl text-center text-txt font-bold'>
                        No se encontraron resultados.
                    </h1>
                </div>
            }

            <button className='fixed text-4xl text-txt bg-nd rounded-full z-50 p-2 bottom-16 left-4'
                onClick={ScrollToTop}
            >
                <RxDoubleArrowUp />
            </button>
        </div>
    )
}
