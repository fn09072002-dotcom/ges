// import { Sidebar } from "../../components/Sidebar.js";
// import { Topbar }  from "../../components/Topbar.js";

// export function CotisationsPage() {
//     const user    = JSON.parse(localStorage.getItem("user"))        || {};
//     const cotis   = JSON.parse(localStorage.getItem("cotisations")) || [];
//     const params  = JSON.parse(localStorage.getItem("parametres"))  || {};
//     const devise  = params.devise || "FCFA";

//     const total   = cotis.reduce((s, c) => s + (c.montant || 0), 0);
//     const payes   = cotis.filter(c => c.statut === "payé");
//     const nonPay  = cotis.filter(c => c.statut !== "payé");
//     const totalPaye = payes.reduce((s, c) => s + (c.montant || 0), 0);

//     const rows = cotis.map(c => `
//         <tr>
//             <td><span style="font-weight:500;color:var(--text-primary)">${c.nom}</span></td>
//             <td>${(c.montant || 0).toLocaleString()} ${devise}</td>
//             <td>${c.date || "—"}</td>
//             <td><span class="badge ${c.statut === 'payé' ? 'badge-success' : 'badge-danger'}">${c.statut}</span></td>
//             <td>
//                 <div class="action-btns">
//                     <button class="btn-sm btn-edit"   onclick="toggleCotisation(${c.id})">
//                         ${c.statut === 'payé' ? 'Annuler' : 'Marquer payé'}
//                     </button>
//                     <button class="btn-sm btn-delete" onclick="supprimerCotisation(${c.id})">Supprimer</button>
//                 </div>
//             </td>
//         </tr>`).join("") || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">Aucune cotisation enregistrée</td></tr>`;

//     return `
//     <div class="dashboard-layout">
//         ${Sidebar("cotisations")}
//         <div class="main-content">
//             ${Topbar(user)}
//             <div class="page-body">

//                 <div class="page-header">
//                     <h1>Cotisations</h1>
//                     <p>Suivi des paiements des membres</p>
//                 </div>

//                 <!-- Stats -->
//                 <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
//                     <div class="stat-card">
//                         <div class="stat-card-icon green">💵</div>
//                         <div class="stat-card-label">Total collecté</div>
//                         <div class="stat-card-value green">${totalPaye.toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon blue">✅</div>
//                         <div class="stat-card-label">Paiements reçus</div>
//                         <div class="stat-card-value blue">${payes.length} / ${cotis.length}</div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon pink">⏳</div>
//                         <div class="stat-card-label">En attente</div>
//                         <div class="stat-card-value pink">${nonPay.length} membre${nonPay.length > 1 ? 's' : ''}</div>
//                     </div>
//                 </div>

//                 <!-- Formulaire ajout -->
//                 <div class="card" style="margin-bottom:1.25rem">
//                     <div class="card-title">Enregistrer une cotisation</div>
//                     <div class="members-toolbar">
//                         <select id="cotisMembreId" class="members-toolbar-select">
//                             <option value="">-- Choisir un membre --</option>
//                             ${(JSON.parse(localStorage.getItem("membres")) || []).map(m =>
//                                 `<option value="${m.id}" data-nom="${m.nom}">${m.nom}</option>`
//                             ).join("")}
//                         </select>
//                         <input id="cotisMontant" type="number" placeholder="Montant (${devise})" value="${params.montantCotisationMensuelle || 5000}">
//                         <input id="cotisDate"    type="date"   value="${new Date().toISOString().split('T')[0]}">
//                         <button class="btn-add" onclick="ajouterCotisation()">➕ Ajouter</button>
//                     </div>
//                 </div>

//                 <!-- Tableau -->
//                 <table class="members-table">
//                     <thead>
//                         <tr>
//                             <th>Membre</th>
//                             <th>Montant</th>
//                             <th>Date</th>
//                             <th>Statut</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>${rows}</tbody>
//                 </table>

//             </div>
//         </div>
//     </div>`;
// }

import { Sidebar } from "../../components/Sidebar.js";
import { Topbar }  from "../../components/Topbar.js";

const API = "http://localhost:3000";

export async function CotisationsPage() {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [cotis, membres, params] = await Promise.all([
        fetch(`${API}/cotisations`).then(r => r.json()).catch(() => []),
        fetch(`${API}/membres`).then(r => r.json()).catch(() => []),
        fetch(`${API}/parametres`).then(r => r.json()).catch(() => ({})),
    ]);

    const devise    = params.devise || "FCFA";
    const payes     = cotis.filter(c => c.statut === "payé");
    const nonPay    = cotis.filter(c => c.statut !== "payé");
    const totalPaye = payes.reduce((s, c) => s + (c.montant || 0), 0);

    const rows = cotis.map(c => `
        <tr>
            <td><span style="font-weight:500;color:var(--text-primary)">${c.nom}</span></td>
            <td>${(c.montant || 0).toLocaleString()} ${devise}</td>
            <td>${c.date || "—"}</td>
            <td><span class="badge ${c.statut === 'payé' ? 'badge-success' : 'badge-danger'}">${c.statut}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-sm btn-edit"   onclick="toggleCotisation(${c.id})">${c.statut === 'payé' ? 'Annuler' : 'Marquer payé'}</button>
                    <button class="btn-sm btn-delete" onclick="supprimerCotisation(${c.id})">Supprimer</button>
                </div>
            </td>
        </tr>`).join("") || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">Aucune cotisation enregistrée</td></tr>`;

    const optionsMembres = membres.map(m =>
        `<option value="${m.id}" data-nom="${m.nom}">${m.nom}</option>`
    ).join("");

    return `
    <div class="dashboard-layout">
        ${Sidebar("cotisations")}
        <div class="main-content">
            ${Topbar(user)}
            <div class="page-body">

                <div class="page-header">
                    <h1>Cotisations</h1>
                    <p>Suivi des paiements des membres</p>
                </div>

                <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
                    <div class="stat-card">
                        <div class="stat-card-icon green">💵</div>
                        <div class="stat-card-label">Total collecté</div>
                        <div class="stat-card-value green">${totalPaye.toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon blue">✅</div>
                        <div class="stat-card-label">Paiements reçus</div>
                        <div class="stat-card-value blue">${payes.length} / ${cotis.length}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon pink">⏳</div>
                        <div class="stat-card-label">En attente</div>
                        <div class="stat-card-value pink">${nonPay.length} membre${nonPay.length > 1 ? 's' : ''}</div>
                    </div>
                </div>

                <div class="card" style="margin-bottom:1.25rem">
                    <div class="card-title">Enregistrer une cotisation</div>
                    <div class="members-toolbar">
                        <select id="cotisMembreId" class="members-toolbar-select">
                            <option value="">-- Choisir un membre --</option>
                            ${optionsMembres}
                        </select>
                        <input id="cotisMontant" type="number" placeholder="Montant (${devise})" value="${params.montantCotisationMensuelle || 5000}">
                        <input id="cotisDate"    type="date"   value="${new Date().toISOString().split('T')[0]}">
                        <button class="btn-add" onclick="ajouterCotisation()">➕ Ajouter</button>
                    </div>
                </div>

                <table class="members-table">
                    <thead>
                        <tr>
                            <th>Membre</th>
                            <th>Montant</th>
                            <th>Date</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>

            </div>
        </div>
    </div>`;
}