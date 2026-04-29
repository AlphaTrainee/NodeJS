// älter
// import ReactDom from "react-dom";

// neue Root API
import ReactDom from "react-dom/client";
import series from './hero_exports.js';

// immer Großbuchstaben
const App = () =>
    <div>
        <h2>Hero List</h2>
        <ul>
            <Hero heroName={"Jessica Jones"}>
                <p>At amet sadipscing sed et no et diam consetetur, nonumy aliquyam takimata no labore est. Rebum voluptua invidunt ut rebum.</p>
                <h4>Activities</h4>
                <p>At amet sadipscing sed et no et diam consetetur, nonumy aliquyam takimata no labore est. Rebum voluptua invidunt ut rebum.</p>
            </Hero>
            <Hero heroName={"Luke Cage"} />
            <Hero heroName={"Daredevil"} />
        </ul>

        <h2>Serien auf DVD</h2>
        <ul>
            {
                series.map( (hero) =>
                    <li key={hero.seriesNo} clasName="hero_series">
                        <HeroDVD { ...hero } />
                    </li>
                )
            }
        </ul>

    </div>;

const Hero = (props) =>
    <li>
        <h3><u>{ props.heroName }</u></h3>
        <i>{ props.children }</i>
    </li>;

const HeroDVD = (props) =>
    <h3>
        Serie { props.heroName }: <u>{  props.name }</u> - <i>(DVD für { props.price } EUR)</i>
    </h3>;

























// älter
// ReactDom.render(<App />, document.getElementById('root'));

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);