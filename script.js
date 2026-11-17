function envoyerDemande(){
  let nom = document.getElementById('nomClient').value;
  let tel = document.getElementById('telClient').value;
  let appareil = document.getElementById('appareil').value;
  let probleme = document.getElementById('probleme').value;

  if(nom === "" || probleme === ""){
    document.getElementById('msg').innerText = "⚠️ Remplis ton nom et le problème.";
    return;
  }

  let demandes = JSON.parse(localStorage.getItem('demandes') || '[]');
  demandes.push({nom: nom, tel: tel, appareil: appareil, probleme: probleme, date: new Date().toLocaleString()});
  localStorage.setItem('demandes', JSON.stringify(demandes));

  document.getElementById('msg').innerText = "✅ Demande enregistrée !";
  afficherDemandes();

  let message = "Bonjour Répair Phone, je suis " + nom + ". Appareil: " + appareil + ". Problème: " + probleme;
  window.open("https://wa.me/237641100827?text=" + encodeURIComponent(message), "_blank");

  document.getElementById('nomClient').value = "";
  document.getElementById('telClient').value = "";
  document.getElementById('appareil').value = "";
  document.getElementById('probleme').value = "";
}

function afficherDemandes(){
  let demandes = JSON.parse(localStorage.getItem('demandes') || '[]');
  let zone = document.getElementById('listeDemandes');
  if(demandes.length === 0){
    zone.innerHTML = "Aucune demande pour le moment.";
    return;
  }
  zone.innerHTML = demandes.map(d => "<b>" + d.nom + "</b> - " + d.appareil + " : " + d.probleme + " <br><small>" + d.date + "</small><hr>").join("");
}

function effacerDemandes(){
  localStorage.removeItem('demandes');
  afficherDemandes();
}

afficherDemandes();
