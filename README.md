Tourly
Introduction et Objectifs du Projet:
Tourly est une application web interactive permettant aux utilisateurs de découvrir, ajouter, modifier et exporter des informations sur les sites touristiques en Guinée via une carte dynamique. Cette plateforme vise à centraliser toutes les informations touristiques du pays, offrant ainsi aux utilisateurs une expérience de découverte et de contribution. Grâce à Tourly, chacun peut enrichir la carte avec de nouveaux lieux comme des musées, parcs, plages et autres attractions touristiques.

Instructions d'Installation et d'Exécution
Cloner le dépôt :

git clone [URL du dépôt]
Naviguer dans le dossier du projet :

cd tourly

Ouvrir l'application : Ouvrez index.html dans un navigateur pour lancer l’application.

Prérequis

Assurez-vous d'avoir un navigateur à jour compatible avec HTML5, CSS3 et JavaScript ES6.
Une connexion internet peut être nécessaire si des services de cartes externes (par exemple, Leaflet ou Mapbox) sont utilisés.

Guide d'Utilisation de l'Application

Navigation sur la Carte
Explorer : Parcourez la carte pour visualiser les sites touristiques déjà enregistrés.
Affichage des sites : Les sites sont marqués sur la carte avec des icônes spécifiques. En cliquant sur un marqueur, une pop-up s'affiche avec les informations du site.
Ajout d'un Site Touristique
Ajouter manuellement : Cliquez sur un emplacement de la carte pour ouvrir un formulaire. Remplissez les champs requis :
Nom du site
Adresse
Type de site (Musée, Parc, Plage, etc.)
Description
Importer depuis un fichier JSON : Chargez un fichier JSON contenant des informations de sites touristiques. Le fichier doit être structuré en tant que tableau d’objets avec les champs suivants : nom, adresse, type, description, lat, lng.
Modification d’un Site
Dans la liste de sites (affichée sous forme de cartes dans la sidebar), cliquez sur le bouton Modifier pour mettre à jour les informations d’un site. Une fenêtre de modification s’ouvre, permettant d’éditer le nom, l’adresse, le type, et la description du site.
Suppression d'un Site
Cliquez sur le bouton Supprimer dans la carte d’un site pour l’enlever de la carte et du local storage. Une alerte de confirmation apparaît avant la suppression.
Exportation des Informations d’un Site
Utilisez le bouton Exporter pour télécharger les informations d’un site sous forme de fichier JSON. Le fichier contient le nom, l’adresse, le type, et la description du site, dans un format structuré pour une réimportation éventuelle.
Description des Fonctionnalités Implémentées
Carte interactive :

Utilisation d’une carte dynamique centrée sur la Guinée.
Chaque site touristique est marqué sur la carte, avec des infobulles personnalisées affichant le nom du site au survol.
Ajout de sites via formulaire et fichier JSON :

Ajout manuel : Formulaire de saisie pour créer un site avec les informations de base.
Ajout par import : Import de sites depuis un fichier JSON, permettant d’ajouter plusieurs sites en une seule opération.
Modification des informations des sites :

Interface de modification accessible dans la sidebar pour actualiser les informations d’un site spécifique.
Suppression et exportation des sites :

Suppression directe via bouton sur chaque carte.
Exportation en JSON des informations d’un site pour une gestion externe ou un archivage.
Stockage local :

Utilisation de localStorage pour sauvegarder les sites ajoutés, permettant leur persistance entre les sessions.
Info-bulles personnalisées pour les markers :

Les markers de chaque site affichent une infobulle avec le nom du site pour une identification rapide.
Choix Techniques Effectués
Frontend : Utilisation de HTML, CSS et JavaScript pour l’interface utilisateur.
Cartographie : Intégration de la bibliothèque Leaflet.js pour gérer l’affichage de la carte et des markers.
Local Storage : Stockage des informations de sites ajoutés directement dans le navigateur avec localStorage, facilitant la persistance des données sans base de données externe.
Fichiers JSON : Gestion de l’import et de l’export des données de sites en JSON pour une manipulation aisée et des échanges de données.
Problèmes Rencontrés et Solutions Apportées
Gestion du temps
Défi : Manque de temps en raison d'un emploi du temps chargé à l'université et d’autres engagements.
Solution : Priorisation des fonctionnalités essentielles (ajout, suppression, modification) et intégration des fonctionnalités avancées (exportation, importation) dès que possible.
Gestion des fichiers JSON
Défi : Vérification de la structure des fichiers JSON pour éviter les erreurs lors de l’import.
Solution : Mise en place de validations pour s'assurer que les fichiers JSON importés respectent le format attendu. Message d’erreur clair en cas de problème.
Nommer les markers et personnalisation des info-bulles
Défi : Affichage des noms de sites sur les markers de manière lisible.
Solution : Utilisation de styles CSS pour ajuster la couleur, la taille de police et le positionnement des info-bulles.
Stylisation du formulaire et design de l’application
Défi : Trouver un design simple et intuitif tout en restant esthétiquement agréable.
Solution : Utilisation de classes CSS personnalisées pour rendre le formulaire et la sidebar cohérents et bien intégrés à l’interface.
Conclusion
Tourly offre une plateforme innovante pour explorer et enrichir les informations touristiques de Guinée. À travers son interface simple et son utilisation de la carte interactive, chaque utilisateur peut contribuer à rendre le patrimoine du pays plus accessible et organisé. Tourly simplifie le partage de lieux touristiques en proposant des outils d'ajout, de modification, et d'export des informations, créant ainsi une ressource précieuse pour les résidents comme pour les visiteurs.

