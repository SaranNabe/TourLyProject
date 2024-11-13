"use strict";

// selection elements
const form = document.querySelector(".sidebar-form");

let lat, lng;
// creation de la carte

const map = L.map("map", {
  center: [10.43061, -10.60934],
  zoom: 7.4,
});

// stocker la longitude et la latitude de la position du click de l'utilisateur sur la carte globalement

const imageInput = document.querySelector(".form_input--image");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Touly Team',
}).addTo(map);

const iconsMarkers = function (leSite) {
  var myIconClass = L.Icon.extend({
    options: {
      iconSize: [35, 35],
    },
  });

  var icon = new myIconClass({
    iconUrl: `images/${leSite.type}.png`,
  });

  // Appeler la fonction notes pour obtenir les étoiles
  const nombreEtoiles = notes(leSite.note);

  let popupHtml = `
   <div class="popup-container">
            <img class="popup-image" src="${leSite.imageSource}" alt="Site touristique">
            <div class="popup-content">
                <h1 class="popup-title">${leSite.nom}</h3>
                <div class="popup-rating">
                    ${nombreEtoiles}
                </div>
                <p class="popup-description">${leSite.description}</p>
            </div>
        </div>`;

  // Création du marker avec la popup personnalisée
  const marker = L.marker([leSite.lat, leSite.lng], { icon: icon })
    .addTo(map)
    .bindPopup(popupHtml, {
      maxWidth: 200,
      minWidth: 200,
    });

  // Attendre que la popup s'ouvre pour ajouter l'écouteur d'événement au bouton de fermeture

  // Tooltip permanent pour le nom du site
  const toolTipHtml = `<h4 class = "toolTipHtml">${leSite.nom}</h4>`;
  L.tooltip([leSite.lat, leSite.lng], {
    content: toolTipHtml,
    permanent: true,
    opacity: 0.7,
    className: "my-custom-tooltip",
  }).addTo(map);
};
// afficher la liste des sites

document.addEventListener("DOMContentLoaded", function () {
  const viewSitesBtn = document.querySelector(".view-sites-btn");

  viewSitesBtn.addEventListener("click", function () {
    // Masquer le formulaire et afficher la liste des sites
    document.querySelector(".sidebar-form").classList.add("hidden");
    document.querySelector(".sites-list").classList.remove("hidden");

    // Afficher les sites en utilisant renderForm
    renderForm();
  });
});
const validate_import_image = document.querySelector(".validate-image");
const validate_import_Json = document.querySelector(".validate-json");
// Fonction pour masquer le formulaire et réinitialiser les champs après l'ajout d'un site
function resetForm() {
  form.classList.add("hidden");
  form.reset();
}
// Fonction pour charger les sites depuis le local storage et les afficher
function loadTouristSites() {
  const savedSites = JSON.parse(localStorage.getItem("touristSites")) || [];

  savedSites.forEach((site) => {
    iconsMarkers(site);
  });
}

// Afficher les sites touristiques sauvegardés au chargement de la page
loadTouristSites();
const sitesListContainer = document.querySelector(".sites-list");

// click on map to display form
map.on("click", function (e) {
  form.classList.remove("hidden");
  sitesListContainer.classList.add("hidden");
  validate_import_image.classList.add("validate-hidden");
  validate_import_Json.classList.add("validate-hidden");

  // create a function to get the location of the user click on the map
  lat = e.latlng.lat;
  lng = e.latlng.lng;
});

// submit form to add marker

let imageSource;
// submit form to add marker
// Function to handle image loading
function loadImageUrl(event) {
  imageSource = "";
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    validate_import_image.classList.remove("validate-hidden");
    reader.onload = function (e) {
      imageSource = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

document
  .querySelector(".sidebar-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // 1. Récupérer les valeurs des champs du formulaire
    let nom = document.querySelector(".form_input--nom").value;
    let type = document.querySelector(".form_input--type").value;
    let adresse = document.querySelector(".form_input--Adresse").value;
    let description = document.querySelector(".form_input--description ").value;
    let note = document.querySelector(".form_input--note").value;
    let image = document.querySelector(".imageInput");

    // Add onchange handler to image input
    image.addEventListener("change", loadImageUrl);

    if (nom !== "" && adresse !== "" && description !== "" && note !== "") {
      const nouveauSite = {
        nom,
        type,
        adresse,
        description,
        lat,
        lng,
        note,
        imageSource,
      };
      iconsMarkers(nouveauSite);

      const sitesTouristiques =
        JSON.parse(localStorage.getItem("touristSites")) || [];
      sitesTouristiques.push(nouveauSite);
      localStorage.setItem("touristSites", JSON.stringify(sitesTouristiques));
      renderForm();
      document.querySelector(".sites-list").classList.remove("hidden");
    } else {
      alert(
        "Oups ! Vous avez entre un formulaire vide.. Veuillez Remplir les champs du formulaire..Merci !"
      );
    }
  });

function notes(note) {
  let nbStars = "";
  for (let i = 1; i <= note; i++) {
    nbStars += `<i class="fas fa-star"></i>`;
  }
  return nbStars;
}

// Fonction pour supprimer un site
function deleteSite(event) {
  const siteCard = event.target.closest(".site-card");
  const index = Array.from(siteCard.parentElement.children).indexOf(siteCard);

  // Récupérer les sites depuis localStorage
  let sites = JSON.parse(localStorage.getItem("touristSites")) || [];

  // Vérifier que l'index est valide
  if (index >= 0 && index < sites.length) {
    sites.splice(index, 1); // Supprimer le site du tableau

    // Mettre à jour le localStorage
    localStorage.setItem("touristSites", JSON.stringify(sites));

    // Supprimer la carte du DOM
    siteCard.remove();
    console.log("Site supprimé avec succès.");
  } else {
    console.log("Site non trouvé pour suppression.");
  }
}

// Fonction d'exportation d'un site spécifique
function exportSite(event) {
  const siteCard = event.target.closest(".site-card");
  const index = Array.from(siteCard.parentElement.children).indexOf(siteCard);

  // Récupérer les sites depuis localStorage
  const sites = JSON.parse(localStorage.getItem("touristSites")) || [];

  // Vérifier que l'index est valide et exporter le site
  if (index >= 0 && index < sites.length) {
    const siteToExport = sites[index];

    const blob = new Blob([JSON.stringify(siteToExport, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${siteToExport.nom || "site"}_export.json`;
    link.click();
  } else {
    alert("Site non trouvé pour l'exportation.");
  }
}

function editSite(index) {
  console.log("Édition du site à l'index : ", index);

  const sites = JSON.parse(localStorage.getItem("touristSites")) || [];
  const siteToEdit = sites[index];

  document.querySelector(".form_input--nom").value = siteToEdit.nom;
  document.querySelector(".form_input--type").value = siteToEdit.type;
  document.querySelector(".form_input--Adresse").value = siteToEdit.adresse;
  document.querySelector(".form_input--description").value =
    siteToEdit.description;
  document.querySelector(".form_input--note").value = siteToEdit.note;

  document.querySelector(".sidebar-form").classList.remove("hidden");
  sitesListContainer.classList.add("hidden");

  const saveButton = document.querySelector(".submit-btn");
  saveButton.onclick = function (e) {
    e.preventDefault();

    siteToEdit.nom = document.querySelector(".form_input--nom").value;
    siteToEdit.type = document.querySelector(".form_input--type").value;
    siteToEdit.adresse = document.querySelector(".form_input--Adresse").value;
    siteToEdit.description = document.querySelector(
      ".form_input--description"
    ).value;
    siteToEdit.note = document.querySelector(".form_input--note").value;

    sites[index] = siteToEdit;
    localStorage.setItem("touristSites", JSON.stringify(sites));

    // Actualiser les cartes avec les données mises à jour
    renderForm();

    // Masquer le formulaire et afficher la liste des sites
    document.querySelector(".sidebar-form").classList.add("hidden");
    sitesListContainer.classList.remove("hidden");
  };
}

function renderForm() {
  // Récupérer les sites depuis le local storage
  const sites = JSON.parse(localStorage.getItem("touristSites")) || [];

  // Sélectionner l'élément de la liste des sites

  sitesListContainer.innerHTML = ""; // Effacer le contenu précédent

  // Masquer le formulaire
  form.classList.add("hidden");

  // Créer une carte pour chaque site
  sites.forEach((site, index) => {
    const siteCard = document.createElement("div");
    siteCard.classList.add("site-card");
    // Appeler la fonction notes pour obtenir les étoiles
    const nombreEtoiles = notes(site.note);
    siteCard.innerHTML = `
    <div class="content">
        <h3 class="site-name">${site.nom}</h3>
        <div class="flex-card">
           <img src="${site.imageSource}" class="image-card" />
           <ul class="list-card">
              <li class="detail"><img src="images/${site.type}.png"/> ${site.type}</li>
              <li class="location detail"><i class="fas fa-map-marker-alt"></i> ${site.adresse}</li>
              <li class="detail description-card"><i class="fas fa-pencil-alt"></i> ${site.description}</li>
              <li class="note detail"><strong>Note : </strong> ${nombreEtoiles}</li> <!-- Icône de note -->
            </ul>
        </div>
    </div>
    <div class="actions">
        <button class="action-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
        <button class="action-btn update-btn"><i class="fas fa-edit"></i></button>
        <button class="action-btn export-btn"><i class="fas fa-file-export"></i></button>
    </div>
`;
    // Ajouter les événements de suppression et d'exportation
    const deleteBtn = siteCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteSite);

    const exportBtn = siteCard.querySelector(".export-btn");
    exportBtn.addEventListener("click", exportSite);

    siteCard
      .querySelector(".update-btn")
      .addEventListener("click", () => editSite(index));

    sitesListContainer.appendChild(siteCard);
  });
}

// ajouter les sites touristiques par defaut sur la carte
const sites = [
  {
    nom: "Mosquee Fayçal",
    lat: 9.533258281258433,
    lng: -13.684109763053776,
    description: `La mosquée Fayçal de Conakry, est l'une des plus grandes mosquées d'Afrique de l'Ouest,
     construite en 1982 avec le soutien de l'Arabie Saoudite,
     et elle impressionne par son architecture majestueuse et sa capacité à accueillir des milliers de fidèles`,
    type: "Musée",
    imageSource: "images/img/fayçal.png",
    note: 5,
  },
  {
    nom: "Plage de Soro",
    lat: 11.68982,
    lng: -11.14757,
    description: `La plage de Soro, située près de la ville de Boffa en Guinée, est réputée pour son sable fin,
     ses eaux claires et son cadre naturel paisible,
     offrant un lieu idéal pour la détente et les promenades au bord de l'océan Atlantique.`,
    type: "Plages",
    imageSource: "images/img/soro.jpg",
    note: 4,
  },
  {
    nom: "Mont Nimba",
    lat: 7.617091795349358,
    lng: -8.415336401170412,
    description: `Le mont Nimba, à la frontière entre la Guinée, la Côte d'Ivoire et le Liberia, 
    est une réserve naturelle classée au patrimoine mondial de l'UNESCO, célèbre pour sa biodiversité exceptionnelle,
     ses paysages de montagnes verdoyantes et ses espèces endémiques, comme le crapaud vivipare.`,
    type: "Montagnes",
    imageSource: "images/img/mont_nimba.jpg",
    note: 5,
  },
  {
    nom: "Mont Loura",
    lat: 12.072212988218624,
    lng: -12.083155531127227,
    description: `Le mont Loura, situé dans la région du Fouta-Djalon en Guinée, 
    est le point culminant de la chaîne du même nom, offrant des vues panoramiques spectaculaires,
     des formations rocheuses uniques et des sentiers prisés par les amateurs de randonnée.`,
    type: "Montagnes",
    imageSource: "images/img/loura.jpg",
    note: 3,
  },
  {
    nom: "Mont Kakoulima",
    lat: 9.778147156461221,
    lng: -13.425665047431071,
    description: `Le mont Kakoulima, situé près de Conakry en Guinée, est une montagne impressionnante offrant des paysages verdoyants,
     des cascades et des sentiers de randonnée qui attirent les passionnés de nature et les amateurs d’aventure.`,
    type: "Montagnes",
    imageSource: "images/img/Mont_Kakoulima1.jpg",
    note: 2,
  },
  {
    nom: "Plages de Tayaki",
    lat: 9.701148072494183,
    lng: -13.621648304782385,
    description: `Les plages de Tayaki, situées près de Boffa en Guinée, sont réputées pour leur sable doré,
     leurs eaux calmes et leur ambiance préservée, 
    offrant un cadre idyllique pour se détendre et profiter de la beauté naturelle de la côte atlantique guinéenne.`,
    type: "Plages",
    imageSource: "images/img/tayaki.jpg",
    note: 4,
  },
  {
    nom: "L'îls de Loos",
    lat: 9.463063416336105,
    lng: -13.796760157484282,
    description: `L'archipel des îles de Loos, situé au large de Conakry en Guinée, 
    est un ensemble d'îles tropicales réputé pour ses plages de sable fin, ses eaux turquoise et son ambiance paisible,
     constituant une destination prisée pour l'écotourisme et les excursions en pleine nature.`,
    type: "Plages",
    imageSource: "images/img/îls de loos.jpg",
    note: 5,
  },
  {
    nom: "Le Kouratier",
    lat: 10.687352044998255,
    lng: -12.263997724083419,
    description: `Le kouratier, ou arbre à palabres (souvent identifié comme un kapokier ou baobab), 
    est un arbre majestueux et symbolique en Afrique de l'Ouest, connu pour son ombrage accueillant où les communautés se rassemblent pour discuter, 
    prendre des décisions importantes ou partager des récits traditionnels.`,
    type: "Plages",
    imageSource: "images/img/le kouratier.jpg",
    note: 5,
  },
  {
    nom: "La Cascade de la Soumba",
    lat: 9.752877680853397,
    lng: -13.589015007020208,
    description:`La cascade de Soumba, située dans la région de Dubréka en Guinée, est une merveille naturelle spectaculaire, 
    avec ses eaux tumultueuses tombant en plusieurs niveaux sur des rochers,
     créant un cadre pittoresque et une destination populaire pour les amoureux de la nature et les randonneurs.`,
    type: "Chutes",
    imageSource: "images/img/soumba.jpg",
    note: 4,
  },
  {
    nom: "Le voile de la Mariee",
    lat: 55.53809044376197,
    lng: -21.03952159110099,
    description: `Le Voile de la Mariée, situé dans la région de Dubréka en Guinée, est une magnifique cascade à couper le souffle,
     qui tire son nom de la forme de son eau tombant en rideaux, évoquant un voile blanc et délicat,
     et est un lieu prisé des visiteurs pour sa beauté spectaculaire et son atmosphère paisible.`,
    type: "Chutes",
    imageSource: "images/img/voile de la marié.jpg",
    note: 5,
  },
];

sites.forEach((site) => {
  iconsMarkers(site);
});

// gerer l'importation du fichier json ... et l'ajouter sur la carte

function loadJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return; // Vérifier qu'un fichier a bien été sélectionné

  const reader = new FileReader();
  validate_import_Json.classList.remove("validate-hidden");
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result); // Parser les données JSON

      // Vérifier si le fichier contient bien une liste de sites touristiques
      if (!Array.isArray(data))
        throw new Error("Le fichier JSON doit être un tableau de sites.");

      // Parcourir chaque site et l'ajouter à la carte et au local storage
      data.forEach((site) => {
        const { nom, type, adresse, description, note } = site; // Ignore lat et lng

        // Créer un objet leSite sans lat et lng
        const leSite = { nom, type, adresse, description, note, lat, lng }; // Utiliser les lat et lng globaux

        // Appeler la fonction iconsMarkers
        iconsMarkers(leSite);

        // Ajouter chaque site importé dans le local storage
        let touristSites =
          JSON.parse(localStorage.getItem("touristSites")) || [];
        touristSites.push(leSite); // Utiliser l'objet leSite
        localStorage.setItem("touristSites", JSON.stringify(touristSites));
      });
      alert("Sites importés avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'importation du fichier JSON :", error);
      alert(
        "Erreur lors de l'importation du fichier JSON. Assurez-vous que le format est correct."
      );
    }
  };

  reader.readAsText(file); // Lire le fichier comme du texte
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-btn")) {
    document.querySelector(".popup").style.display = "none";
  }
});

// Fonction pour récupérer les sites du localStorage
function getSitesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("touristSites")) || [];
}

// Fonction pour rechercher un site parmi ceux ajoutés par l'utilisateur et les sites par défaut
function searchUserSite(query) {
  // Charger les sites depuis le localStorage
  const localSites = getSitesFromLocalStorage();

  // Fusionner les sites par défaut et ceux stockés dans le localStorage
  const allSites = [...sites, ...localSites];

  // Recherche un site parmi tous les sites
  const site = allSites.find((site) =>
    site.nom.toLowerCase().includes(query.toLowerCase())
  );

  if (site) {
    // Si un site est trouvé, centrer la carte sur ce site et ajouter un marqueur
    map.setView(new L.LatLng(site.lat, site.lng), 15); // Utilisation de L.LatLng pour Leaflet
  } else {
    alert("Site non trouvé parmi les sites ajoutés.");
  }
}

// Fonction pour exécuter la recherche quand l'utilisateur appuie sur "Entrée" ou clique sur le bouton
document
  .getElementById("search-input")
  .addEventListener("keydown", function (event) {
    form.classList.add("hidden");
    if (event.key === "Enter") {
      searchSite(event.target.value); // Recherche le site et ajuste la carte
    }
  });

document.getElementById("search-btn").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  searchSite(query); // Recherche le site et ajuste la carte
});

// Fonction pour gérer la recherche
function searchSite(query) {
  // Effectue la recherche dans les sites locaux ou via l'API Google
  if (query) {
    // Recherche parmi les sites de l'utilisateur et ceux par défaut
    searchUserSite(query); // Recherche dans les sites personnalisés
  } else {
    alert("Veuillez entrer un nom de site à rechercher.");
  }
}
