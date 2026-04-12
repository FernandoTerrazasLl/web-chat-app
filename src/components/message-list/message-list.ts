import Handlebars from 'handlebars';
import templateSource from './message-list.hbs?raw';
import cssText from './message-list.css?raw';
import '../message-item/message-item.ts';
import { Block } from '../block.ts';

const template = Handlebars.compile(templateSource);

type Message = {
	type: 'incoming' | 'outgoing';
	text?: string;
	time: string;
	imageSrc?: string;
};

type MessageListConfig = {
	dayLabel: string;
	messages: Message[];
};

class MessageList extends Block {

	private parseMessages(): Message[] {
		const raw = this.getAttribute('messages') || '[]';

		try {
			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed)) return [];
			return parsed;
		} catch {
			return [];
		}
	}

	protected render() {
		const config: MessageListConfig = {
			dayLabel: this.getAttribute('day-label') || '',
			messages: this.parseMessages()
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}
}

customElements.define('message-list', MessageList);
