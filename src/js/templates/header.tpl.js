import { html } from '../utils/html';

/** generate nav li elements
*/
const navLink = (link) => html`
    <li>
        <a href="#${link.href}">${link.name}</a>
    </li>
`;


/** generate the header
*/
const headerTpl = (links) => html`

    <div class="head-brand">
        <a href="#/"><h1>co/ment</h1></a>
    </div>

    <nav class="head-nav">
        <ul>
            ${links.map( link => navLink(link) )}
        </ul>
    </nav>
`;

export { headerTpl };