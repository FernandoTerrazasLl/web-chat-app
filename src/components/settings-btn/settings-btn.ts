import Handlebars from 'handlebars';
import templateSource from './settings-btn.hbs?raw';
import cssText from './settings-btn.css?raw';
import optionsIcon from '../../images/options-icon.svg';
import addIcon from '../../images/add-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';
import { Block } from '../block.ts';

const template = Handlebars.compile(templateSource);

type SettingsBtnConfig = {
	optionsIconSrc: string;
	addIconSrc: string;
	deleteIconSrc: string;
	menuClass: string;
};

class SettingsBtn extends Block {
	private isOpen: boolean;

	constructor() {
		super();
		this.isOpen = false;
	}

	protected render() {
		const config: SettingsBtnConfig = {
			optionsIconSrc: optionsIcon,
			addIconSrc: addIcon,
			deleteIconSrc: deleteIcon,
			menuClass: this.isOpen ? 'settings-btn__menu--open' : ''
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}

	protected setupEventListeners() {
		const trigger = this.shadow.querySelector('.settings-btn__trigger');
		const addUserBtn = this.shadow.querySelector('[data-option="add"]');
		const deleteUserBtn = this.shadow.querySelector('[data-option="delete"]');

		trigger?.addEventListener('click', () => {
			this.isOpen = !this.isOpen;
			this.render();
			this.setupEventListeners();
		});

		addUserBtn?.addEventListener('click', () => {
			this.dispatchEvent(new CustomEvent('add-user', {
				bubbles: true,
				composed: true
			}));

			this.isOpen = false;
			this.render();
			this.setupEventListeners();
		});

		deleteUserBtn?.addEventListener('click', () => {
			this.dispatchEvent(new CustomEvent('delete-user', {
				bubbles: true,
				composed: true
			}));

			this.isOpen = false;
			this.render();
			this.setupEventListeners();
		});
	}
}

customElements.define('settings-btn', SettingsBtn);
