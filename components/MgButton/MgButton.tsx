import type React from "react";
import "./mgButton.css";
import { useState, type PropsWithChildren } from "react";

type MgButtonProps = {
  onClick: () => void;
  fontSize?: number;
  padding?: number;
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
  gap?: number;
  gapTop?: number;
  gapBottom?: number;
} & PropsWithChildren;

const MgButton = ({
  onClick,
  fontSize = 1.5,
  padding = 5,
  position = "absolute",
  gap = 0,
  gapTop = 0,
  gapBottom = 0,
  children,
}: MgButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const butttonContainerStyles: React.CSSProperties = {
    fontSize: `${fontSize}rem`,
    padding: `${!gapBottom && !gapTop && gap}px`,
    paddingTop: `${gapTop}px`,
    paddingBottom: `${gapBottom}px`,
  };
  const buttonStyles: React.CSSProperties = {
    fontSize: hover ? `${fontSize + 0.2}rem` : `${fontSize}rem`,
    padding: hover ? `${padding + 2}px` : `${padding}px`,
    position: position,
  };
  return (
    <p className="mg-btn-container" style={butttonContainerStyles}>
      <span
        className="mg-btn"
        onClick={onClick}
        style={buttonStyles}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </span>
    </p>
  );
};

export default MgButton;
