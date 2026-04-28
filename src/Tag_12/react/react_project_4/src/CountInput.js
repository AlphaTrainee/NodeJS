export const CountInput = (props) => {

    const changeVal = (ev) => {
        let newVal = ev.target.value;
        if (newVal < 0) return;
        props.setCount(newVal);
    };

    return (
        <input
            type="number"
            style={{ width: "50px", color: "cadetblue" }}
            value={props.count}
            onChange={changeVal}
        />
    );
};