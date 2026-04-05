import Handlebars from "handlebars";
import templateSource from "../../partials/app-error.hbs?raw";
import cssText from "./app-error.css?raw";

const template = Handlebars.compile(templateSource);

type AppErrorConfig = {
    title: string;
    message: string;
    buttonText: string;
}

class AppError extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    private render() {
        const config: AppErrorConfig = {
            title: this.getAttribute('title') || 'Error',
            message: this.getAttribute('message') || 'Ocurrió un error.',
            buttonText: this.getAttribute('button-text') || 'Volver'
        };
        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);
    }
}
customElements.define("app-error", AppError);

