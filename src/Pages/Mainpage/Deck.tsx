import React, { useEffect } from "react";
import { usePresentation } from "../../Provider/Slide/PresentationContext";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

const slides = [Slide1, Slide2, Slide3];

export const Deck: React.FC = () => {
  const { currentSlide, setTotalSlides } = usePresentation();

  useEffect(() => {
    setTotalSlides(slides.length);
  }, []);

  const SlideComponent = slides[currentSlide];

  return <SlideComponent />;
};