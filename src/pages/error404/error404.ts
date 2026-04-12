import templateSource from './error404.hbs?raw';
import cssText from './error404.css?raw';
import Handlebars from 'handlebars';
import '../../components/app-error/app-error.ts';
import { Block } from '../../services/block.ts';

const template = Handlebars.compile(templateSource);

class Error404Page extends Block {

    constructor() {
        super();
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