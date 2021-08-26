import React from "react";

import "./form.css";

const Form = (props) => {
    return (
        <form className="form" onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
};

export default Form;
