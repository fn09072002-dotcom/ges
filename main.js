// import { router } from "./router.js";

// window.addEventListener("DOMContentLoaded", init);
// window.addEventListener("hashchange", router);

// async function init() {
//     await chargerDB();
//     router();
// }

// /* ══════════════════════════════
//    CHARGEMENT DB.JSON
// ══════════════════════════════ */
// async function chargerDB() {
//     try {
//         const res = await fetch("./public/db.json");
//         if (!res.ok) return;
//         const data = await res.json();
//         // Charger seulement si absent (ne pas écraser les modifs utilisateur)
//         const keys = ["membres","utilisateurs","cotisations","finances","activites","parametres","depenses","actions"];
//         keys.forEach(k => {
//             if (!localStorage.getItem(k) && data[k] !== undefined)
//                 localStorage.setItem(k, JSON.stringify(data[k]));
//         });
//         if (!localStorage.getItem("depenses")) localStorage.setItem("depenses", "[]");
//         if (!localStorage.getItem("actions"))  localStorage.setItem("actions",  "[]");
//     } catch (e) {
//         console.warn("db.json non disponible.");
//     }
// }

// /* ══════════════════════════════
//    AUTHENTIFICATION
// ══════════════════════════════ */
// function connexion() {
//     const email    = document.getElementById("emailConnexion").value.trim();
//     const password = document.getElementById("passwordConnexion").value;
//     if (!email || !password) { showError("connexionError", "Veuillez remplir tous les champs."); return; }
//     const users = JSON.parse(localStorage.getItem("utilisateurs")) || [];
//     const user  = users.find(u => u.email === email && u.password === password);
//     if (!user)  { showError("connexionError", "Email ou mot de passe incorrect."); return; }
//     localStorage.setItem("user", JSON.stringify(user));
//     window.location.hash = "dashboard";
// }

// function inscription() {
//     const nom      = document.getElementById("nomInscription").value.trim();
//     const email    = document.getElementById("emailInscription").value.trim();
//     const password = document.getElementById("passwordInscription").value;
//     const confirm  = document.getElementById("confirmPassword").value;
//     if (!nom || !email || !password || !confirm) { showError("inscriptionError", "Veuillez remplir tous les champs."); return; }
//     if (password !== confirm) { showError("inscriptionError", "Les mots de passe ne correspondent pas."); return; }
//     let users = JSON.parse(localStorage.getItem("utilisateurs")) || [];
//     if (users.find(u => u.email === email)) { showError("inscriptionError", "Cet email est déjà utilisé."); return; }
//     users.push({ id: Date.now(), nom, email, password, role: "membre" });
//     localStorage.setItem("utilisateurs", JSON.stringify(users));
//     alert("Compte créé avec succès !");
//     window.location.hash = "connexion";
// }

// function logout() {
//     localStorage.removeItem("user");
//     window.location.hash = "connexion";
// }

// /* ══════════════════════════════
//    MEMBRES
// ══════════════════════════════ */
// function ajouterMembre() {
//     const nom       = document.getElementById("nomMembre").value.trim();
//     const telephone = document.getElementById("telephoneMembre").value.trim();
//     if (!nom) { alert("Le nom est requis."); return; }
//     let membres = JSON.parse(localStorage.getItem("membres")) || [];
//     membres.push({ id: Date.now(), nom, telephone, statut: "actif", dateAdhesion: today() });
//     localStorage.setItem("membres", JSON.stringify(membres));
//     router();
// }

// function supprimerMembre(id) {
//     if (!confirm("Supprimer ce membre ?")) return;
//     let membres = JSON.parse(localStorage.getItem("membres")) || [];
//     localStorage.setItem("membres", JSON.stringify(membres.filter(m => m.id !== id)));
//     router();
// }

// /* ══════════════════════════════
//    COTISATIONS
// ══════════════════════════════ */
// function ajouterCotisation() {
//     const sel     = document.getElementById("cotisMembreId");
//     const membreId = parseInt(sel.value);
//     const nom     = sel.options[sel.selectedIndex]?.getAttribute("data-nom") || "";
//     const montant = parseFloat(document.getElementById("cotisMontant").value) || 0;
//     const date    = document.getElementById("cotisDate").value;
//     if (!membreId) { alert("Choisissez un membre."); return; }
//     let cotis = JSON.parse(localStorage.getItem("cotisations")) || [];
//     cotis.push({ id: Date.now(), membreId, nom, montant, date, statut: "payé" });
//     localStorage.setItem("cotisations", JSON.stringify(cotis));
//     majFinances();
//     router();
// }

// function toggleCotisation(id) {
//     let cotis = JSON.parse(localStorage.getItem("cotisations")) || [];
//     const c = cotis.find(c => c.id === id);
//     if (c) c.statut = c.statut === "payé" ? "non payé" : "payé";
//     localStorage.setItem("cotisations", JSON.stringify(cotis));
//     majFinances();
//     router();
// }

// function supprimerCotisation(id) {
//     if (!confirm("Supprimer cette cotisation ?")) return;
//     let cotis = JSON.parse(localStorage.getItem("cotisations")) || [];
//     localStorage.setItem("cotisations", JSON.stringify(cotis.filter(c => c.id !== id)));
//     majFinances();
//     router();
// }

// /* ══════════════════════════════
//    CAISSE / DÉPENSES
// ══════════════════════════════ */
// function ajouterDepense() {
//     const libelle   = document.getElementById("depenseLibelle").value.trim();
//     const montant   = parseFloat(document.getElementById("depenseMontant").value) || 0;
//     const date      = document.getElementById("depenseDate").value;
//     const categorie = document.getElementById("depenseCategorie").value;
//     if (!libelle || !montant) { alert("Libellé et montant sont requis."); return; }
//     let depenses = JSON.parse(localStorage.getItem("depenses")) || [];
//     depenses.push({ id: Date.now(), libelle, montant, date, categorie });
//     localStorage.setItem("depenses", JSON.stringify(depenses));
//     majFinances();
//     router();
// }

// function supprimerDepense(id) {
//     if (!confirm("Supprimer cette dépense ?")) return;
//     let depenses = JSON.parse(localStorage.getItem("depenses")) || [];
//     localStorage.setItem("depenses", JSON.stringify(depenses.filter(d => d.id !== id)));
//     majFinances();
//     router();
// }

// /* ══════════════════════════════
//    ACTIONS
// ══════════════════════════════ */
// function ajouterAction() {
//     const titre       = document.getElementById("actionTitre").value.trim();
//     const description = document.getElementById("actionDescription").value.trim();
//     const date        = document.getElementById("actionDate").value;
//     const budget      = parseFloat(document.getElementById("actionBudget").value) || 0;
//     const statut      = document.getElementById("actionStatut").value;
//     if (!titre) { alert("Le titre est requis."); return; }
//     let actions = JSON.parse(localStorage.getItem("actions")) || [];
//     actions.push({ id: Date.now(), titre, description, date, budget, statut });
//     localStorage.setItem("actions", JSON.stringify(actions));
//     router();
// }

// function changerStatutAction(id) {
//     const ordre = ["planifiée", "en cours", "terminée"];
//     let actions = JSON.parse(localStorage.getItem("actions")) || [];
//     const a = actions.find(a => a.id === id);
//     if (a) {
//         const idx = ordre.indexOf(a.statut);
//         a.statut = ordre[Math.min(idx + 1, ordre.length - 1)];
//     }
//     localStorage.setItem("actions", JSON.stringify(actions));
//     router();
// }

// function supprimerAction(id) {
//     if (!confirm("Supprimer cette action ?")) return;
//     let actions = JSON.parse(localStorage.getItem("actions")) || [];
//     localStorage.setItem("actions", JSON.stringify(actions.filter(a => a.id !== id)));
//     router();
// }

// /* ══════════════════════════════
//    RÉALISATIONS / ACTIVITÉS
// ══════════════════════════════ */
// function ajouterActivite() {
//     const titre       = document.getElementById("realisationTitre").value.trim();
//     const description = document.getElementById("realisationDescription").value.trim();
//     const ventes      = parseInt(document.getElementById("realisationVentes").value) || 0;
//     const recettes    = parseFloat(document.getElementById("realisationRecettes").value) || 0;
//     const date        = document.getElementById("realisationDate").value;
//     if (!titre) { alert("Le nom est requis."); return; }
//     let activites = JSON.parse(localStorage.getItem("activites")) || [];
//     activites.push({ id: Date.now(), nom: titre, titre, description, ventes, recettes, date });
//     localStorage.setItem("activites", JSON.stringify(activites));
//     router();
// }

// function supprimerActivite(id) {
//     if (!confirm("Supprimer cette réalisation ?")) return;
//     let activites = JSON.parse(localStorage.getItem("activites")) || [];
//     localStorage.setItem("activites", JSON.stringify(activites.filter(a => a.id !== id)));
//     router();
// }

// /* ══════════════════════════════
//    PROFIL
// ══════════════════════════════ */
// function sauvegarderProfil() {
//     const nom      = document.getElementById("profilNom").value.trim();
//     const email    = document.getElementById("profilEmail").value.trim();
//     const password = document.getElementById("profilPassword").value;
//     let user = JSON.parse(localStorage.getItem("user")) || {};
//     user.nom   = nom;
//     user.email = email;
//     if (password) user.password = password;
//     localStorage.setItem("user", JSON.stringify(user));
//     // Mettre à jour aussi dans utilisateurs
//     let users = JSON.parse(localStorage.getItem("utilisateurs")) || [];
//     const idx = users.findIndex(u => u.id === user.id);
//     if (idx > -1) { users[idx] = { ...users[idx], ...user }; localStorage.setItem("utilisateurs", JSON.stringify(users)); }
//     alert("Profil mis à jour !");
//     router();
// }

// function sauvegarderParametres() {
//     const params = {
//         nomGroupement: document.getElementById("paramNom").value.trim(),
//         nomCourt:      document.getElementById("paramNomCourt").value.trim(),
//         montantCotisationMensuelle: parseFloat(document.getElementById("paramCotisation").value) || 5000,
//         devise:        document.getElementById("paramDevise").value.trim() || "FCFA",
//         logo:          "logo.png"
//     };
//     localStorage.setItem("parametres", JSON.stringify(params));
//     alert("Paramètres sauvegardés !");
//     router();
// }

// /* ══════════════════════════════
//    UTILITAIRES
// ══════════════════════════════ */
// function majFinances() {
//     const cotis    = JSON.parse(localStorage.getItem("cotisations")) || [];
//     const depenses = JSON.parse(localStorage.getItem("depenses"))    || [];
//     const totalCotisations = cotis.filter(c => c.statut === "payé").reduce((s, c) => s + (c.montant || 0), 0);
//     const totalDepenses    = depenses.reduce((s, d) => s + (d.montant || 0), 0);
//     const finances = {
//         entrees: totalCotisations,
//         totalCotisations,
//         totalDepenses,
//         solde: totalCotisations - totalDepenses
//     };
//     localStorage.setItem("finances", JSON.stringify(finances));
// }

// function today() {
//     return new Date().toISOString().split("T")[0];
// }

// function showError(id, msg) {
//     const el = document.getElementById(id);
//     if (el) { el.textContent = msg; el.style.display = "block"; } else alert(msg);
// }

// /* ══════════════════════════════
//    EXPOSE GLOBALS
// ══════════════════════════════ */
// Object.assign(window, {
//     connexion, inscription, logout,
//     ajouterMembre, supprimerMembre,
//     ajouterCotisation, toggleCotisation, supprimerCotisation,
//     ajouterDepense, supprimerDepense,
//     ajouterAction, changerStatutAction, supprimerAction,
//     ajouterActivite, supprimerActivite,
//     sauvegarderProfil, sauvegarderParametres
// });

import { router } from "./router.js";

const API = "http://localhost:3000";

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("hashchange", router);

async function init() {
    router();
}

/* ══════════════════════════════
   UTILITAIRES API
══════════════════════════════ */
async function getAll(resource) {
    const res = await fetch(`${API}/${resource}`);
    return res.json();
}

async function getOne(resource, id) {
    const res = await fetch(`${API}/${resource}/${id}`);
    return res.json();
}

async function post(resource, data) {
    const res = await fetch(`${API}/${resource}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

async function put(resource, id, data) {
    const res = await fetch(`${API}/${resource}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

async function patch(resource, id, data) {
    const res = await fetch(`${API}/${resource}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

async function del(resource, id) {
    await fetch(`${API}/${resource}/${id}`, { method: "DELETE" });
}

/* ══════════════════════════════
   AUTHENTIFICATION
══════════════════════════════ */
async function connexion() {
    const email = document.getElementById("emailConnexion").value.trim();
    const password = document.getElementById("passwordConnexion").value;
    if (!email || !password) { showError("connexionError", "Veuillez remplir tous les champs."); return; }

    const users = await getAll("utilisateurs");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) { showError("connexionError", "Email ou mot de passe incorrect."); return; }

    localStorage.setItem("user", JSON.stringify(user));
    window.location.hash = "dashboard";
}

async function inscription() {
    const nom = document.getElementById("nomInscription").value.trim();
    const email = document.getElementById("emailInscription").value.trim();
    const password = document.getElementById("passwordInscription").value;
    const confirm = document.getElementById("confirmPassword").value;
    if (!nom || !email || !password || !confirm) { showError("inscriptionError", "Veuillez remplir tous les champs."); return; }
    if (password !== confirm) { showError("inscriptionError", "Les mots de passe ne correspondent pas."); return; }

    const users = await getAll("utilisateurs");
    if (users.find(u => u.email === email)) { showError("inscriptionError", "Cet email est déjà utilisé."); return; }

    await post("utilisateurs", { nom, email, password, role: "membre" });
    alert("Compte créé avec succès !");
    window.location.hash = "connexion";
}

function logout() {
    localStorage.removeItem("user");
    window.location.hash = "connexion";
}

/* ══════════════════════════════
   MEMBRES
══════════════════════════════ */
async function ajouterMembre() {
    const nom = document.getElementById("nomMembre").value.trim();
    const telephone = document.getElementById("telephoneMembre").value.trim();
    if (!nom) { alert("Le nom est requis."); return; }

    await post("membres", { nom, telephone, statut: "actif", dateAdhesion: today() });
    router();
}

async function supprimerMembre(id) {
    if (!confirm("Supprimer ce membre ?")) return;
    await del("membres", id);
    router();
}

/* ══════════════════════════════
   COTISATIONS
══════════════════════════════ */
async function ajouterCotisation() {
    const sel = document.getElementById("cotisMembreId");
    const membreId = parseInt(sel.value);
    const nom = sel.options[sel.selectedIndex]?.getAttribute("data-nom") || "";
    const montant = parseFloat(document.getElementById("cotisMontant").value) || 0;
    const date = document.getElementById("cotisDate").value;
    if (!membreId) { alert("Choisissez un membre."); return; }

    await post("cotisations", { membreId, nom, montant, date, statut: "payé" });
    await majFinances();
    router();
}

async function toggleCotisation(id) {
    const cotis = await getAll("cotisations");
    const c = cotis.find(c => c.id === id);
    if (c) {
        await patch("cotisations", id, { statut: c.statut === "payé" ? "non payé" : "payé" });
        await majFinances();
        router();
    }
}

async function supprimerCotisation(id) {
    if (!confirm("Supprimer cette cotisation ?")) return;
    await del("cotisations", id);
    await majFinances();
    router();
}

/* ══════════════════════════════
   CAISSE / DÉPENSES
══════════════════════════════ */
async function ajouterDepense() {
    const libelle = document.getElementById("depenseLibelle").value.trim();
    const montant = parseFloat(document.getElementById("depenseMontant").value) || 0;
    const date = document.getElementById("depenseDate").value;
    const categorie = document.getElementById("depenseCategorie").value;
    if (!libelle || !montant) { alert("Libellé et montant sont requis."); return; }

    await post("depenses", { libelle, montant, date, categorie });
    await majFinances();
    router();
}

async function supprimerDepense(id) {
    if (!confirm("Supprimer cette dépense ?")) return;
    await del("depenses", id);
    await majFinances();
    router();
}

/* ══════════════════════════════
   ACTIONS
══════════════════════════════ */
async function ajouterAction() {
    const titre = document.getElementById("actionTitre").value.trim();
    const description = document.getElementById("actionDescription").value.trim();
    const date = document.getElementById("actionDate").value;
    const budget = parseFloat(document.getElementById("actionBudget").value) || 0;
    const statut = document.getElementById("actionStatut").value;
    if (!titre) { alert("Le titre est requis."); return; }

    await post("actions", { titre, description, date, budget, statut });
    router();
}

async function changerStatutAction(id) {
    const ordre = ["planifiée", "en cours", "terminée"];
    const actions = await getAll("actions");
    const a = actions.find(a => a.id === id);
    if (a) {
        const idx = ordre.indexOf(a.statut);
        await patch("actions", id, { statut: ordre[Math.min(idx + 1, ordre.length - 1)] });
        router();
    }
}

async function supprimerAction(id) {
    if (!confirm("Supprimer cette action ?")) return;
    await del("actions", id);
    router();
}

/* ══════════════════════════════
   RÉALISATIONS / ACTIVITÉS
══════════════════════════════ */
async function ajouterActivite() {
    const titre = document.getElementById("realisationTitre").value.trim();
    const description = document.getElementById("realisationDescription").value.trim();
    const ventes = parseInt(document.getElementById("realisationVentes").value) || 0;
    const recettes = parseFloat(document.getElementById("realisationRecettes").value) || 0;
    const date = document.getElementById("realisationDate").value;
    if (!titre) { alert("Le nom est requis."); return; }

    await post("activites", { nom: titre, titre, description, ventes, recettes, date });
    router();
}

async function supprimerActivite(id) {
    if (!confirm("Supprimer cette réalisation ?")) return;
    await del("activites", id);
    router();
}

/* ══════════════════════════════
   PROFIL
══════════════════════════════ */
async function sauvegarderProfil() {
    const nom = document.getElementById("profilNom").value.trim();
    const email = document.getElementById("profilEmail").value.trim();
    const password = document.getElementById("profilPassword").value;
    let user = JSON.parse(localStorage.getItem("user")) || {};
    user.nom = nom;
    user.email = email;
    if (password) user.password = password;

    await patch("utilisateurs", user.id, user);
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profil mis à jour !");
    router();
}

async function sauvegarderParametres() {
    const params = {
        nomGroupement: document.getElementById("paramNom").value.trim(),
        nomCourt: document.getElementById("paramNomCourt").value.trim(),
        montantCotisationMensuelle: parseFloat(document.getElementById("paramCotisation").value) || 5000,
        devise: document.getElementById("paramDevise").value.trim() || "FCFA",
        logo: "logo.png"
    };
    await put("parametres", 1, params);
    alert("Paramètres sauvegardés !");
    router();
}

/* ══════════════════════════════
   UTILITAIRES
══════════════════════════════ */
async function majFinances() {
    const cotis = await getAll("cotisations");
    const depenses = await getAll("depenses");
    const totalCotisations = cotis.filter(c => c.statut === "payé").reduce((s, c) => s + (c.montant || 0), 0);
    const totalDepenses = depenses.reduce((s, d) => s + (d.montant || 0), 0);
    const finances = {
        entrees: totalCotisations,
        totalCotisations,
        totalDepenses,
        solde: totalCotisations - totalDepenses
    };
    await put("finances", 1, finances);
}

function today() {
    return new Date().toISOString().split("T")[0];
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = "block"; } else alert(msg);
}

/* ══════════════════════════════
   EXPOSE GLOBALS
══════════════════════════════ */
Object.assign(window, {
    connexion, inscription, logout,
    ajouterMembre, supprimerMembre,
    ajouterCotisation, toggleCotisation, supprimerCotisation,
    ajouterDepense, supprimerDepense,
    ajouterAction, changerStatutAction, supprimerAction,
    ajouterActivite, supprimerActivite,
    sauvegarderProfil, sauvegarderParametres,
    getAll, getOne
});
