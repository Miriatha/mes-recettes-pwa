const recettes = [
  {
    id: 1,
    nom: "Omelette au fromage",
    categorie: "Plat",
    ingredients: [
      { nom: "Œufs", quantite: 3, unite: "pièces" },
      { nom: "Fromage râpé", quantite: 100, unite: "g" },
      { nom: "Beurre", quantite: 10, unite: "g" }
    ],
    preparation: "Battre les œufs dans un bol, ajouter le fromage.",
    cuisson: "Cuire à feu moyen 5 minutes."
  },
  {
    id: 2,
    nom: "Salade de fruits",
    categorie: "Dessert",
    ingredients: [
      { nom: "Pomme", quantite: 2, unite: "pièces" },
      { nom: "Banane", quantite: 2, unite: "pièces" },
      { nom: "Orange", quantite: 1, unite: "pièce" }
    ],
    preparation: "Couper les fruits en morceaux.",
    cuisson: "Aucune cuisson."
  }
];

const container = document.getElementById("recettes");

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