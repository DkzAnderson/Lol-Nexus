
export const BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/12.8.1';

interface ChampionData {
  id: string;
  name: string;
  spells: Spell[];
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
  image: string;
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

export interface Passive {
  description: string;
  image: {
    full: string;
    group: string;
    sprite: string;
    h: number;
    w: number;
    x: number;
    y: number;
  }
}



interface Spell {
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




