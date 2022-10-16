import Home from "./views/Home.js";
import Profile from "./views/Profile.js";
import MatchHistory from "./views/MatchHistory.js";
import Match from "./views/Match.js";

// Traitement de la chaîne de caractère correspondant au path afin de pouvoir la comparer au location.pathname.
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// Récupère les paramètres envoyées dans le path.
const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
}; 

// Gestion des routes
const router = async() => {
    const routes = [
        { path: "/", view: Home },
        { path: "/profile", view: Profile },
        { path: "/match-history", view: MatchHistory },
        { path: "/match/:id", view: Match }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    // Si il n'y a pas un match entre le location.pathname et une route, alors on redirige à l'accueil.
    if(!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match));

    // Appel de la vue qui retourne la chaîne à injecter dans le html.
    document.querySelector(".app").innerHTML = await view.getHtml();
}

// Effectue le changement de page et ajouter à la pile d'historique.
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}


// Lance le retour au précédent du navigateur.
window.addEventListener("popstate", router);

// Pour chaque lien, au clic, naviguer à la cible puis appeler le routeur.
document.addEventListener("DOMContentLoaded", () => {
    let links = document.querySelectorAll("[data-link]");
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            navigateTo(e.target.href);
        })
    });
    router();
})
