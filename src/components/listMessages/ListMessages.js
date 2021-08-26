import React from "react"

const ListMessages = (props) => {
    return (
        <div className="container-list-message">
            <ul className="list-massages">
                {props.children}
            </ul>
        </div>
    );
};

export default ListMessages;