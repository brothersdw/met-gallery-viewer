import { useEffect, useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import {
  Paintings,
  MgHeader,
  MgDepartmentSelection,
  MgLoading,
  MgPanel,
  MgSearchPanelMask,
  MgButton,
  MgPages,
} from "./components";
import { api } from "./api";
import "./metGalleryViewerApp.css";
export type Departments = {
  departmentId: number;
  displayName: string;
};

export type PaintingObj = {
  primaryImageSmall: string;
  artistDisplayName: string;
  title: string;
  department: string;
};
const MetGalleryViewerApp = () => {
  // const queryClient = useQueryClient();
  const [departments, setDepartments] = useState<Departments[] | null>(null);
  const [selectedDepartments, setSelectedDepartment] = useState<number[]>([0]);
  const [closeInstructions, setCloseInstructions] = useState<boolean>(false);
  const [artObjectIds, setArtObjectIds] = useState<number[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  // const [query, setQuery] = useState<string | null>(null);
  const [paintings, setPaintings] = useState<PaintingObj[] | null>(null);
  const [loadingPaintings, setLoadingPaintings] = useState<boolean>(false);
  const [closePanel, setClosePanel] = useState<boolean>(false);
  const onClose = () => {
    // queryClient.setQueryData(["mg-ui"], { instructionsClosed: true });
    setCloseInstructions(true);
  };

  const handleSearch = async () => {
    setLoadingPaintings(true);
    setClosePanel(true);
    const departmentObjects = await api.fetchPaintingObjectIdsByDepartments(
      selectedDepartments
    );
    const departmentObjectIds = departmentObjects.departmentObjectIds;
    const totalPages = departmentObjects.totalPages;
    setArtObjectIds(departmentObjectIds);
    setPages(totalPages);
    setClosePanel(false);
    setLoadingPaintings(false);
  };

  const handleSetPage = (pageNum: number) => {
    setPage(pageNum);
  };

  useEffect(() => {
    // const instructionsClosed = queryClient.getQueryData<{
    //   instructionsClosed: boolean;
    // }>(["mg-ui"]);
    // if (instructionsClosed?.instructionsClosed) {
    //   setCloseInstructions(true);
    // }
    const getDepartments = async () => {
      const departmentsObj = await api.fetchDepartments();
      const departmentsArr: Departments[] = [
        { departmentId: 0, displayName: "All" },
        ...departmentsObj.departments,
      ];
      setDepartments(departmentsArr);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    if (artObjectIds.length < 1) return;
    setLoadingPaintings(true);
    const getPaintings = async () => {
      const paintingObjs = await api.fetchPaintings(artObjectIds, page);
      setPaintings(paintingObjs);
      setLoadingPaintings(false);
    };
    getPaintings();
  }, [pages, page]);
  return (
    <div className="mg-app-container">
      {!closeInstructions && <MgSearchPanelMask onClose={onClose} />}
      <MgHeader />
      <MgPanel
        killInstructionPrompt={setCloseInstructions}
        closePanel={closePanel}
      >
        <MgButton
          onClick={handleSearch}
          fontSize={3}
          padding={20}
          gapBottom={20}
        >
          Search
        </MgButton>
        {!departments ? (
          <MgLoading />
        ) : (
          <MgDepartmentSelection
            options={departments!}
            setState={setSelectedDepartment}
          />
        )}
      </MgPanel>
      {artObjectIds.length > 0 && (
        <MgPages pages={pages} onSetPage={handleSetPage} />
      )}
      <Paintings
        fetchedPaintings={paintings}
        loadingPaintings={loadingPaintings}
      />
    </div>
  );
};

export default MetGalleryViewerApp;
