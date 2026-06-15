export function ConnexionPage() {
    const params = JSON.parse(localStorage.getItem("parametres")) || {};
    const logo = params.logo || "logo.png";
    const nomCourt = params.nomCourt || "Dalal Ak Diam";
    const nomGroupement = params.nomGroupement || "Groupement féminin de Dakar";

    return `
    <div class="auth-layout">

        <div class="auth-panel">
            <div class="auth-form-wrap">

                <div class="auth-brand">
                    <div class="auth-brand-logo">
                       <img src="./public/FEM.png" alt="${nomCourt}" style="width:70px;height:70px;object-fit:cover;border-radius:50%"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                    <span style="display:none;font-size:2.5rem"><img src="./public/FEM.png"></span>
                </div>
                    <h1>${nomGroupement}</h1>
                    <p class="subtitle">${nomCourt}</p>
                </div>

                <h2 class="auth-title">Bienvenue</h2>
                <p class="auth-desc">Connectez-vous à votre espace membre</p>

                <div id="connexionError" class="error-msg" style="display:none"></div>

                <div class="form-group">
                    <label>Email</label>
                    <input id="emailConnexion" type="email" placeholder="votre@email.com">
                </div>

                <div class="form-group">
                    <label>Mot de passe</label>
                    <input id="passwordConnexion" type="password" placeholder="••••••••"
                        onkeydown="if(event.key==='Enter') connexion()">
                </div>

                <button class="btn-primary" onclick="connexion()">Se connecter</button>

                <div class="divider"></div>

                <p class="auth-link">
                    Pas encore de compte ?
                    <a onclick="window.location.hash='register'">Créer un compte</a>
                </p>

            </div>
        </div>

        <div class="auth-hero">
            <div class="auth-hero-content">
                <div class="auth-hero-logo">
                    <img src="./public/FEM.png" alt="${nomCourt}" style="width:70px;height:70px;object-fit:cover;border-radius:50%"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                    <span style="display:none;font-size:2.5rem"><img src="./public/FEM.png"></span>
                </div>
                <h2>${nomCourt}</h2>
                <p>Plateforme de gestion du ${nomGroupement} — suivi des membres, cotisations et activités.</p>

                <div class="auth-stats" id="heroStats">
                    <div class="auth-stat"><strong>—</strong><span>Membres actifs</span></div>
                    <div class="auth-stat"><strong>—</strong><span>FCFA en caisse</span></div>
                    <div class="auth-stat"><strong>—</strong><span>Cotisation/mois</span></div>
                    <div class="auth-stat"><strong>3</strong><span>Activités/mois</span></div>
                </div>
            </div>
        </div>

    </div>

    <script>
    (function() {
        const membres = JSON.parse(localStorage.getItem("membres")) || [];
        const finances = JSON.parse(localStorage.getItem("finances")) || {};
        const params = JSON.parse(localStorage.getItem("parametres")) || {};
        const stats = document.getElementById("heroStats");
        if (stats) {
            stats.innerHTML =
                '<div class="auth-stat"><strong>' + membres.length + '</strong><span>Membres actifs</span></div>' +
                '<div class="auth-stat"><strong>' + ((finances.solde || 0)/1000).toFixed(0) + 'K</strong><span>FCFA en caisse</span></div>' +
                '<div class="auth-stat"><strong>' + ((params.montantCotisationMensuelle || 5000)/1000).toFixed(0) + 'K</strong><span>Cotisation/mois</span></div>' +
                '<div class="auth-stat"><strong>' + (JSON.parse(localStorage.getItem("activites")) || []).length + '</strong><span>Activités</span></div>';
        }
    })();
    <\/script>`;
}
