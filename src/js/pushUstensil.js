// Fonction pour récuperer la liste des ustensils avec un tableau en entrée
function pushUstensil(array) {
  array.forEach((element) => {
    element.ustensils.forEach((ustensil) => {
      if (!ustensilsTotal.includes(ustensil.toLowerCase())) {
        ustensilsTotal.push(ustensil.toLowerCase());
      }
    });
  });
  console.log(ustensilsTotal);
  return ustensilsTotal;
}
