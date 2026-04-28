import reactDom from 'react-dom/client';
import { useState } from 'react';
import { CountInput } from "./CountInput.js";
import series from "./hero_exports.js";

const App = () => {
    // Array für SubTotals erzeugen
    const [subTotals, setSubTotals] = useState(Array(series.length).fill(0));

    // Funktion, um ein einzelnes SubTotal im Array zu aktualisieren
    const updateGlobalTotal = (index, value) => {
        const newSubTotals = [...subTotals];
        newSubTotals[index] = value;
        setSubTotals(newSubTotals);
    };

    // Gesamtsumme berechnen (Summe aller Werte im Array)
    const total = subTotals.reduce((sum, current) => sum + current, 0);

    return (
        <div>
            <h2>Artikel-Liste</h2>
            <ul>
                {series.map((hero, index) => (
                    <li key={hero.seriesNo} className="hero_series">
                        <HeroItem 
                            {...hero} 
                            onSubTotalChange={(val) => updateGlobalTotal(index, val)} 
                        />
                    </li>
                ))}
            </ul>
            <p><strong>Total: {total.toFixed(2)} EUR</strong></p>
        </div>
    );
};

const HeroItem = (props) => {
    const [count, setCount] = useState(0);

    // Berechnung SubTotal
    const subTotal = count * props.price;
    
    // Sobald sich das subTotal hier ändert, muss die App informiert werden
    // Das machen wir normalerweise in einem useEffect oder direkt beim Setzen des Counts
    const handleCountChange = (newCount) => {
        setCount(newCount);
        props.onSubTotalChange(newCount * props.price);
    };

    return (
        <div style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
            <h3>Serie {props.seriesNo}: {props.name}</h3>
            <p>Preis: {props.price} EUR</p>
            <p>
                Artikelanzahl: 
                <CountInput count={count} setCount={handleCountChange} />
            </p>
            <p>Subtotal: {subTotal.toFixed(2)} EUR</p>
        </div>
    );
};

reactDom.createRoot(document.getElementById('root')).render(<App />);