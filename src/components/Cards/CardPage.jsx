import React from 'react';
import HeartButton from './HeartButton';

const CardPage = ({ image, region, country, place, price, weather }) => {
  return (
    <div onClick={() => {}} className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-1 w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <img src={image} alt="Img1" className="object-cover h-full w-full group-hover:scale-110 transition" />
                <div className="absolute top-3 right-3">
                    <HeartButton />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {region}, {country}
            </div>
            <div className="font-light text-neutral-500">
                {place}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    ${price}
                </div>
                <div className="font-light">
                    {weather}
                </div>
            </div>
      </div>
    </div>
  )
}

export default CardPage;
