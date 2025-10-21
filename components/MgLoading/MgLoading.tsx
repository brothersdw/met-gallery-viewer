import { useLottie } from "lottie-react";
import animationData from "../../assets/paint loader.json";

import "./mgLoading.css";

const MgLoading = () => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };
  const { View } = useLottie(options);
  return <span>{View}</span>;
};

export default MgLoading;
