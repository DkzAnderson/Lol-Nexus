import React from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Importa los módulos
import 'swiper/swiper-bundle.css'; // Importa el CSS de Swiper

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
      navigation // Habilita la navegación
      pagination={{ clickable: true }} // Habilita la paginación
      modules={[Navigation, Pagination]} // Registra los módulos
    >
      {skins.map((skin, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${params.id}_${skin.num}.jpg`}
              alt={skin.name}
              className="w-full h-auto"
            />
            <h2 className="text-center text-lg font-bold mt-4 text-txt">
              {skin.name}
            </h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};