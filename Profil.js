import { Sidebar } from "../../components/Sidebar.js";
import { Topbar }  from "../../components/Topbar.js";

export function ProfilPage() {
    const user   = JSON.parse(localStorage.getItem("user"))       || {};
    const params = JSON.parse(localStorage.getItem("parametres")) || {};
    const logo   = params.logo || "logo.png";
    const photo  = user.photo  || null;

    const prenom   = user.nom   || (user.email ? user.email.split("@")[0] : "Administratrice");
    const initials = prenom.substring(0, 2).toUpperCase();

    return `
    <div class="dashboard-layout">
        ${Sidebar("profil")}
        <div class="main-content">
            ${Topbar(user)}
            <div class="page-body">

                <div class="page-header">
                    <h1>Mon profil</h1>
                    <p>Informations du compte et paramètres du groupement</p>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem">

                    <!-- Profil utilisateur -->
                    <div class="card">
                        <div class="card-title">Informations personnelles</div>

                        <div style="display:flex;align-items:center;gap:1.25rem;margin-bottom:1.5rem;padding-bottom:1.25rem;border-bottom:1px solid var(--border)">
                            <div style="width:72px;height:72px;border-radius:50%;background:var(--pink-light);border:3px solid var(--green-border);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0">
                                ${photo
                                    ? `<img src="${photo}" alt="${prenom}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                                       <span style="display:none;font-weight:700;font-size:1.2rem;color:var(--pink-accent)">${initials}</span>`
                                    : `<span style="font-weight:700;font-size:1.2rem;color:var(--pink-accent)">${initials}</span>`
                                }
                            </div>
                            <div>
                                <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary)">${prenom}</div>
                                <div style="font-size:0.8rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em">${user.role || "Administratrice"}</div>
                                <div style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px">${user.email || "—"}</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Nom complet</label>
                            <input type="text" id="profilNom" value="${prenom}" placeholder="Votre nom">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="profilEmail" value="${user.email || ""}" placeholder="votre@email.com">
                        </div>
                        <div class="form-group">
                            <label>Nouveau mot de passe</label>
                            <input type="password" id="profilPassword" placeholder="Laisser vide pour ne pas changer">
                        </div>
                        <button class="btn-primary" onclick="sauvegarderProfil()" style="margin-top:0.5rem">Sauvegarder</button>
                    </div>

                    <!-- Paramètres groupement -->
                    <div class="card">
                        <div class="card-title">Paramètres du groupement</div>

                        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;padding-bottom:1.25rem;border-bottom:1px solid var(--border)">
                            <div style="width:64px;height:64px;border-radius:12px;background:var(--green-light);border:2px solid var(--green-border);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0">
                                <img src="${logo}" alt="Logo" style="width:100%;height:100%;object-fit:cover"
                                    onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                                <span style="display:none;font-size:1.5rem">🌿</span>
                            </div>
                            <div>
                                <div style="font-size:1rem;font-weight:600;color:var(--text-primary)">${params.nomGroupement || "—"}</div>
                                <div style="font-size:0.8125rem;color:var(--text-muted)">${params.nomCourt || "—"}</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Nom du groupement</label>
                            <input type="text" id="paramNom" value="${params.nomGroupement || ""}">
                        </div>
                        <div class="form-group">
                            <label>Nom court</label>
                            <input type="text" id="paramNomCourt" value="${params.nomCourt || ""}">
                        </div>
                        <div class="form-group">
                            <label>Cotisation mensuelle (${params.devise || "FCFA"})</label>
                            <input type="number" id="paramCotisation" value="${params.montantCotisationMensuelle || 5000}">
                        </div>
                        <div class="form-group">
                            <label>Devise</label>
                            <input type="text" id="paramDevise" value="${params.devise || "FCFA"}">
                        </div>
                        <button class="btn-primary" onclick="sauvegarderParametres()" style="margin-top:0.5rem">Sauvegarder</button>
                    </div>

                </div>

            </div>
        </div>
    </div>`;
}
