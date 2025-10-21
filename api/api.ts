import axios from "axios";

const baseUrl = `https://collectionapi.metmuseum.org/public/collection/v1/`;
const searchUrl = `${baseUrl}/search`;
const objectUrl = `${baseUrl}/objects`;

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
      return {
        departmentObjectIds: departmentObjectIds.objectIDs,
        totalPaintings: departmentObjectIds.total,
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
    return {
      departmentObjectIds: departmentObjectIds.objectIDs,
      totalPaintings: departmentObjectIds.total,
    };
  },
  fetchPaintingObjectIdsBySearch: async (query: string | undefined) => {
    const params: Params = {
      hasImages: true,
      q: query,
    };
    const fetchPaintingObjectIds = await axios.get(searchUrl, { params });
    const paintingObjectIds = fetchPaintingObjectIds.data;
    return {
      paintingObjectIds: paintingObjectIds.objectIDs,
      totalPaintings: paintingObjectIds.total,
    };
  },
  fetchPaintings: async (objectIds: [][], page: number) => {
    const currentPageObjectNums = objectIds[page];
    const paintingObjects = [];
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
