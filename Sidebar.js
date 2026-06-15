export function Sidebar(activePage) {
    const params = JSON.parse(localStorage.getItem("parametres")) || {};
    const logo = params.logo || "logo.png";
    const nomCourt = params.nomCourt || "Dalal Ak Diam";

    const navItems = [
        { id: "dashboard",    hash: "dashboard",    label: "Tableau de bord", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>` },
        { id: "members",      hash: "members",      label: "Membres",         icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
        { id: "cotisations",  hash: "cotisations",  label: "Cotisations",     icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>` },
        { id: "actions",      hash: "actions",      label: "Actions",         icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>` },
        { id: "caisse",       hash: "caisse",       label: "Caisse",          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>` },
        { id: "realisations", hash: "realisations", label: "Réalisations",    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>` },
        { id: "profil",       hash: "profil",       label: "Profil",          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
    ];

    const navHTML = navItems.map(item => `
        <button class="nav-btn ${activePage === item.id ? 'active' : ''}"
            onclick="window.location.hash='${item.hash}'">
            ${item.icon}
            <span>${item.label}</span>
        </button>`).join("");

    return `
    <aside class="sidebar">
        <div class="sidebar-logo">
            <div class="sidebar-logo-inner">
                <div class="sidebar-logo-icon">
                    <img src="./public/FEM.png" alt="${nomCourt}" style="width:70px;height:70px;object-fit:cover;border-radius:50%"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                    <span style="display:none;font-size:2.5rem"><img src="./public/FEM.png"></span>
                </div>
                <div class="sidebar-logo-text">
                    <strong>${nomCourt}</strong>
                    <span>Groupement féminin</span>
                </div>
            </div>
        </div>
        <nav class="sidebar-nav">
            <div class="sidebar-section-label">Navigation</div>
            ${navHTML}
        </nav>
        <div class="sidebar-footer">
            <button class="logout-btn" onclick="logout()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Déconnexion
            </button>
        </div>
    </aside>`;
}
