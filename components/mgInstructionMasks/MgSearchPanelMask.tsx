import "./mgSearchPanelMask.css";
import { MgButton } from "..";

type MgSearchPanelMaskProps = {
  onClose: () => void;
};

const MgSearchPanelMask = ({ onClose }: MgSearchPanelMaskProps) => {
  return (
    <div className="mg-search-panel-mask">
      <div className="mg-search-instructions">
        <h1>Searching</h1>
        <p>Expand this menu and search by art departments.</p>
        <MgButton onClick={onClose}>Close</MgButton>
      </div>
    </div>
  );
};

export default MgSearchPanelMask;
