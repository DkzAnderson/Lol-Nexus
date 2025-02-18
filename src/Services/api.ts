
export const BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/12.8.1';

interface ImageSkillorPassive{
    full: string;
    group: string;
    sprite: string;
    h: number;
    w: number;
    x: number;
    y: number;
}

export interface Passive {
  description: string;
  image: ImageSkillorPassive;
  name: string;
  group: string;
}

interface Skin {
  chromas: boolean;
  id: string;
  name: string;
  num: number;
}



interface ChampionData {
  allytips: string[];
  blurb: string;
  enemytips: string[];
  id: string;
  image:{
    full: string;
    group: string;
    sprite: string;
    h: number;
    y: number;
    x: number;
    w: number;
  };
  info: any;
  key:string;
  lore: string;
  name: string;
  partype: string;
  passive: Passive;
  spells: Spell[];
  recommended: any;
  skins: Skin[];
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
},
tags: string[];
title: string;
}

export interface Skill {
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  dataValues: any;
  description: string;
  effect: any[];
  effectBurn: any[];
  id: string;
  image: ImageSkillorPassive;
  leveltip: any[];
  maxammo: string;
  maxrank: number;
  name: string;
  range:number[];
  rangeBurn: string;
  resource: string;
  tooltip: string;
  vars: any;
}





export interface Spell {
  name: string;
  image: {
    full: string;
  };
}

interface ChampionsResponse {
  data: Record<string, ChampionData>;
}

export const getChampions = async (): Promise<ChampionsResponse | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/data/es_ES/champion.json`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de los campeones');
    }
    const data: ChampionsResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getChampionDetails = async (championId: string): Promise<ChampionData | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/data/es_ES/champion/${championId}.json`);
    if (!response.ok) {
      throw new Error('Error al obtener los detalles del campeón');
    }
    const data = await response.json();
    return data.data[championId] as ChampionData;
  } catch (error) {
    console.error(error);
  }
};




