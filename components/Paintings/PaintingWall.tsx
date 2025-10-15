import type { PropsWithChildren } from "react";

type PaintingWallPropsType = PropsWithChildren;
const PaintingWall = ({ children }: PaintingWallPropsType) => {
  return <div className="mg-painting-wall">{children}</div>;
};

export default PaintingWall;
