// ===== DONNÉES =====
const UNITES = ["g", "kg", "ml", "cl", "l", "pièce"];

let recettes = [];
let imageBase64 = null;

// ===== IMAGE =====
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

if (imageInput) {
  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      imageBase64 = e.target.result;
      preview.src = imageBase64;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

// ===== INGREDIENT =====
function ajouterIngredient() {
  const div = document.createElement("div");

  div.innerHTML = `
    <input type="text" placeholder="Ingrédient">
    <input type="number" placeholder="Quantité">
    <select>
      ${UNITES.map(u => `<option value="${u}">${u}</option>`).join("")}
    </select>
  `;

  document.getElementById("ingredients").appendChild(div);
}

// ===== ENREGISTRER =====
function enregistrerRecette() {
  const nom = document.getElementById("nom").value;
  const categorie = document.getElementById("categorie").value;
  const preparation = document.getElementById("preparation").value;
  const cuisson = document.getElementById("cuisson").value;

  const ingredients = [];
  document.querySelectorAll("#ingredients div").forEach(div => {
    const inputs = div.querySelectorAll("input");
    const unite = div.querySelector("select").value;

    ingredients.push({
      nom: inputs[0].value,
      quantite: inputs[1].value,
      unite: unite
    });
  });

  const recette = {
    nom,
    categorie,
    image: imageBase64,
    ingredients,
    preparation,
    cuisson
  };

  recettes.push(recette);
  afficherRecettes();
  viderFormulaire();
}

// ===== AFFICHER =====
function afficherRecettes() {
  const container = document.getElementById("recettes");
  container.innerHTML = "";

  recettes.forEach(recette => {
    const div = document.createElement("div");
    div.className = "fiche";

    div.innerHTML = `
      ${recette.image ? `<img src="${recette.image}" class="image-recette">` : ""}
      <strong>${recette.nom}</strong> (${recette.categorie})
    `;

    container.appendChild(div);
  });
}

// ===== RESET =====
function viderFormulaire() {
  document.getElementById("nom").value = "";
  document.getElementById("preparation").value = "";
  document.getElementById("cuisson").value = "";
  document.getElementById("ingredients").innerHTML = "";
  imageBase64 = null;
  preview.style.display = "none";
}
