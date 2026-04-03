import Handlebars from "handlebars";
import templateSource from "../../partials/error-component.hbs?raw";
import cssText from "./error-component.css?raw";

const template = Handlebars.compile(templateSource);

type ErrorComponentConfig = {
    title: string;
    message: string;
    buttonText: string;
}

class ErrorComponent extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    private render() {
        const config: ErrorComponentConfig = {
            title: this.getAttribute('title') || 'Error',
            message: this.getAttribute('message') || 'Ocurrió un error.',
            buttonText: this.getAttribute('button-text') || 'Volver'
        };
        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);
    }
}
customElements.define("error-component", ErrorComponent);
