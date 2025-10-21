// import { useEffect, useState } from "react";
import { Painting, PaintingWall } from ".";
import "./paintingsStyle.css";
import { MgLoading } from "../MgLoading";
import type { PaintingObj } from "../../MetGalleryViewerApp";
// const baseSearchUrl =
//   "https://collectionapi.metmuseum.org/public/collection/v1/search";
// const baseObjectUrl =
//   "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

type PaintingsProps = {
  fetchedPaintings: PaintingObj[] | null;
  loadingPaintings: boolean;
};

const Paintings = ({ fetchedPaintings, loadingPaintings }: PaintingsProps) => {
  //   const [paintingImages, setPaintingImages] = useState<string[] | null>();
  const paintingImages = [
    "https://images.metmuseum.org/CRDImages/ep/web-large/DT1396.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DT1947.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP-19279-001.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP-18371-001.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP-16339-001.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP-28011-001.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DT1946.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP130999.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP124808.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP229743.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP145938.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP-14962-001.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP-19433-001.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP240360.jpg",
    "https://images.metmuseum.org/CRDImages/ep/web-large/DP316906.jpg",
  ];

  //   useEffect(() => {
  //     const getPainterObjectIds = async (painter: string) => {
  //       try {
  //         const params = {
  //           q: "*",
  //           artistDisplayName: painter,
  //           hasImages: true,
  //         };
  //         const result = await axios.get(baseSearchUrl, { params });
  //         const objectIds = result.data.objectIDs;
  //         return objectIds;
  //       } catch (err) {
  //         console.log(
  //           "Something unexpected happened when trying to fetch object ids for paintings:",
  //           err
  //         );
  //       }
  //     };
  //     const getPaintings = async () => {
  //       const paintinIds = await getPainterObjectIds("vincent van gough");
  //       const paintingsArr: string[] = [];
  //       let paintingCount = 0;
  //       for (let id of paintinIds) {
  //         if (paintingCount < 15) {
  //           console.log(`${baseObjectUrl}${id}`);
  //           const result = await axios.get(`${baseObjectUrl}${id}`);
  //           const currentPainting = result.data.primaryImageSmall;
  //           if (currentPainting) {
  //             paintingsArr.push(currentPainting);
  //             paintingCount++;
  //           }
  //         }
  //       }
  //       console.log(paintingsArr);
  //       setPaintingImages(paintingsArr);
  //     };
  //     getPaintings();
  //   }, []);

  if (!paintingImages)
    return (
      <div className="mg-painting-loader">
        <h1>
          Loading...{" "}
          <img
            src="https://images.metmuseum.org/CRDImages/ep/web-large/DP317780.jpg"
            alt=""
          />
        </h1>
      </div>
    );
  if (loadingPaintings)
    return (
      <PaintingWall>
        <MgLoading />
      </PaintingWall>
    );
  return (
    <PaintingWall>
      {!fetchedPaintings
        ? paintingImages.map((painting, idx) => {
            return (
              <Painting
                src={painting}
                key={`painting-${idx}`}
                elementIndex={idx}
              />
            );
          })
        : fetchedPaintings.map((painting, idx) => {
            return (
              <Painting
                src={painting.primaryImageSmall}
                key={`painting-${idx}`}
                elementIndex={idx}
                paintingInfo={painting}
              />
            );
          })}
    </PaintingWall>
  );
};

export default Paintings;
