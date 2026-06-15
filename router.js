// import { DashboardPage }    from "./pages/Dashboard/Dashboard.js";
// import { MembersPage }      from "./pages/Members/Members.js";
// import { ConnexionPage }    from "./pages/Connexion/Connexion.js";
// import { InscriptionPage }  from "./pages/Inscription/Inscription.js";
// import { CotisationsPage }  from "./pages/Cotisations/Cotisations.js";
// import { CaissePage }       from "./pages/Caisse/Caisse.js";
// import { ActionsPage }      from "./pages/Actions/Actions.js";
// import { RealisationsPage } from "./pages/Realisations/Realisations.js";
// import { ProfilPage }       from "./pages/Profil/Profil.js";

// export function router() {
//     const app   = document.getElementById("app");
//     const route = window.location.hash.replace("#", "");
//     const user  = localStorage.getItem("user");

//     // Protection des routes privées
//     const publiques = ["connexion", "register", ""];
//     if (!user && !publiques.includes(route)) {
//         window.location.hash = "connexion";
//         return;
//     }

//     switch (route) {
//         case "dashboard":    app.innerHTML = DashboardPage();    break;
//         case "members":      app.innerHTML = MembersPage();      break;
//         case "cotisations":  app.innerHTML = CotisationsPage();  break;
//         case "caisse":       app.innerHTML = CaissePage();       break;
//         case "actions":      app.innerHTML = ActionsPage();      break;
//         case "realisations": app.innerHTML = RealisationsPage(); break;
//         case "profil":       app.innerHTML = ProfilPage();       break;
//         case "connexion":    app.innerHTML = ConnexionPage();    break;
//         case "register":     app.innerHTML = InscriptionPage();  break;
//         default:             app.innerHTML = ConnexionPage();
//     }
// }
import { DashboardPage }    from "./pages/Dashboard/Dashboard.js";
import { MembersPage }      from "./pages/Members/Members.js";
import { ConnexionPage }    from "./pages/Connexion/Connexion.js";
import { InscriptionPage }  from "./pages/Inscription/Inscription.js";
import { CotisationsPage }  from "./pages/Cotisations/Cotisations.js";
import { CaissePage }       from "./pages/Caisse/Caisse.js";
import { ActionsPage }      from "./pages/Actions/Actions.js";
import { RealisationsPage } from "./pages/Realisations/Realisations.js";
import { ProfilPage }       from "./pages/Profil/Profil.js";

export async function router() {
    const app   = document.getElementById("app");
    const route = window.location.hash.replace("#", "");
    const user  = localStorage.getItem("user");

    // Protection des routes privées
    const publiques = ["connexion", "register", ""];
    if (!user && !publiques.includes(route)) {
        window.location.hash = "connexion";
        return;
    }

    switch (route) {
        case "dashboard":    app.innerHTML = await DashboardPage();    break;
        case "members":      app.innerHTML = await MembersPage();      break;
        case "cotisations":  app.innerHTML = await CotisationsPage();  break;
        case "caisse":       app.innerHTML = await CaissePage();       break;
        case "actions":      app.innerHTML = await ActionsPage();      break;
        case "realisations": app.innerHTML = await RealisationsPage(); break;
        case "profil":       app.innerHTML = await ProfilPage();       break;
        case "connexion":    app.innerHTML = await ConnexionPage();    break;
        case "register":     app.innerHTML = InscriptionPage();        break;
        default:             app.innerHTML = ConnexionPage();
    }
} 

// import { DashboardPage }    from "./pages/Dashboard/Dashboard.js";
// import { MembersPage }      from "./pages/Members/Members.js";
// import { ConnexionPage }    from "./pages/Connexion/Connexion.js";
// import { InscriptionPage }  from "./pages/Inscription/Inscription.js";
// import { CotisationsPage }  from "./pages/Cotisations/Cotisations.js";
// import { CaissePage }       from "./pages/Caisse/Caisse.js";
// import { ActionsPage }      from "./pages/Actions/Actions.js";
// import { RealisationsPage } from "./pages/Realisations/Realisations.js";
// import { ProfilPage }       from "./pages/Profil/Profil.js";

// export async function router() {
//     const app   = document.getElementById("app");
//     const route = window.location.hash.replace("#", "");
//     const user  = localStorage.getItem("user");

//     // Protection des routes privées
//     const publiques = ["connexion", "register", ""];
//     if (!user && !publiques.includes(route)) {
//         window.location.hash = "connexion";
//         return;
//     }

//     switch (route) {
//         case "dashboard":    app.innerHTML = await DashboardPage();   break;
//         case "connexion":    app.innerHTML = await ConnexionPage();   break;
//         case "register":     app.innerHTML = InscriptionPage();       break;

//         // Routes désactivées → redirige vers dashboard
//         case "members":
//         case "cotisations":
//         case "caisse":
//         case "actions":
//         case "realisations":
//         case "profil":
//             app.innerHTML = `
//             <div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:1rem">
//                 <div style="font-size:2.5rem"></div>
//                 <h2 style="color:var(--green-dark)"></h2>
//                 <p style="color:var(--text-muted)"></p>
//                 <button onclick="window.location.hash='dashboard'" 
//                     style="margin-top:1rem;padding:0.7rem 1.5rem;background:var(--green-dark);color:white;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:600">
//                     ← Retour au dashboard
//                 </button>
//             </div>`;
//             break;

//         default: app.innerHTML = await ConnexionPage();
//     }
// }