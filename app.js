// ===== DONNÉES =====
var UNITES = ["g", "kg", "ml", "cl", "l", "pièce"];
var recettes = [];
var imageBase64 = null;

// ===== IMAGE =====
window.addEventListener("DOMContentLoaded", function () {
  var imageInput = document.getElementById("image");
  var preview = document.getElementById("preview");

  if (imageInput) {
    imageInput.addEventListener("change", function () {
      var file = imageInput.files[0];
      if (!file) return;

      var reader = new FileReader();
      reader.onload = function (e) {
        imageBase64 = e.target.result;
        preview.src = imageBase64;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    });
  }
});

// ===== INGREDIENT =====
function ajouterIngredient() {
  var container = document.getElementById("ingredients");

  var div = document.createElement("div");

  var inputNom = document.createElement("input");
  inputNom.type = "text";
  inputNom.placeholder = "Ingrédient";

  var inputQte = document.createElement("input");
  inputQte.type = "number";
  inputQte.placeholder = "Quantité";

  var select = document.createElement("select");
  for (var i = 0; i < UNITES.length; i++) {
    var option = document.createElement("option");
    option.value = UNITES[i];
    option.textContent = UNITES[i];
    select.appendChild(option);
  }

  div.appendChild(inputNom);
  div.appendChild(inputQte);
  div.appendChild(select);

  container.appendChild(div);
}

// ===== ENREGISTRER =====
function enregistrerRecette() {
  var nom = document.getElementById("nom").value;
  var categorie = document.getElementById("categorie").value;
  var preparation = document.getElementById("preparation").value;
  var cuisson = document.getElementById("cuisson").value;

  var ingredients = [];
  var lignes = document.querySelectorAll("#ingredients div");

  for (var i = 0; i < lignes.length; i++) {
    var inputs = lignes[i].getElementsByTagName("input");
    var select = lignes[i].getElementsByTagName("select")[0];

    ingredients.push({
      nom: inputs[0].value,
      quantite: inputs[1].value,
      unite: select.value
    });
  }

  var recette = {
    nom: nom,
    categorie: categorie,
    image: imageBase64,
    ingredients: ingredients,
    preparation: preparation,
    cuisson: cuisson
  };

  recettes.push(recette);
  afficherRecettes();
  viderFormulaire();
}

// ===== AFFICHER =====
function afficherRecettes() {
  var container = document.getElementById("recettes");
  container.innerHTML = "";

  for (var i = 0; i < recettes.length; i++) {
    var r = recettes[i];

    var div = document.createElement("div");
    div.className = "fiche";

    if (r.image) {
      var img = document.createElement("img");
      img.src = r.image;
      img.className = "image-recette";
      div.appendChild(img);
    }

    var titre = document.createElement("strong");
    titre.textContent = r.nom + " (" + r.categorie + ")";
    div.appendChild(titre);

    container.appendChild(div);
  }
}

// ===== RESET =====
function viderFormulaire() {
  document.getElementById("nom").value = "";
  document.getElementById("preparation").value = "";
  document.getElementById("cuisson").value = "";
  document.getElementById("ingredients").innerHTML = "";
  imageBase64 = null;

  var preview = document.getElementById("preview");
  if (preview) preview.style.display = "none";
}
