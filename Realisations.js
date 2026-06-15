// import { Sidebar } from "../../components/Sidebar.js";
// import { Topbar }  from "../../components/Topbar.js";

// export function RealisationsPage() {
//     const user        = JSON.parse(localStorage.getItem("user"))          || {};
//     const activites   = JSON.parse(localStorage.getItem("activites"))     || [];
//     const params      = JSON.parse(localStorage.getItem("parametres"))    || {};
//     const devise      = params.devise || "FCFA";

//     const totalVentes = activites.reduce((s, a) => s + (a.ventes || 0), 0);

//     const cards = activites.map(a => `
//         <div class="realisation-card">
//             <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem">
//                 <div>
//                     <div style="font-weight:600;font-size:0.9375rem;color:var(--text-primary)">${a.titre || a.nom}</div>
//                     <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">${a.date || "—"}</div>
//                 </div>
//                 <span class="badge badge-success">Réalisée</span>
//             </div>
//             ${a.description ? `<p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:0.75rem">${a.description}</p>` : ""}
//             <div style="display:flex;gap:1rem;padding-top:0.75rem;border-top:1px solid var(--border)">
//                 <div>
//                     <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em">Ventes</div>
//                     <div style="font-size:1.1rem;font-weight:700;color:var(--green-dark)">${(a.ventes || 0).toLocaleString()}</div>
//                 </div>
//                 ${a.recettes ? `<div>
//                     <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em">Recettes</div>
//                     <div style="font-size:1.1rem;font-weight:700;color:var(--green-mid)">${a.recettes.toLocaleString()} ${devise}</div>
//                 </div>` : ""}
//             </div>
//             <div style="margin-top:0.75rem">
//                 <button class="btn-sm btn-delete" onclick="supprimerActivite(${a.id})">Supprimer</button>
//             </div>
//         </div>`).join("") || `<p style="color:var(--text-muted);text-align:center;padding:2rem">Aucune réalisation enregistrée.</p>`;

//     return `
//     <div class="dashboard-layout">
//         ${Sidebar("realisations")}
//         <div class="main-content">
//             ${Topbar(user)}
//             <div class="page-body">

//                 <div class="page-header">
//                     <h1>Réalisations</h1>
//                     <p>Activités et productions du groupement</p>
//                 </div>

//                 <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
//                     <div class="stat-card">
//                         <div class="stat-card-icon green">🏆</div>
//                         <div class="stat-card-label">Activités réalisées</div>
//                         <div class="stat-card-value green">${activites.length}</div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon blue">📦</div>
//                         <div class="stat-card-label">Total ventes</div>
//                         <div class="stat-card-value blue">${totalVentes.toLocaleString()}</div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon amber">⭐</div>
//                         <div class="stat-card-label">Meilleure activité</div>
//                         <div class="stat-card-value amber" style="font-size:1rem">${activites.sort((a,b)=>(b.ventes||0)-(a.ventes||0))[0]?.nom || "—"}</div>
//                     </div>
//                 </div>

//                 <div class="card" style="margin-bottom:1.25rem">
//                     <div class="card-title">Ajouter une réalisation</div>
//                     <div class="members-toolbar" style="flex-wrap:wrap;gap:0.5rem">
//                         <input id="realisationTitre"       type="text"   placeholder="Nom (ex: Thiakry)" style="flex:2;min-width:180px">
//                         <input id="realisationDescription" type="text"   placeholder="Description" style="flex:2;min-width:180px">
//                         <input id="realisationVentes"      type="number" placeholder="Nombre de ventes">
//                         <input id="realisationRecettes"    type="number" placeholder="Recettes (${devise})">
//                         <input id="realisationDate"        type="date"   value="${new Date().toISOString().split('T')[0]}">
//                         <button class="btn-add" onclick="ajouterActivite()">➕ Ajouter</button>
//                     </div>
//                 </div>

//                 <div class="realisations-grid">${cards}</div>

//             </div>
//         </div>
//     </div>`;
// }

import { Sidebar } from "../../components/Sidebar.js";
import { Topbar } from "../../components/Topbar.js";

const API = "http://localhost:3000";

export async function RealisationsPage() {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [activites, params] = await Promise.all([
        fetch(`${API}/activites`).then(r => r.json()).catch(() => []),
        fetch(`${API}/parametres`).then(r => r.json()).catch(() => ({})),
    ]);

    const devise = params.devise || "FCFA";
    const totalVentes = activites.reduce((s, a) => s + (a.ventes || 0), 0);
    const meilleure = [...activites].sort((a, b) => (b.ventes || 0) - (a.ventes || 0))[0]?.nom || "—";

    const cards = activites.map(a => `
        <div class="realisation-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem">
                <div>
                    <div style="font-weight:600;font-size:0.9375rem;color:var(--text-primary)">${a.titre || a.nom}</div>
                    <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">${a.date || "—"}</div>
                </div>
                <span class="badge badge-success">Réalisée</span>
            </div>
            ${a.description ? `<p style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:0.75rem">${a.description}</p>` : ""}
            <div style="display:flex;gap:1rem;padding-top:0.75rem;border-top:1px solid var(--border)">
                <div>
                    <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em">Ventes</div>
                    <div style="font-size:1.1rem;font-weight:700;color:var(--green-dark)">${(a.ventes || 0).toLocaleString()}</div>
                </div>
                ${a.recettes ? `<div>
                    <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em">Recettes</div>
                    <div style="font-size:1.1rem;font-weight:700;color:var(--green-mid)">${a.recettes.toLocaleString()} ${devise}</div>
                </div>` : ""}
            </div>
            <div style="margin-top:0.75rem">
                <button class="btn-sm btn-delete" onclick="supprimerActivite(${a.id})">Supprimer</button>
            </div>
        </div>`).join("") || `<p style="color:var(--text-muted);text-align:center;padding:2rem">Aucune réalisation enregistrée.</p>`;

    return `
    <div class="dashboard-layout">
        ${Sidebar("realisations")}
        <div class="main-content">
            ${Topbar(user)}
            <div class="page-body">

                <div class="page-header">
                    <h1>Réalisations</h1>
                    <p>Activités et productions du groupement</p>
                </div>

                <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
                    <div class="stat-card">
                        <div class="stat-card-icon green">🏆</div>
                        <div class="stat-card-label">Activités réalisées</div>
                        <div class="stat-card-value green">${activites.length}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon blue">📦</div>
                        <div class="stat-card-label">Total ventes</div>
                        <div class="stat-card-value blue">${totalVentes.toLocaleString()}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon amber">⭐</div>
                        <div class="stat-card-label">Meilleure activité</div>
                        <div class="stat-card-value amber" style="font-size:1rem">${meilleure}</div>
                    </div>
                </div>

                <div class="card" style="margin-bottom:1.25rem">
                    <div class="card-title">Ajouter une réalisation</div>
                    <div class="members-toolbar" style="flex-wrap:wrap;gap:0.5rem">
                        <input id="realisationTitre"       type="text"   placeholder="Nom (ex: Thiakry)" style="flex:2;min-width:180px">
                        <input id="realisationDescription" type="text"   placeholder="Description" style="flex:2;min-width:180px">
                        <input id="realisationVentes"      type="number" placeholder="Nombre de ventes">
                        <input id="realisationRecettes"    type="number" placeholder="Recettes (${devise})">
                        <input id="realisationDate"        type="date"   value="${new Date().toISOString().split('T')[0]}">
                        <button class="btn-add" onclick="ajouterActivite()">➕ Ajouter</button>
                    </div>
                </div>

                <div class="realisations-grid">${cards}</div>

            </div>
        </div>
    </div>`;
}