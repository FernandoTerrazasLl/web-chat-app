export abstract class Block extends HTMLElement {
	protected readonly shadow: ShadowRoot;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	attributeChangedCallback() {
		this.render();
		this.setupEventListeners();
	}

	protected abstract render(): void;

	protected setupEventListeners(): void {}
}
