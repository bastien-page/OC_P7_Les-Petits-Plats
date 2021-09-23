// Fonction pour récuperer la liste des appareils avec un tableau en entrée
function pushAppareil(array) {
  array.forEach((element) => {
    if (!appareilsTotal.includes(element.appliance.toLowerCase())) {
      appareilsTotal.push(element.appliance.toLowerCase());
    }
  });
  console.log(appareilsTotal);
  return appareilsTotal;
}
