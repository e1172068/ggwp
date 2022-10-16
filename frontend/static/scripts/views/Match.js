import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Détail de la partie");
    }

    /**
     * À partir du id envoyé via l'url, retourne le contenu et le balisage HTML de la page de détail de la partie concernée
     * @returns {string} 
     */
    async getHtml() {
        const nu = Number(this.params.id);

        // Récupère les données concernant la partie.
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        }

        const data = await getData("/static/scripts/views/summoner-info.json");
        const match = data["match" + nu];

        //Traitement de la durée pour respecter un format mm:ss
        const duration = match.info.gameDuration;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        
        function padDuration(n) {
            return n.toString().padStart(2, "0");
        }

        const formattedDuration = `${padDuration(minutes)}:${padDuration(seconds)}`

        // Création de la chaîne/balisage à retourner
        const participants = match.info.participants;
        let participantsList = "";

        for (const participant in participants) {
            if (Object.hasOwnProperty.call(participants, participant)) {
                const element = participants[participant];
                participantsList += `<li><strong>${element.summonerName}</strong> (niveau:  ${element.summonerLevel}) (champion: ${element.championName}, dégats infligés: ${element.totalDamageDealt})</li>`;
            }
        }

        return `
        <div class="container text-white">
            <h2 class="py-3">Détails de la partie</h2>
            <dl class="row">
                <dt class="col-sm-3">ID:</dt>
                <dd class="col-sm-9">${match.metadata.matchId}</dd>
                <dt class="col-sm-3">Serveur:</dt>
                <dd class="col-sm-9">${match.info.platformId}</dd>
                <dt class="col-sm-3">Mode de jeu:</dt>
                <dd class="col-sm-9">${match.info.gameMode}</dd>
                <dt class="col-sm-3">Durée:</dt>
                <dd class="col-sm-9">${formattedDuration}</dd>
                <dt class="col-sm-3">Participants:</dt>
                <dd class="col-sm-9">
                    <ul class="list-unstyled lh-lg">
                        ` + participantsList + `
                    </ul>
                </dd>
            </dl>
        </div>
        `;
    }
}