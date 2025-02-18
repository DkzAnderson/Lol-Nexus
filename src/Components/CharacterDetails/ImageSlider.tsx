import React from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface Skin {
  chromas: boolean;
  id: string;
  name: string;
  num: number;
}

interface SkinCarouselProps {
  skins: Skin[];
}

export const ImageSlider: React.FC<SkinCarouselProps> = ({ skins }) => {
  
  const params = useParams();
  
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {skins.map((skin,i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${params.id}_${skin.num}.jpg`}
              alt={skin.name}
              className="w-full h-auto"
            />
            <h2 className="text-center text-lg font-bold mt-1 text-txt">{skin.name}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
