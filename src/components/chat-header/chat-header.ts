import Handlebars from 'handlebars';
import templateSource from './chat-header.hbs?raw';
import cssText from './chat-header.css?raw';
import '../header-profile/header-profile.ts';
import '../settings-btn/settings-btn.ts';
import { Block } from '../../services/block.ts';

const template = Handlebars.compile(templateSource);

type ChatHeaderConfig = {
	profileSrc: string;
	profileAlt: string;
	chatName: string;
};

class ChatHeader extends Block {

	protected render() {
		const config: ChatHeaderConfig = {
			profileSrc: this.getAttribute('profile-src') || '',
			profileAlt: this.getAttribute('profile-alt') || 'Perfil',
			chatName: this.getAttribute('chat-name') || 'Chat'
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}
}

customElements.define('chat-header', ChatHeader);
