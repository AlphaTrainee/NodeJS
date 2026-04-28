import { useState, useRef, useEffect } from "react";

export const ItemNoInput = () => {
    const [itemNo, setItemNo] = useState("a123");
    const [editMode, setEditMode] = useState(false);

    const inputRef = useRef(null);

    // Automatischer Fokus, wenn editMode auf true springt
    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    const changeVal = (ev) => {
        let newVal = ev.target.value;
        // Erlaubt leere Eingabe oder passendes Format
        if (newVal.length > 0 && !newVal.match(/^[a-dA-D]\d{0,3}$/)) return;
        setItemNo(newVal);
    };

    // Achte auf die Schreibweise: EditModeOn
    const EditModeOn = () => setEditMode(true);
    const EditModeOff = () => {
        if (checkItemNo(itemNo)) {
            setEditMode(false);
        }
    };

    const checkItemNo = (no) => no.match(/^[a-dA-D]\d{0,3}$/);

    const formatItemNo = (no) => `${no.charAt(0).toUpperCase()}-${no.slice(1)}`;

    return (
        <span>
            {editMode ? (
                <input
                    type="text"
                    value={itemNo}
                    ref={inputRef} // Verknüpfung mit dem Hook
                    onChange={changeVal}
                    onBlur={EditModeOff} // Schließt beim Rausklicken
                    onKeyDown={(ev) => ev.key === "Enter" && EditModeOff()}
                    style={{ width: "50px", color: "cadetblue" }}
                />
            ) : (
                <span 
                    onClick={EditModeOn} // Hier war der Tippfehler (großes E)
                    style={{ cursor: "pointer" }}
                >
                    {formatItemNo(itemNo)}
                </span>
            )}
            {" "} Stück
        </span>
    );
};