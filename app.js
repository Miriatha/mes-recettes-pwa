const UNITES = [
  "g",
  "kg",
  "ml",
  "cl",
  "l",
  "pièce",
  "cuillère à café",
  "cuillère à soupe",
  "pincée"
];

let recettes = JSON.parse(localStorage.getItem("recettes")) || [];

const container = document.getElementById("recettes");
const ingredientsDiv = document.getElementById("ingredients");
const listeCourses = document.getElementById("liste-courses");

function ajouterIngredient() {
  const div = document.createElement("div");
  div.className = "ligne-ingredient";

  div.innerHTML = `
    <input type="text" placeholder="Ingrédient">
    <input type="number" placeholder="Quantité">
    <input type="text" placeholder="Unité">
  `;

  ingredientsDiv.appendChild(div);
}

function enregistrerRecette() {
  const nom = document.getElementById("nom").value;
  const categorie = document.getElementById("categorie").value;
  const preparation = document.getElementById("preparation").value;
  const cuisson = document.getElementById("cuisson").value;

  const ingredients = [];
  document.querySelectorAll(".ligne-ingredient").forEach(ligne => {
    const inputs = ligne.querySelectorAll("input");
    ingredients.push({
      nom: inputs[0].value,
      quantite: Number(inputs[1].value),
      unite: inputs[2].value
    });
  });

  const recette = {
    id: Date.now(),
    nom,
    categorie,
    ingredients,
    preparation,
    cuisson
  };

  recettes.push(recette);
  localStorage.setItem("recettes", JSON.stringify(recettes));

  afficherRecettes();
  viderFormulaire();
}

function afficherRecettes() {
  container.innerHTML = "";

  const filtre = document.getElementById("filtreCategorie").value;

  recettes
    .filter(r => filtre === "Toutes" || r.categorie === filtre)
    .forEach(recette => {

    const fiche = document.createElement("div");
    fiche.className = "fiche-recette";

    fiche.innerHTML = `
      <label>
        <input type="checkbox" onchange="calculerListeCourses()"
               data-id="${recette.id}">
        <strong>${recette.nom}</strong>
      </label>
      <span class="categorie">${recette.categorie}</span>

      <h3>🧾 Ingrédients</h3>
      <ul>
        ${recette.ingredients
          .map(i => `<li>${i.quantite} ${i.unite} - ${i.nom}</li>`)
          .join("")}
      </ul>

      <h3>👩‍🍳 Préparation</h3>
      <p>${recette.preparation}</p>

      <h3>🔥 Cuisson</h3>
      <p>${recette.cuisson}</p>
    `;

    container.appendChild(fiche);
  });
}

function calculerListeCourses() {
  const selection = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  const courses = {};

  selection.forEach(checkbox => {
    const id = Number(checkbox.dataset.id);
    const recette = recettes.find(r => r.id === id);

    recette.ingredients.forEach(i => {
      const cle = i.nom + "_" + i.unite;

      if (!courses[cle]) {
        courses[cle] = {
          nom: i.nom,
          unite: i.unite,
          quantite: 0
        };
      }

      courses[cle].quantite += i.quantite;
    });
  });

  afficherListeCourses(Object.values(courses));
}

function afficherListeCourses(items) {
  listeCourses.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.quantite} ${item.unite} - ${item.nom}`;
    listeCourses.appendChild(li);
  });
}

function viderFormulaire() {
  document.getElementById("nom").value = "";
  document.getElementById("preparation").value = "";
  document.getElementById("cuisson").value = "";
  ingredientsDiv.innerHTML = "";
}

ajouterIngredient();
afficherRecettes();


