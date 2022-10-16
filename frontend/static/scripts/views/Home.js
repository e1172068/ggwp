import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Accueil");
    }

    /**
     * Retourne le contenu et le balisage HTML de la page d'accueil de l'application
     * @returns {string} 
     */
    async getHtml() {
        return `
        <div class="container col-xl-10 col-xxl-8 px-4 py-5 bg-dark text-light">
            <div class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start">
                <h1 class="display-4 fw-bold lh-1 mb-3">Good luck, have fun</h1>
                <p class="col-lg-10 fs-4 text-secondary">Chez GLHF, vous pouvez consulter en temps réel des statistiques dressant un portrait de vos performances à League of Legends.</p>
            </div>
            <div class="col-md-10 mx-auto col-lg-5">
            <form action="http://127.0.0.1:8081/" method="post" class="p-4 p-md-5 border rounded-3 bg-light text-dark">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" name="summonerName" placeholder="Nom d'invocateur">
                    <label for="floatingInput">Nom d'invocateur</label>
                </div>
                <button class="w-100 btn btn-lg btn-primary mb-2" type="submit">Envoyer</button>
                <small>Le profil, l'historique des parties et le détail des parties sont disponibles uniquement si vous soumettez un nom d'invocateur valide.</small>
                </form>
            </div>
            </div>
        </div>
        `
    }
}