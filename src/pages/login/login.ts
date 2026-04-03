import templateSource from '../../partials/login-page.hbs?raw';
import cssText from './login.css?raw';
import Handlebars from 'handlebars';
import '../../components/form-component/form-component.ts';
import { Router } from '../../services/routing.ts';

const template = Handlebars.compile(templateSource);

class LoginPage extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const config = {
            action: '/login',
            method: 'post',
            title: 'Entrada',
            submitText: 'Iniciar Sesion',
            alternativeBtnText: '¿No tienes una cuenta?',
            fields: JSON.stringify([
                {
                    id: 'username',
                    labelText: 'Login',
                    type: 'text',
                    name: 'username',
                    placeholderText: 'Login',
                    required: true
                },
                {
                    id: 'password',
                    labelText: 'Password',
                    type: 'password',
                    name: 'password',
                    placeholderText: 'Password',
                    required: true
                }
            ])
        };

        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);
    }

    setupEventListeners() {
        this.addEventListener('alternative-click', () => {
            Router.go('/register');
        });
    }
}

customElements.define("login-page", LoginPage);