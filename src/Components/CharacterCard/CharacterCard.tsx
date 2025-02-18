import { Link } from "react-router-dom";


interface Champion {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: {
        attack: number;
        defense: number;
        magic: number;
        difficulty: number;
    };
    image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
    };
    tags: string[];
    partype: string;
    stats: {
        hp: number;
        hpperlevel: number;
        mp: number;
        mpperlevel: number;
        movespeed: number;
        armor: number;
        armorperlevel: number;
        spellblock: number;
        spellblockperlevel: number;
        attackrange: number;
        hpregen: number;
        hpregenperlevel: number;
        mpregen: number;
        mpregenperlevel: number;
        crit: number;
        critperlevel: number;
        attackdamage: number;
        attackdamageperlevel: number;
        attackspeedperlevel: number;
        attackspeed: number;
    };
}

interface CharacterCardProps {
    data: Champion;
    showType: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ data: champion, showType }) => {

    const image = `https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.id.replace(/\s+/g, '_')}.png`;


    const listStyle = {
        main: 'size-full px-4 flex items-center gap-4 rounded border border-transparent p-0.5 hover:border-interaction',
        image: 'h-full object-contain',
        title: 'text-2xl font-bold'

    }

    const mosaicStyle = {
        main: 'size-full grid grid-rows-[80%_20%] border rounded border-transparent p-0.5 hover:border-interaction',
        image: 'w-full object-contain',
        title: 'text-lg md:text-sm font-bold text-center truncate'
    }

    return (
        <div>
            <Link 
                className={showType ? listStyle.main : mosaicStyle.main}
                to={`/details/${champion.id.replace(/\s+/g, '_')}/${champion.version}`}
            >
                <img
                    className={showType ? listStyle.image : mosaicStyle.image} 
                    src={image} 
                    alt={champion.name} 
                />
                <h1 className={showType ? listStyle.title : mosaicStyle.title}>
                    {champion.name}
                </h1>
            </Link>
        </div>
    );
};
