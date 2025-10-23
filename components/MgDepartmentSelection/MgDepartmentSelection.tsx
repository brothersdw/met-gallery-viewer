import { useEffect, useState } from "react";
import { type Departments } from "../../MetGalleryViewerApp";
import { MgDepartmentItem } from ".";
import "./mgDepartmentSelection.css";
type MgDropDownPropsType = {
  options: Departments[];
  setState: (value: number[]) => void;
};

export type SelectedItem = {
  id: number;
  displayName: string;
};
const MgDepartmenSelection = ({ options, setState }: MgDropDownPropsType) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([
    { id: 0, displayName: "All" },
  ]);
  useEffect(() => {
    setState(selectedItems.map((item) => item.id));
    console.log(
      "items selected:",
      selectedItems.map((item) => item.id)
    );
  }, [selectedItems]);
  return (
    <div className="mg-department-selection-items-container">
      <h1>Departments</h1>
      {options.map((option) => {
        return (
          <MgDepartmentItem
            displayName={option.displayName}
            id={option.departmentId}
            selectedItems={selectedItems}
            onSelectItem={setSelectedItems}
            key={`${option.displayName}-idx`}
          />
        );
      })}
    </div>
  );
};

export default MgDepartmenSelection;
