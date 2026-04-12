import Handlebars from 'handlebars';
import templateSource from './chat-list.hbs?raw';
import cssText from './chat-list.css?raw';
import '../chat-item/chat-item.ts';
import { Block } from '../block.ts';

const template = Handlebars.compile(templateSource);

type ChatPreview = {
	id: number;
	chatName: string;
	profileSrc: string;
	profileAlt: string;
	lastSender: string;
	lastMessage: string;
	lastMessageTime: string;
	countMessagesUnread: number;
	isSelected: boolean;
};

type ChatListConfig = {
	chats: ChatPreview[];
};

class ChatList extends Block {

	private parseChats(): ChatPreview[] {
		const raw = this.getAttribute('chats') || '[]';

		try {
			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed)) return [];
			return parsed;
		} catch {
			return [];
		}
	}

	protected render() {
		const config: ChatListConfig = {
			chats: this.parseChats()
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}
}

customElements.define('chat-list', ChatList);
