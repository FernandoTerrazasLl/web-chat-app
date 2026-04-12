import templateSource from './profile.hbs?raw';
import cssText from './profile.css?raw';
import Handlebars from 'handlebars';
import { Block } from '../../services/block';

const template = Handlebars.compile(templateSource);

class ProfilePage extends Block {

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const config = {
			title: 'Perfil',
			subtitle: 'Aqui podras editar tus datos.',
			buttonText: 'Volver al chat'
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}
}

customElements.define('profile-page', ProfilePage);
