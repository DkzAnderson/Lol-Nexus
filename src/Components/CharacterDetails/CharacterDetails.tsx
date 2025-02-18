import { useEffect, useState } from 'react'
import { getChampionDetails } from '../../Services/api'
import { useParams } from 'react-router-dom'
import { SkillsList } from './SkillsList'
import { ImageSlider } from './ImageSlider'
import { LoreOrDescription } from './LoreOrDescription'
import { Tips } from './Tips'


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
                if(data != undefined){
                    setSkins(data.skins)
                    data != undefined && skills.unshift(data.passive)
                    skills != undefined && setSkills(skills)
                    setChampionData(data)
                }

            }
        }


        fetchData();
        // Lleva al usuario a la parte superior de la pantalla
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    if (championData != undefined) {
        return (
            <section className=' w-full min-h-screen'>
                <div className='flex flex-col gap-5 items-center'>
                    {/* Header */}
                    <div className='relative grid sm:grid-rows-1 sm:grid-cols-2 w-full sm:h-96 shadow-[0px_2px_8px_0px] shadow-transparent sm:shadow-nd md:rounded md:px-1 md:overflow-hidden'>
                        {/* Top */}
                        <div className='relative size-full grid grid-cols-2 sm:grid-cols-1 sm:grid-rows-[65%_35%] items-center px-4 py-20 sm:py-0'>
                            <img
                                className='object-cover absolute size-full top-0 left-0 z-0 opacity-40 sm:hidden'
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${params.id}_0.jpg`}
                                alt={`${championData.id}-poster`}
                            />
                            <picture className='flex z-10 size-40 rounded-full overflow-hidden border-4 border-interaction justify-self-center'>
                                <img
                                    className='size-full object-cover'
                                    src={`https://ddragon.leagueoflegends.com/cdn/${params.version}/img/champion/${params.id}.png`}
                                    alt={`${championData.name}-poster`}
                                />
                            </picture>

                            <span className='z-10 flex flex-col justify-end pb-6 size-full'>
                                <h1 className='mb-4 text-txt text-3xl font-bold'>
                                    {championData.name}
                                </h1>

                                <h4 className='text-txt leading-none text-lg'>
                                    {championData.title}
                                </h4>
                            </span>
                        </div>
                        {/* Bottom */}
                        <div className='flex size-full'>

                            {/* Skills */}

                            <SkillsList
                                skills={skills}
                            />
                        </div>
                        {/* Fondo */}
                        <img
                            className='object-cover hidden sm:flex absolute size-full top-0 left-0 z-0 opacity-40'
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${params.id}_0.jpg`}
                            alt=""
                        />

                    </div>
                    {/* Description & Tips */}
                    <div className='mt-5 flex flex-col gap-8 md:grid md:grid-cols-2'>
                    {/* Descripción */}
                        <div>
                            <LoreOrDescription
                                lore={championData.lore}
                                description={championData.blurb}
                            />
                        </div>
                        {/* Tips */}
                        <div>
                            <Tips
                                allyTips={championData.allytips}
                                enemyTips={championData.enemytips}
                            />
                        </div>
                    </div>
                    {/* Skins */}
                    {skins != undefined &&
                        <div className='flex w-full max-w-[620px] mt-10'>
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
