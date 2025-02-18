import { useState } from "react";
import { BASE_URL } from "../../Services/api";

interface ImageSkillOrPassive {
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
  image: ImageSkillOrPassive;
  name: string;
}

export interface Spell {
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
  image: ImageSkillOrPassive;
  leveltip: any[];
  maxammo: string;
  maxrank: number;
  name: string;
  range: number[];
  rangeBurn: string;
  resource: string;
  tooltip: string;
  vars: any;
}

type Skill = Passive | Spell;

interface SkillsListProps {
  skills: Skill[];
}

export const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  const [index, setCurrentIndex] = useState<number>(0);

  const skillLetter = ['P','Q','W','E','R']

  const imageSkillUrl = (image: string) => {
    const url = `${BASE_URL}/img/spell/${image}`;
    return url;
  };

  const imagePassiveUrl = (image: string) => {
    const url = `${BASE_URL}/img/passive/${image}`;
    return url;
  };


  return (
    <div className="grid sm:grid-rows-[auto_80px] lg:grid-rows-[auto_90px] z-20">
      <ul className="grid grid-cols-5 sm:row-start-2 w-full -mt-5 sm:mt-0 border-t-2 sm:border-none border-nd shadow-[0px_0px_6px_0px] shadow-nd sm:shadow-transparent">
        {skills.map((skill, i) => {
          let skillImage: string;
          if (skill.image.group === "passive") {
            skillImage = imagePassiveUrl(skill.image.full);
          } else {
            skillImage = imageSkillUrl(skill.image.full);
          }

          return (
            <li
              key={i}
              className={`${
                index === i ? "bg-nd p-2" : "bg-card-bg sm:bg-transparent p-3.5 sm:p-3"
              } size-full sm:rounded-t-lg  relative flex items-center justify-center cursor-pointer sm:hover:bg-interaction transition-all ease-in-out duration-300`}
            >
              <button 
                onClick={() => setCurrentIndex(i)}
                className="cursor-pointer "
              >
                <img
                  className={`size-full object-contain rounded-full`}
                  src={skillImage}
                  alt=""
                />
              </button>
              <span className={`absolute flex items-center justify-center bottom-0 right-0 size-5 ${index === i ? 'bg-white' : 'bg-nd'} duration-300`}>
                <h1 className="font-bold">
                  {skillLetter[i]}
                </h1>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col p-4 ">
        <h1 className="text-txt text-xl font-bold">{skills[index].name}</h1>
        {"cooldown" in skills[index] && skills[index].image.group === "spell" && (
          <span className="mb-5 flex gap-2">
            <h4 className="text-gray-400 text-sm">Cooldown</h4>
            <ul className="flex gap-0.5">
              {(skills[index] as Spell).cooldown.map((data: number, i: number) => {
                let txt: any;

                if (i >= (skills[index] as Spell).cooldown.length - 1) {
                  txt = `${data}s`;
                } else {
                  txt = `${data}s /`;
                }

                return (
                  <li key={i} className="">
                    <h5 className="text-gray-400 text-sm">{txt}</h5>
                  </li>
                );
              })}
            </ul>
          </span>
        )}

        <p
          className={`text-txt text-sm sm:max-h-64 overflow-auto ${
            skills[index].image.group === "passive" && "mt-5"
          }`}
        >
          {skills[index].description}
        </p>
      </div>
    </div>
  );
};
