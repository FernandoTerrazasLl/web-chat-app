import templateSource from './register.hbs?raw';
import cssText from './register.css?raw';
import Handlebars from 'handlebars';
import '../../components/app-form/app-form.ts';
import { Router } from '../../services/routing.ts';

const template = Handlebars.compile(templateSource);

class RegisterPage extends HTMLElement {
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
            action: '/register',
            method: 'post',
            title: 'Registro',
            submitText: 'Registrarse',
            alternativeBtnText: 'Ingresar',
            fields: JSON.stringify([
                {
                    id: 'mail',
                    labelText: 'Correo Electrónico',
                    type: 'email',
                    name: 'mail',
                    placeholderText: 'Correo Electrónico',
                    required: true
                },
                {
                    id: 'username',
                    labelText: 'Login',
                    type: 'text',
                    name: 'username',
                    placeholderText: 'Login',
                    required: true
                },
                {
                    id: 'name',
                    labelText: 'Nombre',
                    type: 'text',
                    name: 'name',
                    placeholderText: 'Nombre',
                    required: true
                },
                {
                    id: 'lastname',
                    labelText: 'Apellido',
                    type: 'text',
                    name: 'lastname',
                    placeholderText: 'Apellido',
                    required: true
                },
                {
                    id: 'phone',
                    labelText: 'Teléfono Celular',
                    type: 'text',
                    name: 'phone',
                    placeholderText: 'Teléfono Celular',
                    required: true
                },
                {
                    id: 'password',
                    labelText: 'Password',
                    type: 'password',
                    name: 'password',
                    placeholderText: 'Password',
                    required: true
                },
                {
                    id: 'confirm-password',
                    labelText: 'Password (Nuevamente)',
                    type: 'password',
                    name: 'confirm-password',
                    placeholderText: 'Password (Nuevamente)',
                    required: true
                }
            ])
        };

        this.shadow.innerHTML = "<style>" + cssText + "</style>" + template(config);
    }

    setupEventListeners() {
        this.addEventListener('alternative-click', () => {
            Router.go('/login');
        });
    }
}

customElements.define("register-page", RegisterPage);