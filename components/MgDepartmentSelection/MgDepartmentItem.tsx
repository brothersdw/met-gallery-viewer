import React, { useEffect, useState } from "react";
import { Square, CheckSquare } from "phosphor-react";
import type { SelectedItem } from "./MgDepartmentSelection";

type MgDropDownItemProps = {
  id: number;
  displayName: string;
  selectedItems: SelectedItem[];
  onSelectItem: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
};

const MgDepartmentItem = ({
  id,
  displayName,
  selectedItems,
  onSelectItem,
}: MgDropDownItemProps) => {
  const [itemSelected, setItemSelected] = useState<boolean>(false);
  const handleSelectItem = () => {
    const itemIsSelected = !itemSelected === true;
    const itemNotSelected = !itemSelected === false;
    if (itemNotSelected && id === 0) {
      return;
    }
    setItemSelected(!itemSelected);
    if (itemNotSelected && id !== 0) {
      onSelectItem((prev) => [...prev.filter((item) => item.id !== id)]);
    }
    if (itemIsSelected && id !== 0) {
      onSelectItem((prev) => [
        ...prev.filter((item) => item.id !== 0),
        { id, displayName },
      ]);
    }
    if (itemIsSelected && id === 0) {
      onSelectItem([{ id: 0, displayName: "All" }]);
    }
  };

  useEffect(() => {
    console.log("selected items changed");
    const filterForAll = selectedItems.filter((item) => item.id === 0);
    const allIsSelected = filterForAll.length > 0;
    if (id === 0 && selectedItems.length < 1) {
      onSelectItem([{ id: 0, displayName: "All" }]);
      setItemSelected(true);
    }
    if (!allIsSelected && id === 0) {
      return setItemSelected(false);
    }
    if (id === 0 && allIsSelected) {
      return setItemSelected(true);
    }

    if (allIsSelected && id !== 0) {
      return setItemSelected(false);
    }
  }, [selectedItems]);

  return (
    <div
      onClick={handleSelectItem}
      className={`mg-select-item ${
        itemSelected ? "mg-selected-item" : "mg-unselected-item"
      }`}
    >
      <p>
        <span>
          {itemSelected ? <CheckSquare size={30} /> : <Square size={30} />}
        </span>
        <span>{displayName}</span>
      </p>
    </div>
  );
};

export default MgDepartmentItem;
