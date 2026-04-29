import reactDom from 'react-dom/client';
import { CountInput } from "./CountInput.js";
import series from "./hero_exports.js";

import { useState, useEffect } from 'react';

const App = () => {

    // Array für SubTotals und zugehörigen Setter erzeugen
    const [subTotals, setSubTotals] = useState(Array(series.length).fill(0));

    // Berechnung Total aus Subtotals
    const total = subTotals.reduce( (acc, val) => acc + val, 0);

    const handleTotalChanges = (index, newSubTotal) => {
        const newSubTotals = [...subTotals];
        newSubTotals[index] = newSubTotal;
        setSubTotals(newSubTotals);
    }

    return <div>
        <h2> Artikel-Liste </h2>
        <ul>
            { series.map( (hero) =>
                <li key={ hero.seriesNo } className="hero_series">
                <HeroItem { ...hero } totalChange = { (newTotal) => handleTotalChanges(hero.seriesNo - 1, newTotal)} />
            </li>
            )}
        </ul>
        <p><b>Total: { total } EUR</b></p>
    </div>;
};

const HeroItem = (props) => {
    const [count, setCount] = useState(0);

    // Berewchnung SubTotal
    const subTotal = count * props.price;

    // Übergabe subTotal an Array
    useEffect( () => {
        props.totalChange(subTotal);
    }, [subTotal] );

    return <div>
        <h3>Serie { props.seriesNo }: { props.name } - (Preis: {props.price} EUR</h3>
        <p>Artikelanzahl: <CountInput count={ count } setCount={ setCount } /> </p>
        <p>Subtotal: { subTotal } EUR</p>
    </div>;
}

reactDom.createRoot(document.getElementById('root')).render(<App />);