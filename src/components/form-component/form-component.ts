import Handlebars from "handlebars";
import templateSource from "../../partials/form-component.hbs?raw";
import cssText from "./form-component.css?raw";

const template = Handlebars.compile(templateSource);

interface Field {
    id: string;
    labelText: string;
    type: string;
    name: string;
    placeholderText: string;
    required: boolean;
}

interface FormConfig {
    action: string;
    method: string;
    title: string;
    submitText: string;
    alternativeBtnText: string;
    fields: Field[];
}

class FormComponent extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    private render() {
        const config: FormConfig = {
            action: this.getAttribute('action') || '/submit',
            method: this.getAttribute('method') || 'post',
            title: this.getAttribute('title') || 'Formulario',
            submitText: this.getAttribute('submit-text') || 'Enviar',
            alternativeBtnText: this.getAttribute('alternative-btn-text') || '',
            fields: JSON.parse(this.getAttribute('fields') || '[]')
        };
        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);

        this.alterantiveEvent();
    }

    private alterantiveEvent(){
        const altBtn = this.shadow.querySelector('.form__alternative-btn');
        if (altBtn) {
            altBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('alternative-click', { bubbles: true, composed: true }));
            });
        }
    }
}
customElements.define("form-component", FormComponent);

