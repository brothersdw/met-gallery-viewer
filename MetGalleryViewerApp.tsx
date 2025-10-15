import { Paintings, MgHeader } from "./components";
import "./metGalleryViewerApp.css";

const MetGalleryViewerApp = () => {
  return (
    <div className="mg-app-container">
      <MgHeader />
      <Paintings />
    </div>
  );
};

export default MetGalleryViewerApp;
