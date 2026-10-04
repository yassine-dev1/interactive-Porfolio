# Portfolio – règles du projet

## Architecture
- Site statique : index.html, admin.html, config.js, assets/css/, assets/js/. Pas de framework, pas de build, pas de nouvelle dépendance. Ne pas committer package.json ni node_modules.
- Le contenu vient de l'objet INITIAL_DATA dans assets/js/data.js. Ne pas changer son nom, sa structure, ni les IDs et attributs data-i18n (admin.html et la future intégration Firebase en dépendent).
- Ordre de chargement : config.js, puis data.js, i18n.js, rendering.js, ui.js. Ne pas l'inverser.
- Site bilingue FR/EN et thème sombre/clair : tout changement doit fonctionner dans les 2 langues et les 2 thèmes.
- Hors périmètre sauf demande explicite : admin.html et config.js. Ne jamais ajouter de lien public vers admin.html.

## Structure des fichiers
- resumes/ : CV (Resume_Yassine_Eljarjini_FR.pdf, _EN.pdf). certifications/ : PDF des certificats. Ne pas déplacer ni renommer.
- assets/css/ : base.css (tokens, reset), layout.css (structure, grilles, responsive), components.css (cartes, boutons, menus), animations.css (mouvement).
- assets/js/ : data.js, i18n.js, rendering.js, ui.js.
- docs/ : uniquement de la documentation utile et légère.

## Qualité du code
- Pas de !important, sauf dans @media print et @media (prefers-reduced-motion). Régler les conflits par l'ordre des fichiers et la spécificité des sélecteurs.
- Couleurs, espacements, rayons, ombres : uniquement via les variables de base.css. Pas de valeur hexadécimale en dur ailleurs.
- Indentation uniforme (2 espaces), pas de code mort, pas de styles dupliqués, une seule convention de nommage de classes.
- Pas de catch vide : journaliser avec console.warn ou commenter pourquoi l'erreur est ignorée.
- Pas de logique dupliquée : factoriser en fonctions courtes.
- Bibliothèques externes : version figée (jamais "latest").
- Commentaires courts, seulement quand ils expliquent un « pourquoi ».

## Qualité visuelle et accessibilité
- Style sobre et professionnel (profil ingénieur logiciel, recherche de stage PFE au Maroc et en France).
- Animations : uniquement transform et opacity, 150 à 600 ms, désactivées avec prefers-reduced-motion.
- Responsive : 320, 390, 768, 1024, 1280, 1440 et 1920 px, sans scroll horizontal ni élément chevauché ou coupé.
- Contraste WCAG AA, focus clavier visible sur tous les éléments interactifs, HTML sémantique.
- Images : pas plus lourdes que nécessaire (avatar sous 100 Ko).

## Vérification (obligatoire avant chaque commit)
- Servir avec python -m http.server et tester avec Playwright (lancé via npx, hors du dépôt) : captures aux 7 largeurs, FR et EN, sombre et clair.
- Zéro erreur console, zéro fichier introuvable, zéro scroll horizontal.
- Tester au clavier (Tab), le menu CV FR/EN, le téléchargement des 3 certificats, le bouton FR/EN, le thème, et l'émulation prefers-reduced-motion.

## Git
- Travailler sur une branche dédiée, un commit par thème, messages clairs.
- Ne jamais modifier le contenu des textes, sauf demande explicite.