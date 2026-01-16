const UNITES = [
  "g", "kg", "ml", "cl", "l",
  "pièce", "cuillère à café", "cuillère à soupe", "pincée"
];

let recettes = JSON.parse(localStorage.getItem("recettes")) || [];
let recetteEnCoursEdition = null;
let imageBase64 = null;

/* IMAGE */
document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    imageBase64 = e.target.result;
    const preview = document.getElementById("preview");
    preview.src = imageBase64;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

/* INGREDIENT */
function ajouterIngredient(nom = "", quantite = "", unite = UNITES[0]) {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Ingrédient" value="${nom}">
    <input type="number" placeholder="Quantité" value="${quantite}">
    <select>
      ${UNITES.map(u => `<option value="${u}" ${u === unite ? "selected" : ""}>${u}</option>`).join("")}
    </select>
  `;
  document.getElementById("ingredients").appendChild(div);
}

/* ENREGISTRER */
function enregistrerRecette() {
  const nom = document.getElementById("nom").value;
  const categorie = document.getElementById("categorie").value;
  const preparation = document.getElementById("preparation").value;
  const cuisson = document.getElementById("cuisson").value;

  const ingredients = [];
  document.querySelectorAll("#ingredients div").forEach(div => {
    const inputs = div.querySelectorAll("input");
    const select = div.querySelector("select");
    ingredients.push({
      nom: inputs[0].value,
      quantite: Number(inputs[1].value),
      unite: select.value
    });
  });

  const recette = {
    id: recetteEnCoursEdition || Date.now(),
    nom,
    categorie,
    image: imageBase64,
    ingredients,
    preparation,
    cuisson
  };

  if (recetteEnCoursEdition) {
    const index = recettes.findIndex(r => r.id === recetteEnCoursEdition);
    recettes[index] = recette;
    recetteEnCoursEdition = null;
  } else {
    recettes.push(recette);
  }

  localStorage.setItem("recettes", JSON.stringify(recettes));
  viderFormulaire();
  afficherRecettes();
}

/* AFFICHER */
function afficherRecettes() {
  const container = document.getElementById("recettes");
  container.innerHTML = "";

  const filtre = document.getElementById("filtreCategorie").value;

  recettes
    .filter(r => filtre === "Toutes" || r.categorie === filtre)
    .forEach(recette => {
      const fiche = document.createElement("div");
      fiche.className = "fiche";

      fiche.innerHTML = `
        ${recette.image ? `<img src="${recette.image}" class="image-recette">` : ""}
        <strong>${recette.nom}</strong> (${recette.categorie})
        <br>
        <button onclick="modifierRecette(${recette.id})">✏️ Modifier</button>
        <button onclick="supprimerRecette(${recette.id})">🗑️ Supprimer</button>
      `;

      container.appendChild(fiche);
    });
}

/* MODIFIER */
function modifierRecette(id) {
  const recette = recettes.find(r => r.id === id);
  if (!recette) return;

  recetteEnCoursEdition = id;

  document.getElementById("nom").value = recette.nom;
  document.getElementById("categorie").value = recette.categorie;
  document.getElementById("preparation").value = recette.preparation;
  document.getElementById("cuisson").value = recette.cuisson;

  imageBase64 = recette.image;
  const preview = document.getElementById("preview");
  if (imageBase64) {
    preview.src = imageBase64;
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }

  const ing = document.getElementById("ingredients");
  ing.innerHTML = "";
  recette.ingredients.forEach(i => ajouterIngredient(i.nom, i.quantite, i.unite));
}

/* SUPPRIMER */
function supprimerRecette(id) {
  if (!confirm("Supprimer cette recette ?")) return;
  recettes = recettes.filter(r => r.id !== id);
  localStorage.setItem("recettes", JSON.stringify(recettes));
  afficherRecettes();
}

/* RESET */
function viderFormulaire() {
  document.getElementById("nom").value = "";
  document.getElementById("preparation").value = "";
  document.getElementById("cuisson").value = "";
  document.getElementById("ingredients").innerHTML = "";
  document.getElementById("image").value = "";
  document.getElementById("preview").style.display = "none";
  imageBase64 = null;
}

/* INIT */
afficherRecettes();
