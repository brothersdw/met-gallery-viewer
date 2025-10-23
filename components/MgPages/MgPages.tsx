import { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";
import "./mgPages.css";

type MgPagesProps = {
  pages: number;
  onSetPage: (pageNum: number) => void;
};

type Pagination = {
  increment: number;
  decrement: number;
};

const MgPages = ({ pages, onSetPage }: MgPagesProps) => {
  const [pageSelected, setPageSelected] = useState<number>(0);
  const [pageSets, setPageSets] = useState<number[]>([]);
  const [pagesView, setPagesView] = useState<number[]>([]);
  const [paginationThresholds, setPaginationThresholds] = useState<Pagination>({
    increment: 0,
    decrement: 0,
  });

  const handleSetPage = (p: number) => {
    onSetPage(p);
    setPageSelected(p);
  };

  const handlePageSetsIncrement = (num: number) => {
    setPagesView((prev) => {
      const sliceStart = prev[0] + num;
      const sliceEnd = sliceStart + 25;
      return pageSets.slice(sliceStart, sliceEnd);
    });
  };

  const handlePageSetsDecrement = (num: number) => {
    setPagesView((prev) => {
      const sliceStart = prev[0] - num;
      const sliceEnd = sliceStart + 25;
      return pageSets.slice(sliceStart, sliceEnd);
    });
  };

  useEffect(() => {
    handleSetPage(0);
    if (pages > 25) {
      setPageSets(Array.from({ length: pages }, (_, i) => i));
      const pagesViewInit = Array.from({ length: 25 }, (_, i) => i);
      setPagesView(pagesViewInit);
    }
    if (pages > 100) {
      setPaginationThresholds({ decrement: 0, increment: pages });
    }
    if (pages > 1000) {
      setPaginationThresholds({ decrement: 0, increment: pages });
    }
  }, [pages]);

  useEffect(() => {
    setPaginationThresholds({
      increment: pageSets.length - pagesView[0],
      decrement: pagesView[0],
    });
  }, [pagesView]);

  return (
    <>
      <div className="mg-pages-page-count-container">
        {pageSets && (
          <span className="mg-page-count">
            Pages {(pagesView[0] + 1).toLocaleString()}-
            {(pagesView[pagesView.length - 1] + 1).toLocaleString()} of{" "}
            {(pageSets[pageSets.length - 1] + 1).toLocaleString()}
          </span>
        )}
      </div>
      <div className="mg-pages-outer-container">
        <PaginationButton
          displayValue={1000}
          buttonType="decrement"
          pageThreshold={1000}
          currentPaginationLimit={paginationThresholds.decrement}
          handlePagination={handlePageSetsDecrement}
        />
        <PaginationButton
          displayValue={100}
          buttonType="decrement"
          pageThreshold={100}
          currentPaginationLimit={paginationThresholds.decrement}
          handlePagination={handlePageSetsDecrement}
        />
        <PaginationButton
          displayValue={25}
          buttonType="decrement"
          pageThreshold={25}
          currentPaginationLimit={paginationThresholds.decrement}
          handlePagination={handlePageSetsDecrement}
        />
        <div className="mg-pages-container">
          <div className="mg-pages-track">
            {pagesView.map((page) => {
              return (
                <span
                  onClick={() => handleSetPage(page)}
                  className={`mg-page ${
                    pageSelected === page ? "mg-page-selected" : ""
                  }`}
                  key={`mg-page-${page}`}
                >
                  {(page + 1).toLocaleString()}
                </span>
              );
            })}
          </div>
        </div>
        <PaginationButton
          displayValue={25}
          buttonType="increment"
          pageThreshold={25}
          currentPaginationLimit={paginationThresholds.increment}
          handlePagination={handlePageSetsIncrement}
        />
        <PaginationButton
          displayValue={100}
          buttonType="increment"
          pageThreshold={100}
          currentPaginationLimit={paginationThresholds.increment}
          handlePagination={handlePageSetsIncrement}
        />
        <PaginationButton
          displayValue={"+1,000"}
          buttonType="increment"
          pageThreshold={1000}
          currentPaginationLimit={paginationThresholds.increment}
          handlePagination={handlePageSetsIncrement}
        />
      </div>
    </>
  );
};

type PaginationButtonProps = {
  buttonType: "increment" | "decrement";
  pageThreshold: 25 | 100 | 1000;
  currentPaginationLimit: number;
  handlePagination: (num: number) => void;
  displayValue: number | string;
};

const PaginationButton = ({
  buttonType,
  pageThreshold,
  displayValue,
  currentPaginationLimit,
  handlePagination,
}: PaginationButtonProps) => {
  if (buttonType === "decrement") {
    const displayButton =
      currentPaginationLimit - pageThreshold >= 0 && currentPaginationLimit;
    return (
      <>
        {displayButton ? (
          <span
            className="mg-pages-btn-container"
            onClick={() => handlePagination(pageThreshold)}
          >
            {typeof displayValue === "number" ? (
              <span>-{displayValue}</span>
            ) : (
              <span>{displayValue}</span>
            )}
            <span>
              <CaretLeft size={30} />
            </span>
          </span>
        ) : null}
      </>
    );
  }
  const displayButton =
    currentPaginationLimit - pageThreshold > 0 && currentPaginationLimit;
  return (
    <>
      {displayButton ? (
        <span
          className="mg-pages-btn-container"
          onClick={() => handlePagination(pageThreshold)}
        >
          <span>
            <CaretRight size={30} />
          </span>
          {typeof displayValue === "number" ? (
            <span>+{displayValue}</span>
          ) : (
            <span>{displayValue}</span>
          )}
        </span>
      ) : null}
    </>
  );
};

export default MgPages;
