// import { Sidebar } from "../../components/Sidebar.js";
// import { Topbar } from "../../components/Topbar.js";

// export function MembersPage() {
//     const user    = JSON.parse(localStorage.getItem("user"))    || {};
//     const membres = JSON.parse(localStorage.getItem("membres")) || [];

//     const rows = membres.map(m => {
//         const init = (m.nom || "??").substring(0, 2).toUpperCase();
//         return `
//         <tr>
//             <td>
//                 <div style="display:flex;align-items:center;gap:0.625rem">
//                     <div class="member-avatar">${init}</div>
//                     <span style="font-weight:500;color:var(--text-primary)">${m.nom}</span>
//                 </div>
//             </td>
//             <td>${m.telephone || "—"}</td>
//             <td>${m.dateAdhesion || "—"}</td>
//             <td><span class="badge ${m.statut === 'actif' ? 'badge-success' : 'badge-danger'}">${m.statut || "actif"}</span></td>
//             <td>
//                 <div class="action-btns">
//                     <button class="btn-sm btn-edit">Modifier</button>
//                     <button class="btn-sm btn-delete" onclick="supprimerMembre(${m.id})">Supprimer</button>
//                 </div>
//             </td>
//         </tr>`;
//     }).join("") || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">Aucun membre pour l'instant</td></tr>`;

//     return `
//     <div class="dashboard-layout">
//         ${Sidebar("members")}
//         <div class="main-content">
//             ${Topbar(user)}
//             <div class="page-body">

//                 <div class="page-header">
//                     <h1>Gestion des membres</h1>
//                     <p>${membres.length} membre${membres.length > 1 ? 's' : ''} enregistré${membres.length > 1 ? 's' : ''}</p>
//                 </div>

//                 <div class="card" style="margin-bottom:1.25rem">
//                     <div class="card-title">Ajouter un membre</div>
//                     <div class="members-toolbar">
//                         <input id="nomMembre"       type="text" placeholder="Nom complet">
//                         <input id="telephoneMembre" type="text" placeholder="Téléphone">
//                         <button class="btn-add" onclick="ajouterMembre()">➕ Ajouter</button>
//                     </div>
//                 </div>

//                 <table class="members-table">
//                     <thead>
//                         <tr>
//                             <th>Membre</th>
//                             <th>Téléphone</th>
//                             <th>Date d'adhésion</th>
//                             <th>Statut</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody id="listeMembres">${rows}</tbody>
//                 </table>

//             </div>
//         </div>
//     </div>`;
// }

import { Sidebar } from "../../components/Sidebar.js";
import { Topbar }  from "../../components/Topbar.js";

const API = "http://localhost:3000";

export async function MembersPage() {
    const user    = JSON.parse(localStorage.getItem("user")) || {};
    const membres = await fetch(`${API}/membres`).then(r => r.json()).catch(() => []);

    const rows = membres.map(m => {
        const init = (m.nom || "??").substring(0, 2).toUpperCase();
        return `
        <tr>
            <td>
                <div style="display:flex;align-items:center;gap:0.625rem">
                    <div class="member-avatar">${init}</div>
                    <span style="font-weight:500;color:var(--text-primary)">${m.nom}</span>
                </div>
            </td>
            <td>${m.telephone || "—"}</td>
            <td>${m.dateAdhesion || "—"}</td>
            <td><span class="badge ${m.statut === 'actif' ? 'badge-success' : 'badge-danger'}">${m.statut || "actif"}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-sm btn-edit">Modifier</button>
                    <button class="btn-sm btn-delete" onclick="supprimerMembre(${m.id})">Supprimer</button>
                </div>
            </td>
        </tr>`;
    }).join("") || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">Aucun membre pour l'instant</td></tr>`;

    return `
    <div class="dashboard-layout">
        ${Sidebar("members")}
        <div class="main-content">
            ${Topbar(user)}
            <div class="page-body">
                <div class="page-header">
                    <h1>Gestion des membres</h1>
                    <p>${membres.length} membre${membres.length > 1 ? 's' : ''} enregistré${membres.length > 1 ? 's' : ''}</p>
                </div>
                <div class="card" style="margin-bottom:1.25rem">
                    <div class="card-title">Ajouter un membre</div>
                    <div class="members-toolbar">
                        <input id="nomMembre"       type="text" placeholder="Nom complet">
                        <input id="telephoneMembre" type="text" placeholder="Téléphone">
                        <button class="btn-add" onclick="ajouterMembre()">➕ Ajouter</button>
                    </div>
                </div>
                <table class="members-table">
                    <thead>
                        <tr>
                            <th>Membre</th>
                            <th>Téléphone</th>
                            <th>Date d'adhésion</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="listeMembres">${rows}</tbody>
                </table>
            </div>
        </div>
    </div>`;
}