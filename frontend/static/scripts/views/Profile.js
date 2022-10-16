import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Profil");
    }

    /**
     * Retourne le contenu et le balisage HTML de la page historique.
     * @returns {string} 
     */
    async getHtml() {
        // Récupère les données concernant l'historique du joueur
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        }

        const data = await getData("/static/scripts/views/summoner-info.json")
            .then(function(data) {
                return data;   
            }.bind(this), function(err){
                window.location.replace("/");
            }.bind(this));

        const playerData = data.playerData;

        // Création de la chaîne à retourner.
        // Redirection à l'accueil si la donnée ne correspond pas au format attendu/contient un message d'erreur sous la propriété status.
        if (!playerData.hasOwnProperty("status")) {
            return `
            <div class="container text-white">
                <h2 class="py-3">Votre profil</h2>
                <div class="d-flex flex-row align-items-center flex-wrap">
                    <img class="medaillon" src="http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/${playerData.profileIconId}.png" alt="Icône profil">
                    <ul class="list-unstyled">
                        <li>Nom d'invocateur: ${playerData.name}</li>
                        <li>Niveau: ${playerData.summonerLevel}</li> 
                    </ul>
                </div>
            </div>
            `;
        } else {
            window.location.replace("/");
        }    
    }
}