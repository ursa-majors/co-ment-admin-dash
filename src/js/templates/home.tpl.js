import { html } from '../utils/html';

const homeTpl = (data) => html`
    <header></header>
    <section>
        <h1>Home</h1>
        <button id="btn-do-something">Do Something</button>
        <div id="output"></div>
    </section>
    <footer></footer>
`;

export { homeTpl };