import { useState, useRef, useEffect } from "react";

export const ItemNoInput = ()  => {

    // Artikelnummern-Konzept: Buchstabe a-d gefolgt von 3 Ziffern
    // formatierte Ausgabe => Großbuchstabe gefolgt von - und 3 Ziffern

    const [itemNo, setItemNo] = useState("a123");
    const [editMode, setEditMode] = useState(false);

    /*
        Hook useRef
        = Hook, der einen Referenz_Zustand in Komponente verwaltet
        - hält eindeutige Referenz auf Instanz der Komponente
        - ermöglicht Zugriff auf DOM-Elemente, die von React verwaltet werden
        - Referenz muss an Element in Komponente übergeben werden, damit sie Zugriff darauf erhält
    */

    const inputRef = useRef(null);

    /*
        Hook useEffect
        = Hook, der es ermöglicht, Nebenwirkungen in Funktionskomponenten zu verwalten
        - Funktion darf keinen Rückgabewert haben
        - wird aufgerufen, nachdem die Komponente gerendert wurde
        - kann verwendet werden, um auf Änderungen in Props oder State zu reagieren
        - kann auch verwendet werden, um Ressourcen freizugeben oder aufzuräumen, wenn die Komponente unmontiert wird

        current referenziert gerendertes Element im DOM
        - wenn Element nicht im DOM gerendert ist, returned current null
    */

    useEffect( () => {
        inputRef.current && inputRef.current.focus();
    });

    const changeVal = (ev) => {
        let newVal = ev.target.value.trim();
        if (newVal.length > 0 && !newVal.match(/^[a-dA-D]\d{0,3}$/) ) return;
        setItemNo(newVal);
    };

    const editModeOn = () => setEditMode(true);
    const editModeOff = () => checkItemNo(itemNo) && setEditMode(false);

    const checkItemNo = (itemNo) => itemNo.match(/^[a-dA-D]\d{3}$/);

    const formatItemNo = (itemNo) => `${itemNo.charAt(0).toUpperCase()}-${itemNo.slice(1)}`

    return <span>
        { editMode
            ?
            <input
            type="text"
            value = { itemNo }
            ref = { inputRef }
            onChange = { changeVal }
            onBlur = { editModeOff }
            onKeyDown = { (ev) => ev.key === "Enter" && editModeOff() }
            style = {{ width: "50px", color: "cadetblue" }}
            />
            :
            <span onClick={ editModeOn }>
                { formatItemNo(itemNo) }
            </span>
        }
    </span>;
}