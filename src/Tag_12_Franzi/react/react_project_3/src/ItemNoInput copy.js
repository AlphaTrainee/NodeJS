import { useState } from "react";

export const ItemNoInput = () => {

    const [itemNo, setItemNo] = useState("a123");
    const [editMode, setEditMode] = useState(false);

    const changeVal = (ev) => {
        let newVal = ev.target.value.trim();
        if (newVal.length > 0 && !newVal.match(/^[a-dA-D]\d{0,3}$/)) return;
        setItemNo(newVal);
    };

    const EditModeOn = () => setEditMode(true);
    const EditModeOff = () => checkItemNo(itemNo) && setEditMode(false);

    const checkItemNo = itemNo => itemNo.match(/^[a-dA-D]\d{0,3}$/);

    const formatItemNo = (itemNo) => `${itemNo.charAt(0).toUpperCase()}-${itemNo.slice(1)}`;

    return <span>
        {editMode
            ?
            <input
                type="text"
                value={itemNo}
                onChange={changeVal}
                onKeyDown={}
                style={{ width: "50px", color: "cadetblue" }}
            />
            :
            <span onClick={changeVal}
            onBlur={EditModeOff}>
                { formatItemNo(itemNo) }
            </span>
        }
        Stück
    </span>
};
