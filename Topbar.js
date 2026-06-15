export function Topbar(user) {
    const prenom = user.nom || (user.email ? user.email.split("@")[0] : "Admin");
    const initials = prenom.substring(0, 2).toUpperCase();
    const photo = user.photo || null;

    const avatarContent = photo
        ? `<img src="${photo}" alt="${prenom}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">${initials}`
        : initials;

    return `
    <div class="topbar">
        <div class="topbar-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Rechercher…">
        </div>
        <div class="topbar-user">
            <div class="topbar-avatar">${avatarContent}</div>
            <div class="topbar-user-info">
                <strong>${prenom}</strong>
                <span>Administratrice</span>
            </div>
        </div>
    </div>`;
}
