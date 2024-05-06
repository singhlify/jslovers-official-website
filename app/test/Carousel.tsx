"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import classNames from "classnames";

type DotsProps = {
  itemsLength: number;
  selectedIndex: number;
};

type CarouselControlsProps = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
};

type CarouselProps = PropsWithChildren<EmblaOptionsType>;

const Dots = ({ itemsLength, selectedIndex }: DotsProps) => {
  const arr = new Array(itemsLength).fill(null);
  return (
    <>
      <div className="flex gap-2 mt-4 justify-center">
        {arr.map((_, index) => (
          <div
            className={classNames(
              "h-3 w-3 rounded-full transition-all duration-300 bg-black",
              {
                "opacity-50": index !== selectedIndex,
              }
            )}
            key={index}
          ></div>
        ))}
      </div>

      {/* <div className="flex gap-2 my-2 justify-center -translate-y-5">
        {arr.map((_, index) => (
          <div
            className={classNames(
              "h-3 w-3 rounded-full transition-all duration-300 bg-black",
              {
                "opacity-50": index !== selectedIndex,
              }
            )}
            key={index}
          ></div>
        ))}
      </div> */}
    </>
  );
};

const CarouselControls = ({
  canScrollPrev,
  canScrollNext,
  onPrev,
  onNext,
}: CarouselControlsProps) => {
  return (
    <>
      <div className="absolute top-0 left-0 h-full flex items-center">
        <button
          onClick={onPrev}
          disabled={!canScrollPrev}
          className={classNames("p-2 rounded-full text-white", {
            "bg-indigo-200": !canScrollPrev,
            "bg-indigo-400": canScrollPrev,
          })}
        >
          {"<"}
        </button>
      </div>

      <div className="absolute top-0 right-0 h-full flex items-center">
        <button
          onClick={onNext}
          disabled={!canScrollNext}
          className={classNames("p-2 rounded-full text-white", {
            "bg-indigo-200": !canScrollNext,
            "bg-indigo-400": canScrollNext,
          })}
        >
          {">"}
        </button>
      </div>

      {/* <div className="flex justify-end gap-6 absolute top-0 right-0">
        <button
          onClick={onPrev}
          disabled={!canScrollPrev}
          className={classNames("px-4 py-2 text-white rounded-md", {
            "bg-indigo-200": !canScrollPrev,
            "bg-indigo-400": canScrollPrev,
          })}
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={!canScrollNext}
          className={classNames("px-4 py-2 text-white rounded-md", {
            "bg-indigo-200": !canScrollNext,
            "bg-indigo-400": canScrollNext,
          })}
        >
          Next
        </button>
      </div> */}
    </>
  );
};

const Carousel = ({ children, ...options }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const length = React.Children.count(children);
  const canScrollNext = !!emblaApi?.canScrollNext();
  const canScrollPrev = !!emblaApi?.canScrollPrev();

  useEffect(() => {
    const selectHandler = () => {
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    };

    emblaApi?.on("select", selectHandler);

    return () => {
      emblaApi?.off("select", selectHandler);
    };
  }, [emblaApi]);

  return (
    <>
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">{children}</div>

        <Dots itemsLength={length} selectedIndex={selectedIndex} />

        <CarouselControls
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
          onNext={() => emblaApi?.scrollNext()}
          onPrev={() => emblaApi?.scrollPrev()}
        />
      </div>
    </>
  );
};

export default Carousel;
