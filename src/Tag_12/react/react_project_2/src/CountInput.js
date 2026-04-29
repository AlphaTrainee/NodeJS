import { useState } from "react";

const CountInput = () => {

    /*
        Hook useState
        - useState = Hook, der Zustand einer Komponente verwaltet
        - erzeugt Variable und zugehörigen Setter in Array
        - können bei Ausführung des Hooks Initialwert für Variable übergeben

          const [variable, Setter] = useState(initial value);
     */
    const [count, setCount] = useState(0);

    const changeVal = (ev) => {
        let newVal = ev.target.value;

        if (newVal < 0) newVal = 0;         // || return;
        if (newVal > 100) newVal = 100;     // || return;
        setCount(newVal);
    }

    return <span>
        <input
            type="number"
            value = { count }
            onChange = { changeVal }
            style = {{ width: "50px", color: "cadetblue" }}
        /> Stück
    </span>
};

export { CountInput };