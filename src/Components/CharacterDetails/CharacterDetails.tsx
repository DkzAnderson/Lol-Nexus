import { useEffect, useState } from 'react'
import { getChampionDetails } from '../../Services/api'
import { useParams } from 'react-router-dom'
import { SkillsList } from './SkillsList'
import { ImageSlider } from './ImageSlider'
/*
const checkImageExists = (url:string) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
};

*/

interface Skin {
    chromas: boolean;
    id: string;
    name: string;
    num: number;
  }

export const CharacterDetails = () => {
    const [championData, setChampionData] = useState<any>(undefined)
    const [skills, setSkills] = useState<any>(undefined)
    const [skins , setSkins] = useState<Skin[] | undefined>(undefined)

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (params.id != undefined) {
                const data = await getChampionDetails(params.id)
                let skills: any[] = data != undefined ? data.spells : [];

                console.log(data)
                if(data != undefined){
                    setSkins(data.skins)
                    console.log(data.skins)
                    data != undefined && skills.unshift(data.passive)
                    skills != undefined && setSkills(skills)
                    setChampionData(data)
                }

            }


        }


        fetchData();
    }, [])

    if (championData != undefined) {
        return (
            <section className='w-full min-h-screen'>
                <div className='flex flex-col gap-5'>
                    {/* Header */}
                    <div className='flex relative items-end w-full px-4 py-8'>
                        <img
                            className='position object-cover absolute size-full top-0 left-0 z-0 opacity-40'
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${params.id}_0.jpg`}
                            alt=""
                        />
                        <picture className='flex z-10 size-40 rounded-full overflow-hidden border-4 border-interaction'>
                            <img
                                className='size-full object-cover'
                                src={`https://ddragon.leagueoflegends.com/cdn/${params.version}/img/champion/${params.id}.png`}
                                alt={`${championData.name}-poster`}
                            />
                        </picture>
                        <h1 className='mb-4 text-txt z-10 text-3xl font-bold'>
                            {championData.name}
                        </h1>

                    </div>
                        {/* Skills */}
                        <SkillsList
                            skills={skills}
                        />
                    {/* Descripción */}
                    <div className='px-4'>
                        <h2 className='text-txt font-bold text-lg'>
                            Descripción
                        </h2>
                    <p className='text-gray-400'>
                        {championData.blurb}
                    </p>
                    </div>

                    {/* Skins */}
                    {skins != undefined && 
                        <div className='flex w-full'>
                            <ImageSlider
                                skins={skins}
                            />
                        </div>
                    }
                </div>
            </section>
        )
    }


}
