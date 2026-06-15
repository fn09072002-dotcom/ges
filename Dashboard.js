// import { Sidebar } from "../../components/Sidebar.js";
// import { Topbar } from "../../components/Topbar.js";

// export function DashboardPage() {
//     const user      = JSON.parse(localStorage.getItem("user"))        || {};
//     const membres   = JSON.parse(localStorage.getItem("membres"))     || [];
//     const cotis     = JSON.parse(localStorage.getItem("cotisations")) || [];
//     const finances  = JSON.parse(localStorage.getItem("finances"))    || { totalCotisations: 0, totalDepenses: 0, solde: 0, entrees: 0 };
//     const activites = JSON.parse(localStorage.getItem("activites"))   || [];
//     const params    = JSON.parse(localStorage.getItem("parametres"))  || {};

//     const devise = params.devise || "FCFA";
//     const heure = new Date().getHours();
//     const salutation = heure < 12 ? "Bonjour" : heure < 18 ? "Bon après-midi" : "Bonsoir";
//     const prenom = user.nom || (user.email ? user.email.split("@")[0] : "Admin");

//     // Dernières cotisations (7 premières)
//     const derniersCotis = cotis.slice(0, 7).map(c => `
//         <tr>
//             <td>${c.nom}</td>
//             <td>${(c.montant || 0).toLocaleString()}</td>
//             <td><span class="badge ${c.statut === 'payé' ? 'badge-success' : 'badge-danger'}">${c.statut}</span></td>
//         </tr>`).join("") || `<tr><td colspan="3" style="text-align:center;padding:1rem;color:var(--text-muted)">Aucune cotisation</td></tr>`;

//     // Activités récentes
//     const activitesList = activites.map(a => `
//         <div class="activity-item">
//             <div class="activity-dot"></div>
//             <span class="activity-text">${a.nom}</span>
//             <span class="activity-count">${a.ventes} ventes</span>
//         </div>`).join("") || `<p style="color:var(--text-muted);font-size:0.8rem">Aucune activité</p>`;

//     // Membres récents (3 derniers)
//     const membresRecents = membres.slice(-3).reverse().map(m => {
//         const init = (m.nom || "??").substring(0, 2).toUpperCase();
//         return `
//         <div class="member-row">
//             <div class="member-avatar">${init}</div>
//             <span class="member-name">${m.nom}</span>
//             <span class="member-phone">${m.telephone || "—"}</span>
//         </div>`;
//     }).join("") || `<p style="color:var(--text-muted);font-size:0.8rem">Aucun membre</p>`;

//     // Donut SVG — proportions dynamiques
//     const total = finances.entrees || 1;
//     const pctEntrees = Math.round((finances.totalCotisations / total) * 239);
//     const pctDepenses = 239 - pctEntrees;

//     return `
//     <div class="dashboard-layout">
//         ${Sidebar("dashboard")}
//         <div class="main-content">
//             ${Topbar(user)}
//             <div class="page-body">

//                 <div class="page-header">
//                     <h1>${salutation}, ${prenom} 👋</h1>
//                     <p>Voici un aperçu de votre groupement aujourd'hui</p>
//                 </div>

//                 <div class="stats-grid">
//                     <div class="stat-card">
//                         <div class="stat-card-icon green">👥</div>
//                         <div class="stat-card-label">Membres</div>
//                         <div class="stat-card-value green">${membres.length}</div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon pink">💰</div>
//                         <div class="stat-card-label">Total cotisations</div>
//                         <div class="stat-card-value">${(finances.totalCotisations || 0).toLocaleString()} <small style="font-size:0.85rem;font-weight:500;color:var(--text-muted)">${devise}</small></div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon amber">📉</div>
//                         <div class="stat-card-label">Dépenses</div>
//                         <div class="stat-card-value amber">${(finances.totalDepenses || 0).toLocaleString()} <small style="font-size:0.85rem;font-weight:500;color:var(--text-muted)">${devise}</small></div>
//                     </div>
//                     <div class="stat-card">
//                         <div class="stat-card-icon blue">🏦</div>
//                         <div class="stat-card-label">Solde disponible</div>
//                         <div class="stat-card-value blue">${(finances.solde || 0).toLocaleString()} <small style="font-size:0.85rem;font-weight:500;color:var(--text-muted)">${devise}</small></div>
//                     </div>
//                 </div>

//                 <div class="dashboard-grid">

//                     <div class="quick-action" onclick="window.location.hash='members'">
//                         <div class="quick-action-icon">➕</div>
//                         <p>Ajouter un membre</p>
//                         <span style="font-size:0.75rem;color:var(--text-muted)">Gérer la liste des membres →</span>
//                     </div>

//                     <div class="card">
//                         <div class="card-title">Dernières cotisations</div>
//                         <table class="cotisations-table">
//                             <thead><tr><th>Nom</th><th>Montant</th><th>Statut</th></tr></thead>
//                             <tbody>${derniersCotis}</tbody>
//                         </table>
//                         <div class="see-all">Voir toutes les cotisations →</div>
//                     </div>

//                     <div class="card">
//                         <div class="card-title">Répartition financière</div>
//                         <div class="donut-wrap">
//                             <svg width="100" height="100" viewBox="0 0 100 100">
//                                 <circle cx="50" cy="50" r="38" fill="none" stroke="#E2EDE7" stroke-width="14"/>
//                                 <circle cx="50" cy="50" r="38" fill="none" stroke="#01512C" stroke-width="14"
//                                     stroke-dasharray="${pctEntrees} ${239 - pctEntrees}" stroke-dashoffset="60" stroke-linecap="round"/>
//                                 <circle cx="50" cy="50" r="38" fill="none" stroke="#E0527A" stroke-width="14"
//                                     stroke-dasharray="${pctDepenses} ${239 - pctDepenses}" stroke-dashoffset="${60 - pctEntrees}" stroke-linecap="round"/>
//                                 <text x="50" y="46" text-anchor="middle" font-size="9" font-weight="700" fill="#0F1A14">${Math.round((finances.solde || 0) / 1000)}K</text>
//                                 <text x="50" y="58" text-anchor="middle" font-size="7" fill="#9BADA4">${devise}</text>
//                             </svg>
//                             <div class="donut-legend">
//                                 <div class="legend-item">
//                                     <div class="legend-dot" style="background:#01512C"></div>
//                                     <span class="legend-label">Entrées</span>
//                                     <span class="legend-value">${(finances.entrees || 0).toLocaleString()}</span>
//                                 </div>
//                                 <div class="legend-item">
//                                     <div class="legend-dot" style="background:#E0527A"></div>
//                                     <span class="legend-label">Dépenses</span>
//                                     <span class="legend-value">${(finances.totalDepenses || 0).toLocaleString()}</span>
//                                 </div>
//                                 <div class="legend-item">
//                                     <div class="legend-dot" style="background:#1D4ED8"></div>
//                                     <span class="legend-label">Solde</span>
//                                     <span class="legend-value">${(finances.solde || 0).toLocaleString()}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//                 <div class="bottom-grid">
//                     <div class="card">
//                         <div class="card-title">Activités récentes</div>
//                         <div class="activity-list">${activitesList}</div>
//                     </div>
//                     <div class="card">
//                         <div class="card-title" style="color:var(--pink-accent)">Membres récents</div>
//                         ${membresRecents}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     </div>`;
// }

import { Sidebar } from "../../components/Sidebar.js";
import { Topbar }  from "../../components/Topbar.js";

const API = "http://localhost:3000";

export async function DashboardPage() {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [membres, cotis, finances, activites, params] = await Promise.all([
        fetch(`${API}/membres`).then(r => r.json()).catch(() => []),
        fetch(`${API}/cotisations`).then(r => r.json()).catch(() => []),
        fetch(`${API}/finances`).then(r => r.json()).catch(() => ({ totalCotisations: 0, totalDepenses: 0, solde: 0, entrees: 0 })),
        fetch(`${API}/activites`).then(r => r.json()).catch(() => []),
        fetch(`${API}/parametres`).then(r => r.json()).catch(() => ({})),
    ]);

    const devise = params.devise || "FCFA";
    const heure = new Date().getHours();
    const salutation = heure < 12 ? "Bonjour" : heure < 18 ? "Bon après-midi" : "Bonsoir";
    const prenom = user.nom || (user.email ? user.email.split("@")[0] : "Admin");

    const derniersCotis = cotis.slice(0, 7).map(c => `
        <tr>
            <td>${c.nom}</td>
            <td>${(c.montant || 0).toLocaleString()}</td>
            <td><span class="badge ${c.statut === 'payé' ? 'badge-success' : 'badge-danger'}">${c.statut}</span></td>
        </tr>`).join("") || `<tr><td colspan="3" style="text-align:center;padding:1rem;color:var(--text-muted)">Aucune cotisation</td></tr>`;

    const activitesList = activites.map(a => `
        <div class="activity-item">
            <div class="activity-dot"></div>
            <span class="activity-text">${a.nom}</span>
            <span class="activity-count">${a.ventes} ventes</span>
        </div>`).join("") || `<p style="color:var(--text-muted);font-size:0.8rem">Aucune activité</p>`;

    const membresRecents = membres.slice(-3).reverse().map(m => {
        const init = (m.nom || "??").substring(0, 2).toUpperCase();
        return `
        <div class="member-row">
            <div class="member-avatar">${init}</div>
            <span class="member-name">${m.nom}</span>
            <span class="member-phone">${m.telephone || "—"}</span>
        </div>`;
    }).join("") || `<p style="color:var(--text-muted);font-size:0.8rem">Aucun membre</p>`;

    const total = finances.entrees || 1;
    const pctEntrees  = Math.round((finances.totalCotisations / total) * 239);
    const pctDepenses = 239 - pctEntrees;

    return `
    <div class="dashboard-layout">
        ${Sidebar("dashboard")}
        <div class="main-content">
            ${Topbar(user)}
            <div class="page-body">

                <div class="page-header">
                    <h1>${salutation}, ${prenom} 👋</h1>
                    <p>Voici un aperçu de votre groupement aujourd'hui</p>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-card-icon green">👥</div>
                        <div class="stat-card-label">Membres</div>
                        <div class="stat-card-value green">${membres.length}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon pink">💰</div>
                        <div class="stat-card-label">Total cotisations</div>
                        <div class="stat-card-value">${(finances.totalCotisations || 0).toLocaleString()} <small style="font-size:0.85rem;font-weight:500;color:var(--text-muted)">${devise}</small></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon amber">📉</div>
                        <div class="stat-card-label">Dépenses</div>
                        <div class="stat-card-value amber">${(finances.totalDepenses || 0).toLocaleString()} <small style="font-size:0.85rem;font-weight:500;color:var(--text-muted)">${devise}</small></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon blue">🏦</div>
                        <div class="stat-card-label">Solde disponible</div>
                        <div class="stat-card-value blue">${(finances.solde || 0).toLocaleString()} <small style="font-size:0.85rem;font-weight:500;color:var(--text-muted)">${devise}</small></div>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <div class="quick-action" onclick="window.location.hash='members'">
                        <div class="quick-action-icon">➕</div>
                        <p>Ajouter un membre</p>
                        <span style="font-size:0.75rem;color:var(--text-muted)">Gérer la liste des membres →</span>
                    </div>

                    <div class="card">
                        <div class="card-title">Dernières cotisations</div>
                        <table class="cotisations-table">
                            <thead><tr><th>Nom</th><th>Montant</th><th>Statut</th></tr></thead>
                            <tbody>${derniersCotis}</tbody>
                        </table>
                        <div class="see-all">Voir toutes les cotisations →</div>
                    </div>

                    <div class="card">
                        <div class="card-title">Répartition financière</div>
                        <div class="donut-wrap">
                            <svg width="100" height="100" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#E2EDE7" stroke-width="14"/>
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#01512C" stroke-width="14"
                                    stroke-dasharray="${pctEntrees} ${239 - pctEntrees}" stroke-dashoffset="60" stroke-linecap="round"/>
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#E0527A" stroke-width="14"
                                    stroke-dasharray="${pctDepenses} ${239 - pctDepenses}" stroke-dashoffset="${60 - pctEntrees}" stroke-linecap="round"/>
                                <text x="50" y="46" text-anchor="middle" font-size="9" font-weight="700" fill="#0F1A14">${Math.round((finances.solde || 0) / 1000)}K</text>
                                <text x="50" y="58" text-anchor="middle" font-size="7" fill="#9BADA4">${devise}</text>
                            </svg>
                            <div class="donut-legend">
                                <div class="legend-item">
                                    <div class="legend-dot" style="background:#01512C"></div>
                                    <span class="legend-label">Entrées</span>
                                    <span class="legend-value">${(finances.entrees || 0).toLocaleString()}</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot" style="background:#E0527A"></div>
                                    <span class="legend-label">Dépenses</span>
                                    <span class="legend-value">${(finances.totalDepenses || 0).toLocaleString()}</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-dot" style="background:#1D4ED8"></div>
                                    <span class="legend-label">Solde</span>
                                    <span class="legend-value">${(finances.solde || 0).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom-grid">
                    <div class="card">
                        <div class="card-title">Activités récentes</div>
                        <div class="activity-list">${activitesList}</div>
                    </div>
                    <div class="card">
                        <div class="card-title" style="color:var(--pink-accent)">Membres récents</div>
                        ${membresRecents}
                    </div>
                </div>

            </div>
        </div>
    </div>`;
}