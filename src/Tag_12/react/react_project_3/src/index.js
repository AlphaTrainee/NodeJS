import ReactDom from 'react-dom/client';
import { ItemNoInput } from './ItemNoInput.js';

const App = () =>
    <div>
        <div><ItemNoInput /> Jessica Jones</div>
        <div><ItemNoInput /> Luke Cage</div>
        <div><ItemNoInput /> Daredevil</div>
    </div>;

ReactDom.createRoot(document.getElementById('root'))
    .render(<App />);
