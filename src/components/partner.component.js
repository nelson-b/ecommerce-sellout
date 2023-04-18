import React from "react";
import { connect } from "react-redux";
import { createSellOutData } from "../actions/selloutaction";

function PartnerComponent() {
  return (
    <div>
      <h1>Create New Partner</h1>
    </div>
  );
}

export default connect(null, { createSellOutData })(PartnerComponent);
