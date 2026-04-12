import Handlebars from 'handlebars';
import templateSource from './message-item.hbs?raw';
import cssText from './message-item.css?raw';
import { Block } from '../block.ts';

const template = Handlebars.compile(templateSource);

type MessageItemConfig = {
	typeClass: string;
	text: string;
	time: string;
	imageSrc: string;
	showImage: boolean;
};

class MessageItem extends Block {

	protected render() {
		const type = this.getAttribute('type') === 'outgoing' ? 'outgoing' : 'incoming';
		const imageSrc = this.getAttribute('image-src') || '';

		const config: MessageItemConfig = {
			typeClass: type === 'outgoing' ? 'message-item--outgoing' : 'message-item--incoming',
			text: this.getAttribute('text') || '',
			time: this.getAttribute('time') || '',
			imageSrc,
			showImage: !!imageSrc
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}
}

customElements.define('message-item', MessageItem);
