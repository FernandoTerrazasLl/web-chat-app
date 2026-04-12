import Handlebars from 'handlebars';
import templateSource from './header-profile.hbs?raw';
import cssText from './header-profile.css?raw';
import { Block } from '../../services/block.ts';

const template = Handlebars.compile(templateSource);

type HeaderProfileConfig = {
	profileSrc: string;
	profileAlt: string;
	chatName: string;
};

class HeaderProfile extends Block {

	protected render() {
		const config: HeaderProfileConfig = {
			profileSrc: this.getAttribute('profile-src') || '',
			profileAlt: this.getAttribute('profile-alt') || 'Perfil',
			chatName: this.getAttribute('chat-name') || 'Chat'
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}
}

customElements.define('header-profile', HeaderProfile);
