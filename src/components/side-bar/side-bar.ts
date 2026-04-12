import Handlebars from 'handlebars';
import templateSource from './side-bar.hbs?raw';
import cssText from './side-bar.css?raw';
import '../search-bar/search-bar.ts';
import '../chat-list/chat-list.ts';
import { Block } from '../block.ts';

const template = Handlebars.compile(templateSource);

class SideBar extends Block {

	protected render() {
		const config = {
			chats: this.getAttribute('chats') || '[]',
			searchQuery: this.getAttribute('search-query') || ''
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}
}

customElements.define('side-bar', SideBar);
