import axios from "axios";

const baseUrl = `https://collectionapi.metmuseum.org/public/collection/v1/`;
const searchUrl = `${baseUrl}/search`;
const objectUrl = `${baseUrl}/objects`;

const getPages = (num: number) => {
  const remainder = num % 10;
  const divisibleNum = num - remainder;
  const pages = !remainder
    ? divisibleNum / 10
    : remainder && divisibleNum
    ? divisibleNum / 10 + 1
    : 1;
  return pages;
};

type Params = Record<string, string | number | boolean | undefined>;
const api = {
  fetchDepartments: async () => {
    const fetchDepartments = await axios.get(`${baseUrl}departments`);
    const departments = fetchDepartments.data;
    return departments;
  },
  fetchPaintingObjectIdsByDepartments: async (departmentIds: number[]) => {
    if (departmentIds.length < 2 && departmentIds[0] === 0) {
      const fetchDepartmentObjectIds = await axios.get(objectUrl);
      const departmentObjectIds = fetchDepartmentObjectIds.data;

      const totalPages = getPages(Number(departmentObjectIds.total));
      return {
        departmentObjectIds: departmentObjectIds.objectIDs,
        totalPages: totalPages,
      };
    }
    let departmentsString = "";
    departmentIds.map((id, idx) => {
      if (idx !== 0) {
        return (departmentsString += ` | ${id}`);
      }
      return (departmentsString += `${id}`);
    });
    const params: Params = {
      departmentIds: departmentsString,
    };
    const fetchDepartmentObjectIds = await axios.get(objectUrl, { params });
    const departmentObjectIds = fetchDepartmentObjectIds.data;
    const totalPages = getPages(Number(departmentObjectIds.total));
    return {
      departmentObjectIds: departmentObjectIds.objectIDs,
      totalPages: totalPages,
    };
  },
  fetchPaintingObjectIdsBySearch: async (query: string | undefined) => {
    const params: Params = {
      hasImages: true,
      q: query,
    };
    const fetchPaintingObjectIds = await axios.get(searchUrl, { params });
    const paintingObjectIds = fetchPaintingObjectIds.data;
    const totalPages = getPages(Number(paintingObjectIds.total));
    return {
      paintingObjectIds: paintingObjectIds.objectIDs,
      totalPages,
    };
  },
  fetchPaintings: async (objectIds: number[], page: number) => {
    const currentPageObjectNums = objectIds.slice(page * 10, page * 10 + 10);
    const paintingObjects = [];
    console.log("should be fetching object nums for:", currentPageObjectNums);
    for (let objNum of currentPageObjectNums) {
      const paintingObjData = await axios.get(`${objectUrl}/${objNum}`);
      const paintingObj = paintingObjData.data;
      paintingObjects.push(paintingObj);
    }
    // const filteredPaintingObjects = paintingObjects.filter(
    //   (painting) => painting.primaryImageSmall !== ""
    // );
    return paintingObjects;
  },
};

export default api;
