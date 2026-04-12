import Handlebars from 'handlebars';
import templateSource from './chat-input-bar.hbs?raw';
import cssText from './chat-input-bar.css?raw';
import sendIcon from '../../images/send-icon.svg';
import '../chat-attachment-btn/chat-attachment-btn.ts';
import { Block } from '../../services/block.ts';

const template = Handlebars.compile(templateSource);

type ChatInputBarConfig = {
	placeholder: string;
	sendIconSrc: string;
};

class ChatInputBar extends Block {

	protected render() {
		const config: ChatInputBarConfig = {
			placeholder: this.getAttribute('placeholder') || 'Mensaje',
			sendIconSrc: sendIcon
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}

	private sendMessage() {
		const input = this.shadow.querySelector('.chat-input-bar__input') as HTMLInputElement | null;
		if (!input) return;

		const text = input.value.trim();
		if (!text) return;

		this.dispatchEvent(new CustomEvent('send-message', {
			bubbles: true,
			composed: true,
			detail: { text }
		}));

		input.value = '';
	}

	protected setupEventListeners() {
		const sendBtn = this.shadow.querySelector('.chat-input-bar__send-btn');
		const input = this.shadow.querySelector('.chat-input-bar__input') as HTMLInputElement | null;
		const attachmentBtn = this.shadow.querySelector('chat-attachment-btn');

		sendBtn?.addEventListener('click', () => {
			this.sendMessage();
		});

		input?.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				this.sendMessage();
			}
		});

		attachmentBtn?.addEventListener('attachment-selected', (event) => {
			const customEvent = event as CustomEvent<{ option: string }>;

			this.dispatchEvent(new CustomEvent('attachment-selected', {
				bubbles: true,
				composed: true,
				detail: {
					option: customEvent.detail.option
				}
			}));
		});
	}
}

customElements.define('chat-input-bar', ChatInputBar);
