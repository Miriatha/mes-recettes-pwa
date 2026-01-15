let recettes = JSON.parse(localStorage.getItem("recettes")) || [];

const container = document.getElementById("recettes");
const ingredientsDiv = document.getElementById("ingredients");

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

  recettes.forEach(recette => {
    const fiche = document.createElement("div");
    fiche.className = "fiche-recette";

    fiche.innerHTML = `
      <h2>${recette.nom}</h2>
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

function viderFormulaire() {
  document.getElementById("nom").value = "";
  document.getElementById("preparation").value = "";
  document.getElementById("cuisson").value = "";
  ingredientsDiv.innerHTML = "";
}

ajouterIngredient();
afficherRecettes();
