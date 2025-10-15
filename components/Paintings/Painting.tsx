import { useEffect, useState } from "react";
import axios from "axios";

type PaintingPropsType = {
  src: string;
  elementIndex: number;
};

const Painting = ({ src, elementIndex }: PaintingPropsType) => {
  // const [paintingImage, setPaintingImage] = useState<>()

  const animationDelay = {
    animationDelay: `${elementIndex * 0.5}s`,
  };

  return (
    <div className="mg-painting" style={animationDelay}>
      <img src={src} alt="No painting to display" />
    </div>
  );
};

export default Painting;
