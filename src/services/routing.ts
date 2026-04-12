const routes: Record<string, string> = {
    "/": "login-page",
    "/login": "login-page",
    "/register": "register-page",
    "/error500": "error500-page",
    "/error404": "error404-page",
    "/chat": "chat-page",
    "/profile": "profile-page"
};

export const Router = {
    routes,

    getAnchorFromEvent: (event: MouseEvent): HTMLAnchorElement | null => {
        const path = typeof event.composedPath === "function" ? event.composedPath() : [];
        for (const node of path) {
            if (node instanceof HTMLAnchorElement) {
                return node;
            }
        }
        return null;
    },

    go: (route: string, addToHistory = true) => {
        const routeString = Router.routes[route] ? route : "/";

        if (addToHistory) {
            history.pushState({ route: routeString }, "", routeString);
        }

        const sectionId = Router.routes[routeString];
        if (!sectionId) return;

        const section = document.createElement(sectionId);

        const main = document.querySelector(".main");
        if (!main) return;

        main.firstElementChild?.remove();
        main.appendChild(section);

        document.body.dataset.route = routeString;
        window.scrollTo(0, 0);
    },

    init: () => {
        document.addEventListener("click", (event) => {
            const anchor = Router.getAnchorFromEvent(event);
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href || !href.startsWith("/")) return;

            event.preventDefault();
            Router.go(href);
        });

        window.addEventListener("popstate", (event) => {
            const route = event.state?.route || window.location.pathname;
            Router.go(route, false);
        });

        Router.go(window.location.pathname, false);
    }
};
