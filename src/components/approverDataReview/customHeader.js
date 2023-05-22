import React, { useEffect, useState } from "react";
import expand from "./../../images/expand-left.png";

export default (props) => {
  const [expandState, setExpandState] = useState("collapsed");

  const expandOrCollapse = () => {
    console.log(
      "props.columnGroup.getProvidedColumnGroup",
      props.columnGroup.getProvidedColumnGroup()
    );

    let currentState = props.columnGroup.getProvidedColumnGroup().isExpanded();
    props.setExpanded(!currentState);
  };

  const syncExpandButtons = () => {
    setExpandState(
      props.columnGroup.getProvidedColumnGroup().isExpanded()
        ? "expanded"
        : "collapsed"
    );
  };

  useEffect(() => {
    props.columnGroup
      .getProvidedColumnGroup()
      .addEventListener("expandedChanged", syncExpandButtons);
    syncExpandButtons();

    return () => {
      props.columnGroup
        .getProvidedColumnGroup()
        .removeEventListener("expandedChanged", syncExpandButtons);
    };
  }, []);

  return (
    <div className="ag-header-group-cell-label">
      <div
        className={`customExpandButton ${expandState}`}
        onClick={() => expandOrCollapse()}
      >
        <img
          src={expand}
          alt="expand"
          style={{ height: "15px", width: "15px" }}
        />
      </div>
    </div>
  );
};
