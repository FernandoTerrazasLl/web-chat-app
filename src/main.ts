import './style.css';
import './pages/login/login.ts';
import './pages/register/register.ts';
import './pages/error500/error500.ts';
import './pages/error404/error404.ts';
import './pages/chat/chat.ts';
import './pages/profile/profile.ts';
import { Router } from './services/routing.ts';


document.addEventListener("DOMContentLoaded", () => {
    Router.init();
});

