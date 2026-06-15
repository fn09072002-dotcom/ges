// import { Sidebar } from "../../components/Sidebar.js";
// import { Topbar }  from "../../components/Topbar.js";

// export function ActionsPage() {
//     const user     = JSON.parse(localStorage.getItem("user"))      || {};
//     const actions  = JSON.parse(localStorage.getItem("actions"))   || [];
//     const params   = JSON.parse(localStorage.getItem("parametres"))|| {};
//     const devise   = params.devise || "FCFA";

//     const enCours    = actions.filter(a => a.statut === "en cours");
//     const terminees  = actions.filter(a => a.statut === "terminée");
//     const planifiees = actions.filter(a => a.statut === "planifiée");

//     const statusColor = { "en cours": "badge-warning", "terminée": "badge-success", "planifiée": "badge-info" };

//     const rows = actions.map(a => `
//         <tr>
//             <td><span style="font-weight:500;color:var(--text-primary)">${a.titre}</span></td>
//             <td style="color:var(--text-secondary)">${a.description || "—"}</td>
//             <td>${a.date || "—"}</td>
//             <td>${(a.budget || 0).toLocaleString()} ${devise}</td>
//             <td><span class="badge ${a.statut === 'terminée' ? 'badge-success' : a.statut === 'en cours' ? 'badge-warning' : 'badge-info'}">${a.statut}</span></td>
//             <td>
//                 <div class="action-btns">
//                     <button class="btn-sm btn-edit"   onclick="changerStatutAction(${a.id})">Avancer</button>
//                     <button class="btn-sm btn-delete" onclick="supprimerAction(${a.id})">Supprimer</button>
//                 </div>
//             </td>
//         </tr>`).join("") || `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted)">Aucune action enregistrée</td></tr>`;

//     return `
//     <div class="dashboard-layout">
//         ${Sidebar("actions")}
//         <div class="main-content">
//             ${Topbar(user)}
//             <div class="page-body">

//                 <div class="page-header">
//                     <h1>Actions du groupement</h1>
//                     <p>Planification et suivi des activités collectives</p>
//                 </div>

//                 <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
//                     <div class="stat-card">
//                         <div class="stat-card-icon amber">⚙️</div>
//                         <div class="stat-card-label">En cours</div>
//                         <div class="stat-card-value amber">${enCours.length}</div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon blue">📅</div>
//                         <div class="stat-card-label">Planifiées</div>
//                         <div class="stat-card-value blue">${planifiees.length}</div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon green">✅</div>
//                         <div class="stat-card-label">Terminées</div>
//                         <div class="stat-card-value green">${terminees.length}</div>
//                     </div>
//                 </div>

//                 <div class="card" style="margin-bottom:1.25rem">
//                     <div class="card-title">Ajouter une action</div>
//                     <div class="members-toolbar" style="flex-wrap:wrap;gap:0.5rem">
//                         <input id="actionTitre"       type="text"   placeholder="Titre de l'action" style="flex:2;min-width:200px">
//                         <input id="actionDescription" type="text"   placeholder="Description" style="flex:2;min-width:200px">
//                         <input id="actionDate"        type="date"   value="${new Date().toISOString().split('T')[0]}">
//                         <input id="actionBudget"      type="number" placeholder="Budget (${devise})">
//                         <select id="actionStatut" class="members-toolbar-select">
//                             <option value="planifiée">Planifiée</option>
//                             <option value="en cours">En cours</option>
//                             <option value="terminée">Terminée</option>
//                         </select>
//                         <button class="btn-add" onclick="ajouterAction()">➕ Ajouter</button>
//                     </div>
//                 </div>

//                 <table class="members-table">
//                     <thead>
//                         <tr>
//                             <th>Titre</th>
//                             <th>Description</th>
//                             <th>Date</th>
//                             <th>Budget</th>
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

export async function ActionsPage() {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [actions, params] = await Promise.all([
        fetch(`${API}/actions`).then(r => r.json()).catch(() => []),
        fetch(`${API}/parametres`).then(r => r.json()).catch(() => ({})),
    ]);

    const devise     = params.devise || "FCFA";
    const enCours    = actions.filter(a => a.statut === "en cours");
    const terminees  = actions.filter(a => a.statut === "terminée");
    const planifiees = actions.filter(a => a.statut === "planifiée");

    const rows = actions.map(a => `
        <tr>
            <td><span style="font-weight:500;color:var(--text-primary)">${a.titre}</span></td>
            <td style="color:var(--text-secondary)">${a.description || "—"}</td>
            <td>${a.date || "—"}</td>
            <td>${(a.budget || 0).toLocaleString()} ${devise}</td>
            <td><span class="badge ${a.statut === 'terminée' ? 'badge-success' : a.statut === 'en cours' ? 'badge-warning' : 'badge-info'}">${a.statut}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-sm btn-edit"   onclick="changerStatutAction(${a.id})">Avancer</button>
                    <button class="btn-sm btn-delete" onclick="supprimerAction(${a.id})">Supprimer</button>
                </div>
            </td>
        </tr>`).join("") || `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted)">Aucune action enregistrée</td></tr>`;

    return `
    <div class="dashboard-layout">
        ${Sidebar("actions")}
        <div class="main-content">
            ${Topbar(user)}
            <div class="page-body">

                <div class="page-header">
                    <h1>Actions du groupement</h1>
                    <p>Planification et suivi des activités collectives</p>
                </div>

                <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
                    <div class="stat-card">
                        <div class="stat-card-icon amber">⚙️</div>
                        <div class="stat-card-label">En cours</div>
                        <div class="stat-card-value amber">${enCours.length}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon blue">📅</div>
                        <div class="stat-card-label">Planifiées</div>
                        <div class="stat-card-value blue">${planifiees.length}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon green">✅</div>
                        <div class="stat-card-label">Terminées</div>
                        <div class="stat-card-value green">${terminees.length}</div>
                    </div>
                </div>

                <div class="card" style="margin-bottom:1.25rem">
                    <div class="card-title">Ajouter une action</div>
                    <div class="members-toolbar" style="flex-wrap:wrap;gap:0.5rem">
                        <input id="actionTitre"       type="text"   placeholder="Titre de l'action" style="flex:2;min-width:200px">
                        <input id="actionDescription" type="text"   placeholder="Description" style="flex:2;min-width:200px">
                        <input id="actionDate"        type="date"   value="${new Date().toISOString().split('T')[0]}">
                        <input id="actionBudget"      type="number" placeholder="Budget (${devise})">
                        <select id="actionStatut" class="members-toolbar-select">
                            <option value="planifiée">Planifiée</option>
                            <option value="en cours">En cours</option>
                            <option value="terminée">Terminée</option>
                        </select>
                        <button class="btn-add" onclick="ajouterAction()">➕ Ajouter</button>
                    </div>
                </div>

                <table class="members-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Budget</th>
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