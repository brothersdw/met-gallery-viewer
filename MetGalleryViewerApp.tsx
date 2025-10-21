import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const [departments, setDepartments] = useState<Departments[] | null>(null);
  const [selectedDepartments, setSelectedDepartment] = useState<number[]>([0]);
  const [closeInstructions, setCloseInstructions] = useState<boolean>(false);
  const [pages, setPages] = useState<[][]>([]);
  const [page, setPage] = useState<number>(0);
  // const [query, setQuery] = useState<string | null>(null);
  const [paintings, setPaintings] = useState<PaintingObj[] | null>(null);
  const [loadingPaintings, setLoadingPaintings] = useState<boolean>(false);
  const onClose = () => {
    queryClient.setQueryData(["mg-ui"], { instructionsClosed: true });
    setCloseInstructions(true);
  };

  const handleSearch = async () => {
    const departmentObjectIds = (
      await api.fetchPaintingObjectIdsByDepartments(selectedDepartments)
    ).departmentObjectIds;
    const currentPages = [];
    for (let i = 0; i < departmentObjectIds.length; i += 10) {
      currentPages.push(departmentObjectIds.slice(i, i + 10));
    }
    setPages(currentPages);
  };

  const handleSetPage = (pageNum: number) => {
    setPage(pageNum);
  };

  useEffect(() => {
    const instructionsClosed = queryClient.getQueryData<{
      instructionsClosed: boolean;
    }>(["mg-ui"]);
    if (instructionsClosed?.instructionsClosed) {
      setCloseInstructions(true);
    }
    const getDepartments = async () => {
      const departmentsObj = await api.fetchDepartments();
      console.log("departments:", departmentsObj);
      const departmentsArr: Departments[] = [
        { departmentId: 0, displayName: "All" },
        ...departmentsObj.departments,
      ];
      setDepartments(departmentsArr);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    if (pages.length < 1) return;
    setLoadingPaintings(true);
    const getPaintings = async () => {
      const paintingObjs = await api.fetchPaintings(pages, page);
      console.log("painting objs:", paintingObjs);
      setPaintings(paintingObjs);
      setLoadingPaintings(false);
    };
    getPaintings();
  }, [pages, page]);
  return (
    <div className="mg-app-container">
      {!closeInstructions && <MgSearchPanelMask onClose={onClose} />}
      <MgHeader />
      <MgPanel killInstructionPrompt={setCloseInstructions}>
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
      <MgPages pages={pages.length} onSetPage={handleSetPage} />
      <Paintings
        fetchedPaintings={paintings}
        loadingPaintings={loadingPaintings}
      />
    </div>
  );
};

export default MetGalleryViewerApp;
