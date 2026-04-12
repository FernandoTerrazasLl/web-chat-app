import Handlebars from "handlebars";
import templateSource from "./app-error.hbs?raw";
import cssText from "./app-error.css?raw";
import { Block } from "../block.ts";

const template = Handlebars.compile(templateSource);

type AppErrorConfig = {
    title: string;
    message: string;
    buttonText: string;
}

class AppError extends Block {

    protected render() {
        const config: AppErrorConfig = {
            title: this.getAttribute('title') || 'Error',
            message: this.getAttribute('message') || 'Ocurrió un error.',
            buttonText: this.getAttribute('button-text') || 'Volver'
        };
        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);
    }
}
customElements.define("app-error", AppError);

