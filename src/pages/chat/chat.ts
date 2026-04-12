import templateSource from './chat.hbs?raw';
import cssText from './chat.css?raw';
import Handlebars from 'handlebars';
import '../../components/side-bar/side-bar.ts';
import '../../components/chat-view/chat-view.ts';
import profileImageDefault from '../../images/profile-image-default.svg';
import randomImage from '../../images/random-image.svg';

const template = Handlebars.compile(templateSource);

type Message = {
	type: 'incoming' | 'outgoing';
	text?: string;
	time: string;
	imageSrc?: string;
};

type Chat = {
	id: number;
	chatName: string;
	profileSrc: string;
	profileAlt: string;
	lastSender: string;
	lastMessage: string;
	lastMessageTime: string;
	countMessagesUnread: number;
	dayLabel: string;
	messages: Message[];
};

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

type ActiveChat = {
	id: number;
	chatName: string;
	profileSrc: string;
	profileAlt: string;
	dayLabel: string;
	messages: Message[];
};

class ChatPage extends HTMLElement {
	shadow: ShadowRoot;
	chats: Chat[];
	selectedChatId: number | null;
	searchQuery: string;
	currentUser: string;
	private hasListeners: boolean;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.chats = this.getInitialChats();
		this.selectedChatId = null;
		this.searchQuery = '';
		this.currentUser = 'fernando';
		this.hasListeners = false;
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	private getInitialChats(): Chat[] {
		return [
			{
				id: 1,
				chatName: 'Andrey',
				profileSrc: profileImageDefault,
				profileAlt: 'Foto de Andrey',
				lastSender: '',
				lastMessage: 'Imagen',
				lastMessageTime: '10:49',
				countMessagesUnread: 2,
				dayLabel: '19 de Junio',
				messages: []
			},
			{
				id: 2,
				chatName: 'CineCenter',
				profileSrc: profileImageDefault,
				profileAlt: 'Foto de CineCenter',
				lastSender: 'Tu: ',
				lastMessage: 'Sticker',
				lastMessageTime: '12:00',
				countMessagesUnread: 0,
				dayLabel: '19 de Junio',
				messages: []
			},
			{
				id: 3,
				chatName: 'Jesus',
				profileSrc: profileImageDefault,
				profileAlt: 'Foto de Jesus',
				lastSender: '',
				lastMessage: '¡Amigos, tengo para ustedes un boletin especial de noticias!...',
				lastMessageTime: '15:12',
				countMessagesUnread: 4,
				dayLabel: '19 de Junio',
				messages: []
			},
			{
				id: 4,
				chatName: 'Pedro',
				profileSrc: profileImageDefault,
				profileAlt: 'Foto de Pedro',
				lastSender: 'Tu: ',
				lastMessage: 'Super!',
				lastMessageTime: 'Viernes',
				countMessagesUnread: 0,
				dayLabel: '19 de Junio',
				messages: [
					{
						type: 'incoming',
						text: '¡Hola! Mira, aqui salio una parte interesante de la historia lunar espacial: en algun momento, la NASA le pidio a Hasselblad que adaptara el modelo SWC para los vuelos a la Luna. Ahora todos sabemos que los astronautas volaron con el modelo 500 EL, y por cierto, todos los cuerpos de esas camaras aun estan en la superficie de la Luna, ya que los astronautas solo se llevaron las cintas con la pelicula.\n\nAl final, Hasselblad adapto el SWC para el espacio, pero algo salio mal y nunca llegaron a la nave. En total, se produjeron 25 unidades, y una de ellas se vendio recientemente en una subasta por 45,000 euros.',
						time: '11:56'
					},
					{
						type: 'incoming',
						imageSrc: randomImage,
						time: '11:56'
					},
					{
						type: 'outgoing',
						text: 'Super!',
						time: '12:00'
					}
				]
			},
			{
				id: 5,
				chatName: 'ChatGPT',
				profileSrc: profileImageDefault,
				profileAlt: 'Foto de ChatGPT',
				lastSender: '',
				lastMessage: 'Tanto las Human Interface Guidelines como Material ...',
				lastMessageTime: 'Miercoles',
				countMessagesUnread: 0,
				dayLabel: '19 de Junio',
				messages: []
			},
			{
				id: 6,
				chatName: '1, 2, 3',
				profileSrc: profileImageDefault,
				profileAlt: 'Foto de 1, 2, 3',
				lastSender: '',
				lastMessage: 'Millones de bolivianos pasan decenas de horas al dia en su ...',
				lastMessageTime: 'Lunes',
				countMessagesUnread: 0,
				dayLabel: '19 de Junio',
				messages: []
			},
			{
				id: 7,
				chatName: 'Design Destroyer',
				profileSrc: profileImageDefault,
				profileAlt: 'Foto de Design Destroyer',
				lastSender: '',
				lastMessage: 'En 2008, el artista Jan Rafman comenzo a recopilar...',
				lastMessageTime: 'Lunes',
				countMessagesUnread: 0,
				dayLabel: '19 de Junio',
				messages: []
			},
			{
				id: 8,
				chatName: 'Day.',
				profileSrc: profileImageDefault,
				profileAlt: 'Foto de Day',
				lastSender: '',
				lastMessage: 'Se entusiasmo tanto con el trabajo del curso que olvide ...',
				lastMessageTime: '1 Mayo 2025',
				countMessagesUnread: 0,
				dayLabel: '19 de Junio',
				messages: []
			}
		];
	}

	private getFilteredChats(): Chat[] {
		const normalizedQuery = this.searchQuery.trim().toLowerCase();
		if (!normalizedQuery) return this.chats;

		return this.chats.filter((chat) => chat.chatName.toLowerCase().includes(normalizedQuery));
	}

	private getActiveChat(): ActiveChat | null {
		if (this.selectedChatId === null) return null;

		const selectedChat = this.chats.find((chat) => chat.id === this.selectedChatId);
		if (!selectedChat) return null;

		return {
			id: selectedChat.id,
			chatName: selectedChat.chatName,
			profileSrc: selectedChat.profileSrc,
			profileAlt: selectedChat.profileAlt,
			dayLabel: selectedChat.dayLabel,
			messages: selectedChat.messages
		};
	}

	private getTimeNow(): string {
		const date = new Date();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}

	private render() {
		const filteredChats = this.getFilteredChats();
		const chatPreviews: ChatPreview[] = filteredChats.map((chat) => ({
			id: chat.id,
			chatName: chat.chatName,
			profileSrc: chat.profileSrc,
			profileAlt: chat.profileAlt,
			lastSender: chat.lastSender,
			lastMessage: chat.lastMessage,
			lastMessageTime: chat.lastMessageTime,
			countMessagesUnread: chat.countMessagesUnread,
			isSelected: chat.id === this.selectedChatId
		}));

		const activeChat = this.getActiveChat();

		const config = {
			chats: JSON.stringify(chatPreviews),
			searchQuery: this.searchQuery,
			activeChat: activeChat ? JSON.stringify(activeChat) : '',
			currentUser: this.currentUser
		};

		this.shadow.innerHTML = '<style>' + cssText + '</style>' + template(config);
	}

	private setupEventListeners() {
		if (this.hasListeners) return;

		this.addEventListener('search-change', (event) => {
			const customEvent = event as CustomEvent<{ query: string }>;
			this.searchQuery = customEvent.detail.query;
			this.render();
		});

		this.addEventListener('chat-selected', (event) => {
			const customEvent = event as CustomEvent<{ chatId: number }>;
			this.selectedChatId = customEvent.detail.chatId;
			this.render();
		});

		this.addEventListener('send-message', (event) => {
			const customEvent = event as CustomEvent<{ chatId: number; text: string }>;
			const chat = this.chats.find((item) => item.id === customEvent.detail.chatId);
			if (!chat) return;

			const text = customEvent.detail.text.trim();
			if (!text) return;

			const now = this.getTimeNow();
			chat.messages.push({ type: 'outgoing', text, time: now });
			chat.lastSender = 'Tu: ';
			chat.lastMessage = text;
			chat.lastMessageTime = now;
			chat.countMessagesUnread = 0;

			this.render();
		});
		/*
		this.addEventListener('attachment-selected', (event) => {
            //no implementado todavia
		});

		this.addEventListener('add-user-confirm', (event) => {
			const customEvent = event as CustomEvent<{ username: string }>;
            //no implementado todavia
		});

		this.addEventListener('delete-user-confirm', (event) => {
			const customEvent = event as CustomEvent<{ username: string }>;
            //no implementado todavia
		});
		*/
		this.hasListeners = true;
	}
}

customElements.define('chat-page', ChatPage);
