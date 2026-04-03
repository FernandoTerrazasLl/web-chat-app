/// <reference types="vite/client" />

declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

declare module "*.css?raw" {
  const content: string;
  export default content;
}
declare module "*.hbs" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: string;
  export default content;
}
