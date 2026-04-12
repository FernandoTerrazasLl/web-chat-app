import Handlebars from 'handlebars';
import templateSource from './chat-attachment-btn.hbs?raw';
import cssText from './chat-attachment-btn.css?raw';
import clipIcon from '../../images/clip-icon.svg';
import ubicationIcon from '../../images/ubication-icon.svg';
import fileIcon from '../../images/file-icon.svg';
import fotoIcon from '../../images/foto-icon.svg';
import { Block } from '../../services/block.ts';

const template = Handlebars.compile(templateSource);

type ChatAttachmentBtnConfig = {
	clipIconSrc: string;
	ubicationIconSrc: string;
	fileIconSrc: string;
	fotoIconSrc: string;
	menuClass: string;
};

class ChatAttachmentBtn extends Block {
	private isOpen: boolean;

	constructor() {
		super();
		this.isOpen = false;
	}

	protected render() {
		const config: ChatAttachmentBtnConfig = {
			clipIconSrc: clipIcon,
			ubicationIconSrc: ubicationIcon,
			fileIconSrc: fileIcon,
			fotoIconSrc: fotoIcon,
			menuClass: this.isOpen ? 'chat-attachment-btn__menu--open' : ''
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}

	private emitOption(option: string) {
		this.dispatchEvent(new CustomEvent('attachment-selected', {
			bubbles: true,
			composed: true,
			detail: { option }
		}));
	}

	protected setupEventListeners() {
		const trigger = this.shadow.querySelector('.chat-attachment-btn__trigger');
		const options = this.shadow.querySelectorAll('.chat-attachment-btn__option');

		trigger?.addEventListener('click', () => {
			this.isOpen = !this.isOpen;
			this.render();
			this.setupEventListeners();
		});

		options.forEach((optionButton) => {
			optionButton.addEventListener('click', () => {
				const option = optionButton.getAttribute('data-option') || '';
				if (!option) return;

				this.emitOption(option);
				this.isOpen = false;
				this.render();
				this.setupEventListeners();
			});
		});
	}
}

customElements.define('chat-attachment-btn', ChatAttachmentBtn);
