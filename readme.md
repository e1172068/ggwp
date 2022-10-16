># TP1 - SPA avec REST - GGWP

Version live sur serveur personnel: https://mstonge.dev/ggwp <br>
Github: https://github.com/e1172068/ggwp


## Instructions d'installation en local
1. Télécharger et décompresser le projet.
2. Installer node.sj.
3. Assurez-vous que le fichier package.json soit bien présent à la racine du projet et installer les dépendances à l'aide de la commande suivante: `npm install`.
4. Créer un fichier .env à la racine du projet et insérez-y le port désiré ainsi que votre clé d'API Riot Games: <br>
`PORT = "****"`<br>
`API_KEY = "RGAPI-********-****-****-****-************"`
5. Dans le fichier `ggwp/frontend/static/scripts/views/Home.js` changer l'url dans l'action du formulaire afin qu'il corresponde au port que vous avez choisi d'utiliser.
6. Positionnez-vous à la racine du serveur, lancer le terminal et exécuter la commande `node server.js` pour lancer celui-ci.
7. Hopefully you're good to go! 

## Note pour installation sur un serveur distant
Pour l'installation sur un serveur distant, les chemins relatifs devront être ajustés en fonction de la configuration de votre serveur. Ainsi plusieurs paths pourraient être à changer. Dans une version ultérieure de ce projet, cette gestion sera centralisée dans un fichier de configuration. Fichiers concernés: l'ensemble des fichiers contenu dans le dossier `views`, la navigation de `index.html`, le fichier `server.js`. 



## Noms de joueurs pour tester la recherche
| Username |
|----------|
Chèvre Chétive
unavocado