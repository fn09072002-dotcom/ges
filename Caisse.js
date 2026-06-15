// import { Sidebar } from "../../components/Sidebar.js";
// import { Topbar }  from "../../components/Topbar.js";

// export function CaissePage() {
//     const user      = JSON.parse(localStorage.getItem("user"))        || {};
//     const finances  = JSON.parse(localStorage.getItem("finances"))    || { totalCotisations: 0, totalDepenses: 0, solde: 0, entrees: 0 };
//     const depenses  = JSON.parse(localStorage.getItem("depenses"))    || [];
//     const params    = JSON.parse(localStorage.getItem("parametres"))  || {};
//     const devise    = params.devise || "FCFA";

//     const rows = depenses.map(d => `
//         <tr>
//             <td><span style="font-weight:500;color:var(--text-primary)">${d.libelle}</span></td>
//             <td style="color:var(--pink-accent);font-weight:600">- ${(d.montant || 0).toLocaleString()} ${devise}</td>
//             <td>${d.date || "—"}</td>
//             <td><span class="badge badge-danger">${d.categorie || "Divers"}</span></td>
//             <td><button class="btn-sm btn-delete" onclick="supprimerDepense(${d.id})">Supprimer</button></td>
//         </tr>`).join("") || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">Aucune dépense enregistrée</td></tr>`;

//     // Barre de progression solde
//     const pct = finances.entrees > 0 ? Math.round((finances.solde / finances.entrees) * 100) : 0;

//     return `
//     <div class="dashboard-layout">
//         ${Sidebar("caisse")}
//         <div class="main-content">
//             ${Topbar(user)}
//             <div class="page-body">

//                 <div class="page-header">
//                     <h1>Caisse</h1>
//                     <p>Suivi des entrées, dépenses et solde du groupement</p>
//                 </div>

//                 <!-- Stats -->
//                 <div class="stats-grid">
//                     <div class="stat-card">
//                         <div class="stat-card-icon green">📈</div>
//                         <div class="stat-card-label">Entrées totales</div>
//                         <div class="stat-card-value green">${(finances.entrees || 0).toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon pink">📉</div>
//                         <div class="stat-card-label">Dépenses totales</div>
//                         <div class="stat-card-value pink">${(finances.totalDepenses || 0).toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon blue">🏦</div>
//                         <div class="stat-card-label">Solde disponible</div>
//                         <div class="stat-card-value blue">${(finances.solde || 0).toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon amber">💰</div>
//                         <div class="stat-card-label">Cotisations reçues</div>
//                         <div class="stat-card-value amber">${(finances.totalCotisations || 0).toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
//                     </div>
//                 </div>

//                 <!-- Barre solde -->
//                 <div class="card" style="margin-bottom:1.25rem">
//                     <div class="card-title">Santé financière</div>
//                     <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem">
//                         <span style="font-size:0.8rem;color:var(--text-muted)">Solde / Entrées</span>
//                         <span style="font-size:0.875rem;font-weight:600;color:var(--green-dark)">${pct}%</span>
//                     </div>
//                     <div style="background:var(--border);border-radius:99px;height:10px;overflow:hidden">
//                         <div style="background:var(--green-dark);width:${pct}%;height:100%;border-radius:99px;transition:width 0.4s"></div>
//                     </div>
//                     <div style="display:flex;justify-content:space-between;margin-top:0.5rem;font-size:0.75rem;color:var(--text-muted)">
//                         <span>0 ${devise}</span>
//                         <span>${(finances.entrees || 0).toLocaleString()} ${devise}</span>
//                     </div>
//                 </div>

//                 <!-- Ajouter dépense -->
//                 <div class="card" style="margin-bottom:1.25rem">
//                     <div class="card-title">Enregistrer une dépense</div>
//                     <div class="members-toolbar">
//                         <input id="depenseLibelle"   type="text"   placeholder="Libellé (ex: Achat matériel)" style="flex:2">
//                         <input id="depenseMontant"   type="number" placeholder="Montant (${devise})">
//                         <input id="depenseDate"      type="date"   value="${new Date().toISOString().split('T')[0]}">
//                         <select id="depenseCategorie" class="members-toolbar-select">
//                             <option value="Fonctionnement">Fonctionnement</option>
//                             <option value="Achat">Achat</option>
//                             <option value="Événement">Événement</option>
//                             <option value="Divers">Divers</option>
//                         </select>
//                         <button class="btn-add" onclick="ajouterDepense()">➕ Ajouter</button>
//                     </div>
//                 </div>

//                 <!-- Tableau dépenses -->
//                 <table class="members-table">
//                     <thead>
//                         <tr>
//                             <th>Libellé</th>
//                             <th>Montant</th>
//                             <th>Date</th>
//                             <th>Catégorie</th>
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

export async function CaissePage() {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [finances, depenses, params] = await Promise.all([
        fetch(`${API}/finances`).then(r => r.json()).catch(() => ({ totalCotisations: 0, totalDepenses: 0, solde: 0, entrees: 0 })),
        fetch(`${API}/depenses`).then(r => r.json()).catch(() => []),
        fetch(`${API}/parametres`).then(r => r.json()).catch(() => ({})),
    ]);

    const devise = params.devise || "FCFA";
    const pct = finances.entrees > 0 ? Math.round((finances.solde / finances.entrees) * 100) : 0;

    const rows = depenses.map(d => `
        <tr>
            <td><span style="font-weight:500;color:var(--text-primary)">${d.libelle}</span></td>
            <td style="color:var(--pink-accent);font-weight:600">- ${(d.montant || 0).toLocaleString()} ${devise}</td>
            <td>${d.date || "—"}</td>
            <td><span class="badge badge-danger">${d.categorie || "Divers"}</span></td>
            <td><button class="btn-sm btn-delete" onclick="supprimerDepense(${d.id})">Supprimer</button></td>
        </tr>`).join("") || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">Aucune dépense enregistrée</td></tr>`;

    return `
    <div class="dashboard-layout">
        ${Sidebar("caisse")}
        <div class="main-content">
            ${Topbar(user)}
            <div class="page-body">

                <div class="page-header">
                    <h1>Caisse</h1>
                    <p>Suivi des entrées, dépenses et solde du groupement</p>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-card-icon green">📈</div>
                        <div class="stat-card-label">Entrées totales</div>
                        <div class="stat-card-value green">${(finances.entrees || 0).toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon pink">📉</div>
                        <div class="stat-card-label">Dépenses totales</div>
                        <div class="stat-card-value pink">${(finances.totalDepenses || 0).toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon blue">🏦</div>
                        <div class="stat-card-label">Solde disponible</div>
                        <div class="stat-card-value blue">${(finances.solde || 0).toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon amber">💰</div>
                        <div class="stat-card-label">Cotisations reçues</div>
                        <div class="stat-card-value amber">${(finances.totalCotisations || 0).toLocaleString()} <small style="font-size:0.8rem;color:var(--text-muted)">${devise}</small></div>
                    </div>
                </div>

                <div class="card" style="margin-bottom:1.25rem">
                    <div class="card-title">Santé financière</div>
                    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem">
                        <span style="font-size:0.8rem;color:var(--text-muted)">Solde / Entrées</span>
                        <span style="font-size:0.875rem;font-weight:600;color:var(--green-dark)">${pct}%</span>
                    </div>
                    <div style="background:var(--border);border-radius:99px;height:10px;overflow:hidden">
                        <div style="background:var(--green-dark);width:${pct}%;height:100%;border-radius:99px;transition:width 0.4s"></div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:0.5rem;font-size:0.75rem;color:var(--text-muted)">
                        <span>0 ${devise}</span>
                        <span>${(finances.entrees || 0).toLocaleString()} ${devise}</span>
                    </div>
                </div>

                <div class="card" style="margin-bottom:1.25rem">
                    <div class="card-title">Enregistrer une dépense</div>
                    <div class="members-toolbar">
                        <input id="depenseLibelle"   type="text"   placeholder="Libellé (ex: Achat matériel)" style="flex:2">
                        <input id="depenseMontant"   type="number" placeholder="Montant (${devise})">
                        <input id="depenseDate"      type="date"   value="${new Date().toISOString().split('T')[0]}">
                        <select id="depenseCategorie" class="members-toolbar-select">
                            <option value="Fonctionnement">Fonctionnement</option>
                            <option value="Achat">Achat</option>
                            <option value="Événement">Événement</option>
                            <option value="Divers">Divers</option>
                        </select>
                        <button class="btn-add" onclick="ajouterDepense()">➕ Ajouter</button>
                    </div>
                </div>

                <table class="members-table">
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Montant</th>
                            <th>Date</th>
                            <th>Catégorie</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>

            </div>
        </div>
    </div>`;
}