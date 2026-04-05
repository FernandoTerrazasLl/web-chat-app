import templateSource from '../../partials/error404-page.hbs?raw';
import cssText from './error404.css?raw';
import Handlebars from 'handlebars';
import '../../components/app-error/app-error.ts';

const template = Handlebars.compile(templateSource);

class Error404Page extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const config = {
            title: "404",
            message: "Nos equivocamos de lugar",
            buttonText: "Volver a los chats"
        };

        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);
    }
}

customElements.define("error404-page", Error404Page);