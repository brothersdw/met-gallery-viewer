import { useState } from "react";
import "./mgPages.css";

type MgPagesProps = {
  pages: number;
  onSetPage: (pageNum: number) => void;
};

const MgPages = ({ pages, onSetPage }: MgPagesProps) => {
  const [pageSelected, setPageSelected] = useState<number>(0);
  const handleSetPage = (p: number) => {
    onSetPage(p);
    setPageSelected(p);
  };
  return (
    <div className="mg-pages-container">
      <div className="mg-pages-track">
        {Array.from({ length: pages }, (_, i) => i).map((page) => {
          return (
            <span
              onClick={() => handleSetPage(page)}
              className={`mg-page ${
                pageSelected === page ? "mg-page-selected" : ""
              }`}
            >
              {page + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MgPages;
