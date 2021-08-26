import React from "react";

import "./textarea.css";

const TextArea = (props) => {
    return (
        <textarea className={"textarea-field " + props.extraClass}></textarea>
    );
};

TextArea.defaultProps = {
    extraClass: "",
};

export default TextArea;