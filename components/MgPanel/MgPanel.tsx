import { useEffect, useState, type PropsWithChildren } from "react";
import { CaretRight, CaretLeft, MagnifyingGlass } from "phosphor-react";
import "./mgPanel.css";

type MgPanelProps = {
  killInstructionPrompt: (value: boolean) => void;
  closePanel: boolean;
} & PropsWithChildren;
const MgPanel = ({
  killInstructionPrompt,
  children,
  closePanel,
}: MgPanelProps) => {
  const [panelExpanded, setPanelExpanded] = useState<boolean>(false);
  const handlePanelExpand = () => {
    setPanelExpanded(!panelExpanded);
    killInstructionPrompt(true);
  };
  useEffect(() => {
    if (closePanel) {
      setPanelExpanded(false);
    }
  }, [closePanel]);
  return (
    <div className="mg-panel-container">
      <div
        className={`mg-panel ${
          panelExpanded ? "mg-panel-expanded" : "mg-panel-collapsed"
        }`}
      >
        <div className="mg-inner-panel">{children}</div>
        <div className="mg-panel-icon-container" onClick={handlePanelExpand}>
          <span className="mg-panel-icon">
            <MagnifyingGlass size={30} />
          </span>
          <span className="mg-panel-icon">
            {panelExpanded ? <CaretLeft size={30} /> : <CaretRight size={30} />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MgPanel;
