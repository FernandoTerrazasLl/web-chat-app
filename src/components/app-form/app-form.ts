import Handlebars from "handlebars";
import templateSource from "./app-form.hbs?raw";
import cssText from "./app-form.css?raw";
import { Block } from "../block.ts";

const template = Handlebars.compile(templateSource);

type Field = {
    id: string;
    labelText: string;
    type: string;
    name: string;
    placeholderText: string;
    required: boolean;
}

type AppFormConfig = {
    action: string;
    method: string;
    title: string;
    submitText: string;
    alternativeBtnText: string;
    fields: Field[];
}

class AppForm extends Block {

    protected render() {
        const config: AppFormConfig = {
            action: this.getAttribute('action') || '/submit',
            method: this.getAttribute('method') || 'post',
            title: this.getAttribute('title') || 'Formulario',
            submitText: this.getAttribute('submit-text') || 'Enviar',
            alternativeBtnText: this.getAttribute('alternative-btn-text') || '',
            fields: JSON.parse(this.getAttribute('fields') || '[]')
        };
        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);

        this.alternativeEvent();
    }

    private alternativeEvent() {
        const altBtn = this.shadow.querySelector('.form__alternative-btn');
        if (altBtn) {
            altBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('alternative-click', { bubbles: true, composed: true }));
            });
        }
    }
}
customElements.define("app-form", AppForm);