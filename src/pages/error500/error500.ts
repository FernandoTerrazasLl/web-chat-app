import templateSource from '../../partials/error500-page.hbs?raw';
import cssText from './error500.css?raw';
import Handlebars from 'handlebars';
import '../../components/error-component/error-component.ts';

const template = Handlebars.compile(templateSource);

class Error500Page extends HTMLElement {
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
            title: "500",
            message: "Ya lo estamos solucionando",
            buttonText: "Volver a los chats"
        };

        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);
    }
}

customElements.define("error500-page", Error500Page);