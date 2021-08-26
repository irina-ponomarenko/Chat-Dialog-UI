import React from "react";

import "./button.css";

const Button = (props) => {
    return (
        <button type={props.type} onClick={props.onClick} className={"btn " + props.extraClass}>{props.text}</button>
    );
};

Button.defaultProps = {
    extraClass: "",
};

export default Button;
