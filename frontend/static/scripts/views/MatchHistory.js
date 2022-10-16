import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Historique des matchs");
    }

    /**
     * Retourne le contenu et le balisage HTML de la page historique.
     * @returns {string} 
     */
    async getHtml() {
        // Récupère les données concernant l'historique du joueur
        async function getData(url) {
            fetch(url)
                const response = await fetch(url);
                return response.json();
        }

        const data = await getData("/static/scripts/views/summoner-info.json")
            .then(function(data) {
                return data;   
            }.bind(this), function(err){
                window.location.replace("/");
            }.bind(this));
        
            
            const matchHistory = data.matchHistory;

            // Création de la chaîne à retourner.
            // Redirection à l'accueil si la donnée ne correspond pas au format attendu/contient un message d'erreur sous la propriété status.
            if (!matchHistory.hasOwnProperty("status")) {
                let matchesList = "<ul>";
            
                for (let i = 0; i < matchHistory.length; i++) {
                    const match = matchHistory[i];
        
                    matchesList += "<li><a href='/match/" + i + "'>" + match + "</a></li>"
                }
        
                matchesList += "</ul>"

                return `<div class="container text-white">
                            <h2 class="py-3">Vos 5 dernières parties</h1>
                            ${matchesList}
                        </div>`
            } else {
                window.location.replace("/");
            };
                
            
    }
}