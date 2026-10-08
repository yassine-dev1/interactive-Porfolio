# Portfolio – règles du projet

## Architecture
- Site statique : index.html, admin.html, config.js, assets/css/, assets/js/, assets/images/. Pas de framework, pas de build, pas de nouvelle dépendance. Ne pas committer package.json ni node_modules.
- Le contenu vient de l'objet INITIAL_DATA dans assets/js/data.js. Ne pas changer son nom, sa structure, ni les IDs et attributs data-i18n (admin.html et la future intégration Firebase en dépendent). Modifier des valeurs ou des éléments de tableaux n'est autorisé que sur demande explicite.
- Ordre de chargement : config.js, data.js, i18n.js, rendering.js, ui.js.
- Site bilingue FR/EN et thème sombre/clair : tout changement doit fonctionner dans les 2 langues et les 2 thèmes.
- Hors périmètre sauf demande explicite : admin.html et config.js.
- Le dossier shared/ contient les sources locales d'images : il ne fait pas partie du site. Ne pas le référencer dans le code, ne pas le committer, ne pas modifier ni supprimer les originaux.

## Structure des fichiers
- resumes/ (CV FR et EN), certifications/ (PDF), favicon.svg, favicon-32.png, apple-touch-icon.png : ne pas déplacer ni renommer.
- assets/css/ : base.css (variables, reset), layout.css (structure, grilles, responsive), components.css (cartes, pastilles, boutons, menus), animations.css (mouvement).
- assets/js/ : data.js, i18n.js, rendering.js, ui.js.
- assets/images/projects/ : images optimisées des projets, un fichier par projet, nommé d'après l'id du projet (par exemple pathfinding.webp).

## Images
- Photos et captures du site en WebP, 1200 px de large maximum, 120 Ko maximum par fichier (qualité autour de 80). L'avatar profile.jpg et les favicons ne changent pas de format.
- Sur chaque <img> : width et height explicites (pas de décalage de mise en page), loading="lazy" et decoding="async" (sauf image visible dès l'ouverture de la page), alt descriptif traduit FR/EN.
- Ne jamais committer d'originaux lourds (PNG ou JPG bruts).

## Qualité du code
- Pas de !important, sauf dans @media print et @media (prefers-reduced-motion).
- Couleurs, espacements, rayons, ombres : uniquement via les variables de base.css (ajouter les manquantes en clair ET en sombre).
- Indentation de 2 espaces, pas de code mort, pas de styles dupliqués, une seule convention de nommage de classes.
- Pas de catch vide, pas de logique dupliquée, bibliothèques externes en version figée.

## Qualité visuelle et accessibilité
- Style sobre et professionnel (profil ingénieur logiciel, recherche de stage PFE au Maroc et en France).
- Animations : uniquement transform et opacity, 150 à 600 ms par élément. Effets de survol dans @media (hover: hover).
- Animation de texte mot par mot : jouée une seule fois par chargement de page (jamais rejouée par un rafraîchissement des données), rejouée en version raccourcie au changement de langue, durée totale de 3 s maximum, texte complet lisible par les lecteurs d'écran, affichage immédiat avec prefers-reduced-motion et à l'impression.
- Avec prefers-reduced-motion : aucune animation de mouvement.
- Responsive : 320, 390, 768, 1024, 1280, 1440 et 1920 px, sans scroll horizontal ni élément coupé.
- Contraste WCAG AA, focus clavier visible, HTML sémantique.

## Contact
- Téléphone : lien tel: au format international sans espaces. Drapeau en SVG inline, jamais en emoji (non affichés sous Windows).

## Références de design
- Les captures jointes à une demande sont une inspiration : recréer avec notre propre code et nos variables, sans copier de code, marque ou texte d'un autre site.

## Vérification (obligatoire avant chaque commit)
- Servir avec python -m http.server et tester avec Playwright (lancé via npx, hors du dépôt) : captures aux 7 largeurs, FR et EN, sombre et clair, états de survol compris.
- Zéro erreur console, zéro fichier introuvable, zéro scroll horizontal.
- Tester : menu CV FR/EN, téléchargement des 3 certificats, bouton FR/EN, thème, Tab au clavier, émulation prefers-reduced-motion.

## Git
- Une branche par demande, un commit par thème, messages clairs.
- Ne jamais modifier le contenu des textes hors de ce qui est demandé explicitement.
