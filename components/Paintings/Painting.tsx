import type { PaintingObj } from "../../MetGalleryViewerApp";

type PaintingPropsType = {
  paintingInfo?: PaintingObj;
  src: string | undefined;
  elementIndex: number;
};

const Painting = ({ paintingInfo, src, elementIndex }: PaintingPropsType) => {
  const animationDelay = {
    animationDelay: `${elementIndex * 0.5}s`,
  };

  if (!src) {
    return (
      <div className="mg-painting" style={animationDelay}>
        <h2>Currently there is no image available for this piece of art.</h2>
        <p>
          <strong>Title:</strong> {paintingInfo!.title}
        </p>
        <p>
          <strong>Department:</strong> {paintingInfo!.department}
        </p>
        <p>
          <strong>By:</strong>{" "}
          {paintingInfo!.artistDisplayName !== "" &&
          typeof paintingInfo?.artistDisplayName !== undefined
            ? paintingInfo?.artistDisplayName
            : "Artist name unavailable"}
        </p>
      </div>
    );
  }

  return (
    <div className="mg-painting" style={animationDelay}>
      <img src={src} alt="No painting to display" />
    </div>
  );
};

export default Painting;
