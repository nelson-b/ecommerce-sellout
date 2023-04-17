import React, { Component } from "react";
import { connect } from "react-redux";
import { createSellOutData } from "../actions/selloutaction";

export function AddSelloutData(){
    return(
        <div>
            <h1>Home</h1>
            <label>This add page</label>
        </div>
    );
}

export default connect(null, { createSellOutData })(AddSelloutData);