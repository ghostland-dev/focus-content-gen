export type Vertical =
  | "Biotech B2B"
  | "Énergie solaire"
  | "AgroTech"
  | "SaaS FinOps"
  | "Cyber Sécurité Industrielle";

export type ContentKind =
  | "Résumé de veille"
  | "Fiche produit"
  | "Email cold"
  | "Post LinkedIn";

function sentenceCase(text: string) {
  const t = text.trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function generateContent(
  vertical: Vertical,
  kind: ContentKind,
  brief: string
): string {
  const cleanBrief = sentenceCase(brief || "");
  const today = new Date().toLocaleDateString("fr-FR");

  const intros: Record<Vertical, string> = {
    "Biotech B2B":
      "Synthèse orientée R&D et partenariats biotech (B2B) pour décideurs.",
    "Énergie solaire":
      "Angle efficacité, ROI et conformité pour acteurs du solaire.",
    AgroTech:
      "Focus sur rendement, durabilité et innovations agritech tangibles.",
    "SaaS FinOps":
      "Approche optimisation coûts cloud, gouvernance et KPI FinOps.",
    "Cyber Sécurité Industrielle":
      "Centré OT, résilience opérationnelle et normes ICS/SCADA.",
  };

  const toneCTA: Record<ContentKind, string> = {
    "Résumé de veille": "A retenir",
    "Fiche produit": "Caractéristiques clés",
    "Email cold": "Proposition de valeur",
    "Post LinkedIn": "Idée forte",
  };

  switch (kind) {
    case "Résumé de veille":
      return `# Veille ${vertical} — ${today}\n\n${intros[vertical]}\n\n— Contexte: ${cleanBrief || "Non précisé"}.\n— 3 insights clés:\n1) Signal faible\n2) Opportunité court terme\n3) Risque à monitorer\n\n${toneCTA[kind]}: Prioriser une expérimentation en 2 semaines.`;

    case "Fiche produit":
      return `# Fiche produit (${vertical})\n\nUsage: ${cleanBrief || "—"}\n\n${toneCTA[kind]}:\n- Bénéfice 1 orienté métier\n- Bénéfice 2 mesurable (KPI)\n- Différenciant vs concurrence\n\nSpécifications:\n• Déploiement: 24-72h\n• Intégrations: API/No-code\n• Sécurité: Conforme aux standards`;

    case "Email cold":
      return `Objet: ${vertical} — ${cleanBrief || "Optimisation"} en 15 jours\n\nBonjour,\n\nNous aidons les équipes ${vertical.toLowerCase()} à ${cleanBrief || "réduire leurs coûts"} sans perturber l’existant.\n\nPreuve: KPI x, cas client y.\n\nDispo pour un échange de 15 min cette semaine ?`;

    case "Post LinkedIn":
      return `🔥 ${vertical}: ${cleanBrief || "insight actionnable"}.\n\n3 points concrets:\n• Apprentissage clé\n• Outil/process à tester\n• Prochain pas mesurable\n\n#${vertical.replace(/\s+/g, "")} #Ops #Growth`;

    default:
      return cleanBrief;
  }
}
