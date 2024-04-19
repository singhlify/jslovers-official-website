import type { NextPage } from "next";
import Carousel from "./Carousel";
import Image from "next/image";

const Home: NextPage = () => {
  const images = [
    "/assets/story_image.png",
    "/assets/story_image.png",
    "/assets/story_image.png",
    "/assets/story_image.png",
  ];
  return (
    <div className="lg:w-3/4 px-4 mx-auto my-2">
      <Carousel loop>
        {images.map((src, i) => {
          return (
            <div className="relative h-auto flex-[0_0_100%]" key={i}>
              <div
                key={i}
                className="scroll-ml-6 snap-center flex flex-shrink-0 flex-col items-center gap-2"
              >
                <div className="relative mb-3 mr-3 p-8 border-[5px] border-solid border-black rounded-[10px] flex flex-col items-center justify-center">
                  <Image
                    src={src}
                    width={381}
                    height={226}
                    alt="Speaker Image"
                    className="object-cover w-[250px] h-[148px] lg:w-[381px] lg:h-[226px] rounded-[10px]"
                    loading="lazy"
                  />

                  <div className="-z-[1] absolute top-[12px] left-[12px] p-8 rounded-[10px] border-[5px] rounded-tr-none rounded-bl-none border-l-0 border-t-0 border-solid border-black">
                    <div className="w-[250px] h-[148px] lg:w-[381px] lg:h-[226px]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Home;
