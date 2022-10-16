const express = require("express");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();

// Importation des middlewares nécessaires à l'exécution de la requête POST.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const { 
    PORT,
    API_KEY
} = require("./config.js");

const server = app.listen(PORT || 8080, function() {
    console.log("Listening on port " + server.address().port);
});

// Spécification du répertoire d'où exécuter les fichiers statiques.
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

// Pour toutes les requêtes en get, affichage de l'index.html.
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
})

// Pour la route "/" avecl a méthode post, appel à getInfo() en envoyant en argument le summonerName récupérer dans le corps de la requête.
app.post("/", async (req, res) => {
    await getInfo(req.body.summonerName)
        .then(() => { res.redirect("/profile") });
});

/**
 * Récupère les informations pertinentes aux affichages requis dans les pages profil, historique des matchs et détail des match à partir des APIs SUMMONER-V4 et MATCH-V5 de Riot Games. Les données sont assemblées en un objet summonerInfo puis celui-ci est transcrit dans le fichier summoner-info.json. Les différentes vues lui feront appel afin de générer les affichages requis.
 * ref: https://developer.riotgames.com/apis#summoner-v4, https://developer.riotgames.com/apis#match-v5
 * @param {string} name correspond au nom donnée au joueur en jeu.
 */
async function getInfo(name) {
    let summonerInfo = {}

    let link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}?api_key=${API_KEY}`;
    let response = await fetch(link);
    let playerData = await response.json();
    let puuid = playerData.puuid;
    
    link = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=5&api_key=${API_KEY}`;
    response = await fetch(link);
    let matchHistory = await response.json();
    
    summonerInfo.playerData = playerData;
    summonerInfo.matchHistory = matchHistory;

    for (let i = 0; i < matchHistory.length; i++) {
        const matchId = matchHistory[i];
        
        link = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;
        response = await fetch(link);
        let match = await response.json();

        summonerInfo["match" + i] = match;
    }

    fs.writeFile("./frontend/static/scripts/views/summoner-info.json", JSON.stringify(summonerInfo), function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Summoner Info file successfully written.");
        }
    });
}

