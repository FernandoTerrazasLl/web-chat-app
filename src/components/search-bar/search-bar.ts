import Handlebars from 'handlebars';
import templateSource from './search-bar.hbs?raw';
import cssText from './search-bar.css?raw';
import searchIcon from '../../images/search-icon.svg';
import { Block } from '../../services/block.ts';

const template = Handlebars.compile(templateSource);

type SearchBarConfig = {
	value: string;
	placeholder: string;
	iconSrc: string;
};

class SearchBar extends Block {

	protected render() {
		const config: SearchBarConfig = {
			value: this.getAttribute('value') || '',
			placeholder: this.getAttribute('placeholder') || 'Search',
			iconSrc: searchIcon
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}

	protected setupEventListeners() {
		const input = this.shadow.querySelector('.search-bar__input') as HTMLInputElement | null;
		if (!input) return;

		input.addEventListener('input', () => {
			this.dispatchEvent(new CustomEvent('search-change', {
				bubbles: true,
				composed: true,
				detail: { query: input.value }
			}));
		});
	}
}

customElements.define('search-bar', SearchBar);
