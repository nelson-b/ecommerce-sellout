import React, { Component } from "react";
import { connect } from "react-redux";
import { createSellOutData } from "../actions/selloutaction";

function AddSelloutData(){
    return(
        <div>
            <h1>This is add page</h1>
        </div>
    );
}

export default connect(null, { createSellOutData })(AddSelloutData);