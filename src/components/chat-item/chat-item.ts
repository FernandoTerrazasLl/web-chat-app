import Handlebars from 'handlebars';
import templateSource from './chat-item.hbs?raw';
import cssText from './chat-item.css?raw';
import { Block } from '../../services/block.ts';

const template = Handlebars.compile(templateSource);

type ChatItemConfig = {
	selectedClass: string;
	profileSrc: string;
	profileAlt: string;
	chatName: string;
	lastSender: string;
	lastMessage: string;
	lastMessageTime: string;
	countMessagesUnread: number;
	showUnread: boolean;
};

class ChatItem extends Block {

	private getChatId(): number {
		return Number(this.getAttribute('chat-id') || 0);
	}

	private selectChat() {
		const chatId = this.getChatId();
		if (!chatId) return;

		this.dispatchEvent(new CustomEvent('chat-selected', {
			bubbles: true,
			composed: true,
			detail: { chatId }
		}));
	}

	protected render() {
		const countUnread = Number(this.getAttribute('count-messages-unread') || 0);
		const isSelected = this.getAttribute('is-selected') === 'true';

		const config: ChatItemConfig = {
			selectedClass: isSelected ? 'chat-item--selected' : '',
			profileSrc: this.getAttribute('profile-src') || '',
			profileAlt: this.getAttribute('profile-alt') || 'Perfil',
			chatName: this.getAttribute('chat-name') || 'Chat',
			lastSender: this.getAttribute('last-sender') || '',
			lastMessage: this.getAttribute('last-message') || '',
			lastMessageTime: this.getAttribute('last-message-time') || '',
			countMessagesUnread: countUnread,
			showUnread: countUnread > 0
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}

	protected setupEventListeners() {
		const item = this.shadow.querySelector('.chat-item');
		if (!item) return;

		item.addEventListener('click', () => {
			this.selectChat();
		});
	}
}

customElements.define('chat-item', ChatItem);
