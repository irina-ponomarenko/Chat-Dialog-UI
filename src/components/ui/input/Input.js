import React from "react";

import "./input.css";

const Input = (props) => {
    return (
        <input type={props.type} className={"input-field " + props.extraClass} placeholder={props.placeholder}/>
    );
};

Input.defaultProps = {
    type: "text",
    extraClass: "",
    placeholder: "",
};

export default Input;