import React, { useState } from 'react';
import data from './data';
import './style.css';

function Accordian() {
    const [select, setSelect] = useState(null);
    const [enableMulti, setEnableMulti] = useState(false);
    const [multiselect, setMultiselect] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelect(getCurrentId === select ? null : getCurrentId); // Toggle selection
    };

    function handleMultipleSelection(getCurrentId) {
        let copyMultiple = [...multiselect];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

        if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
        else copyMultiple.splice(findIndexOfCurrentId, 1);

        setMultiselect(copyMultiple);
    }

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMulti(!enableMulti)}>
                {enableMulti ? 'Disable' : 'Enable'} Multiple Selections
            </button>
            <div className="accordian">
                {data && data.length > 0 ?
                    data.map((dataItem, id) => (
                        <div className="item" key={id}>
                            <div
                                onClick={
                                    enableMulti
                                        ? () => handleMultipleSelection(dataItem.id)
                                        : () => handleSingleSelection(dataItem.id)
                                }
                                className="title"
                            >
                                <h3>{dataItem.Name}</h3>
                                <span>{select === dataItem.id || multiselect.includes(dataItem.id) ? '-' : '+'}</span>
                            </div>
                            {(select === dataItem.id || multiselect.includes(dataItem.id)) && (
                                <div className="content">
                                    <p>{dataItem.Place}</p> {/* Display additional data */}
                                </div>
                            )}
                        </div>
                    ))
                    : <div>No data found</div>}
            </div>
        </div>
    );
}

export default Accordian;
