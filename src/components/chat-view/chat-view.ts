import Handlebars from 'handlebars';
import templateSource from './chat-view.hbs?raw';
import cssText from './chat-view.css?raw';
import emptyIcon from '../../images/messajes-icon.svg';
import '../chat-header/chat-header.ts';
import '../message-list/message-list.ts';
import '../chat-input-bar/chat-input-bar.ts';
import { Block } from '../block.ts';

const template = Handlebars.compile(templateSource);

type Message = {
	type: 'incoming' | 'outgoing';
	text?: string;
	time: string;
	imageSrc?: string;
};

type ActiveChat = {
	id: number;
	chatName: string;
	profileSrc: string;
	profileAlt: string;
	dayLabel: string;
	messages: Message[];
};

type ChatViewConfig = {
	hasActiveChat: boolean;
	emptyIconSrc: string;
	emptyText: string;
	chatId: number;
	chatName: string;
	profileSrc: string;
	profileAlt: string;
	dayLabel: string;
	messages: string;
};

class ChatView extends Block {

	private parseActiveChat(): ActiveChat | null {
		const raw = this.getAttribute('chat') || '';
		if (!raw) return null;

		try {
			const parsed = JSON.parse(raw);
			if (!parsed || typeof parsed !== 'object') return null;
			return parsed;
		} catch {
			return null;
		}
	}

	protected render() {
		const activeChat = this.parseActiveChat();

		const config: ChatViewConfig = {
			hasActiveChat: !!activeChat,
			emptyIconSrc: emptyIcon,
			emptyText: 'Elige un chat para enviar el mensaje',
			chatId: activeChat?.id || 0,
			chatName: activeChat?.chatName || '',
			profileSrc: activeChat?.profileSrc || '',
			profileAlt: activeChat?.profileAlt || '',
			dayLabel: activeChat?.dayLabel || '',
			messages: JSON.stringify(activeChat?.messages || [])
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}

	protected setupEventListeners() {
		const activeChat = this.parseActiveChat();
		if (!activeChat) return;

		const chatInputBar = this.shadow.querySelector('chat-input-bar');
		const chatHeader = this.shadow.querySelector('chat-header');

		chatInputBar?.addEventListener('send-message', (event) => {
			const customEvent = event as CustomEvent<{ text: string }>;

			this.dispatchEvent(new CustomEvent('send-message', {
				bubbles: true,
				composed: true,
				detail: {
					chatId: activeChat.id,
					text: customEvent.detail.text
				}
			}));
		});

		chatInputBar?.addEventListener('attachment-selected', (event) => {
			const customEvent = event as CustomEvent<{ option: string }>;

			this.dispatchEvent(new CustomEvent('attachment-selected', {
				bubbles: true,
				composed: true,
				detail: {
					chatId: activeChat.id,
					option: customEvent.detail.option
				}
			}));
		});

		chatHeader?.addEventListener('add-user', () => {
			const username = window.prompt('Ingresa el usuario que quieres agregar:');
			if (!username) return;

			this.dispatchEvent(new CustomEvent('add-user-confirm', {
				bubbles: true,
				composed: true,
				detail: {
					chatId: activeChat.id,
					username
				}
			}));
		});

		chatHeader?.addEventListener('delete-user', () => {
			const username = window.prompt('Confirma tu usuario para eliminar al participante:');
			if (!username) return;

			this.dispatchEvent(new CustomEvent('delete-user-confirm', {
				bubbles: true,
				composed: true,
				detail: {
					chatId: activeChat.id,
					username
				}
			}));
		});
	}
}

customElements.define('chat-view', ChatView);
