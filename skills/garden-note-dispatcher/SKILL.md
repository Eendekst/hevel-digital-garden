---
name: garden-note-dispatcher
description: Protocole et outil agentique pour Excellence — Génération de prévisualisation, révision humaine et diffusion des dépêches de nouvelles notes du Jardin Numérique aux abonnés Hevel via Resend.
---

# Garden Note Dispatcher — Dépêches du Jardin Numérique

## Rôle & Responsabilité
Ce skill appartient souverainement à **Excellence**, l'Éditeur en Chef du Jardin Numérique Hevel (`BRAND/Garden/`).

Sa mission : Transformer toute nouvelle note majeure polie et publiée (`publish: true`) en une dépêche par courriel chirurgicale, captivante et fidèle à la pensée de Jason Guillauto, transmise aux abonnés du groupe `hevel` (`hevel.ca` et `garden.hevel.ca`).

---

## Déclencheur & Règle d'Or du "Feu Vert"
- **Humain dans la boucle (Human-in-the-Loop) obligatoire.**
- Excellence ne transmet **jamais** de courriel de son propre chef sans afficher le brouillon complet et le sujet dans la conversation Antigravity et recevoir le feu vert explicite de Jason (`"Oui"`, `"Feu vert"`, `"Envoie"`).

---

## Protocole d'Exécution en 4 Étapes

### Étape 1 : Extraction Diagnostique de la Note
1. Identifier la note cible dans `BRAND/Garden/` (ex: `Hevel/The-Great-Filter.md`, `AI/Cognitive-warfare.md`).
2. Extraire les métadonnées YAML :
   - `title` : Titre officiel
   - `description` : Thèse diagnostique (120-160 caractères)
   - `cover` : Image de couverture (si applicable)
   - URL canonique : `https://garden.hevel.ca/<chemin-de-la-note>`
3. Extraire le bloc `> [!KEY TAKEAWAY]` ou les 3 constats majeurs de la note.

### Étape 2 : Rédaction du Template de Dépêche
Rédiger une transmission concise respectant la charte esthétique Hevel Sovereign :
- **Expéditeur :** `Hevel Protocol <system@hevel.ca>`
- **Objet (Subject) :** `[NOUVELLE NOTE // JARDIN] {Titre de la note}`
- **Badge :** `JARDIN NUMÉRIQUE // EXTENDED MIND`
- **Structure HTML :**
```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0A0A0A; color: #E5E5E5; padding: 40px; max-width: 620px; margin: 0 auto; border: 1px solid #262626; border-radius: 12px;">
  <div style="text-align: center; margin-bottom: 28px;">
    <span style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10B981; font-family: monospace; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">NOUVELLE NOTE // JARDIN NUMÉRIQUE</span>
    <h1 style="color: #FFFFFF; font-size: 24px; margin-top: 16px; letter-spacing: -0.5px;">{Titre de la Note}</h1>
  </div>

  <div style="background: #111111; border-left: 3px solid #10B981; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
    <p style="color: #10B981; font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; margin: 0 0 6px 0;">THÈSE DIAGNOSTIQUE :</p>
    <p style="color: #D4D4D4; font-size: 13px; line-height: 1.6; margin: 0;">{description_yaml}</p>
  </div>

  <p style="color: #A3A3A3; font-size: 14px; line-height: 1.7;">
    {synthese_3_paragraphes_des_constats_bruts}
  </p>

  <div style="margin: 32px 0; text-align: center;">
    <a href="{note_url}" style="display: inline-block; background: #10B981; color: #000000; font-family: monospace; font-size: 12px; font-weight: bold; text-decoration: none; padding: 14px 30px; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px;">LIRE LA NOTE INTÉGRALE DANS LE GRAPHE &rarr;</a>
  </div>

  <hr style="border: 0; border-top: 1px solid #262626; margin: 28px 0;" />

  <p style="font-size: 11px; color: #737373; text-align: center; margin: 0;">
    Hevel Protocol &bull; <a href="https://garden.hevel.ca" style="color: #10B981; text-decoration: none;">garden.hevel.ca</a> &bull; Désabonnement instantané en un clic.
  </p>
</div>
```

### Étape 3 : Présentation du Brouillon dans Antigravity
Excellence affiche dans la conversation :
1. Le sujet de la dépêche.
2. Le nombre d'abonnés ciblés (`group = 'hevel'`).
3. Le rendu visuel du texte et le lien direct.
4. La question sacrée : *"Le brouillon de la dépêche est prêt. Donnes-tu le feu vert pour diffusion ?"*

### Étape 4 : Diffusion Sécurisée (Batch Dispatch)
Dès confirmation de Jason :
1. Interroger Supabase :
   ```sql
   SELECT email FROM newsletter_subscribers WHERE "group" = 'hevel';
   ```
2. Diffuser par lots de 100 via l'API Resend en utilisant la clé `RESEND_API_KEY`.
3. Retourner un rapport en 3 points :
   - Nombre de courriels expédiés avec succès.
   - Heure de transmission UTC.
   - Taux d'erreur (objectif : 0 %).
