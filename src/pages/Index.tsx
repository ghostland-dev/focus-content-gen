import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import heroImg from "@/assets/hero-niche-ai.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useToast } from "@/components/ui/use-toast";
import { generateContent, type ContentKind, type Vertical } from "@/utils/generator";
import { cn } from "@/lib/utils";

const VERTICALS: Vertical[] = [
  "Biotech B2B",
  "Énergie solaire",
  "AgroTech",
  "SaaS FinOps",
  "Cyber Sécurité Industrielle",
];

const KINDS: ContentKind[] = [
  "Résumé de veille",
  "Fiche produit",
  "Email cold",
  "Post LinkedIn",
];

const Index = () => {
  const { toast } = useToast();
  const [vertical, setVertical] = useState<Vertical>(VERTICALS[0]);
  const [kind, setKind] = useState<ContentKind>(KINDS[0]);
  const [brief, setBrief] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const title = "Générateur de contenu IA ultra-niche | Résumés & fiches produits";
  const description =
    "Générez des résumés de veille et fiches produits hyper-ciblés par verticale. Essai gratuit, abonnement 19–49€/mois.";

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Générateur de contenu IA ultra-niche",
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: "19",
        priceCurrency: "EUR",
        description: "Abonnement mensuel de base",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "24",
      },
    }),
    []
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setTimeout(() => {
      const result = generateContent(vertical, kind, brief);
      setOutput(result);
      setLoading(false);
      toast({
        title: "Contenu généré",
        description: "Vous pouvez le copier ou itérer immédiatement.",
      });
    }, 600);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast({ title: "Copié", description: "Le texte est dans votre presse-papiers." });
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <header className="container mx-auto py-6">
        <nav className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="Accueil">
            <div className="h-8 w-8 rounded-md bg-gradient-brand shadow-elevated" />
            <span className="text-sm font-semibold tracking-tight">Ultra‑Niche AI</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="#tarifs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tarifs
            </a>
            <Button variant="outline" size="sm">Se connecter</Button>
            <Button variant="hero" size="sm">Essayer</Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand opacity-20" aria-hidden="true" />
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center py-16">
            <article className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Générateur de contenu IA ultra‑niche
              </h1>
              <p className="text-lg text-muted-foreground max-w-prose">
                Résumés de veille et fiches produits hyper-ciblés par verticale.
                Alignez angle, jargon et KPI pour convaincre vos décideurs.
              </p>
              <div className="flex gap-3">
                <Button variant="hero" size="lg" className="animate-fade-in-up">Démarrer l’essai</Button>
                <Button variant="soft" size="lg">Voir un exemple</Button>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                <li className="glass-panel rounded-md p-3">Verticales pointues</li>
                <li className="glass-panel rounded-md p-3">Ton expert cohérent</li>
                <li className="glass-panel rounded-md p-3">Prêt à publier</li>
              </ul>
            </article>
            <aside className="relative">
              <img
                src={heroImg}
                alt="Illustration IA générant des contenus ultra-niches"
                loading="eager"
                decoding="async"
                className="w-full rounded-xl shadow-elevated animate-float"
              />
            </aside>
          </div>
        </section>

        <section className="container mx-auto py-8">
          <Card className={cn("glass-panel shadow-elevated")}> 
            <CardHeader>
              <CardTitle>Essayez en 30 secondes</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Verticale</label>
                  <Select value={vertical} onValueChange={(v) => setVertical(v as Vertical)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une verticale" />
                    </SelectTrigger>
                    <SelectContent>
                      {VERTICALS.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={kind} onValueChange={(k) => setKind(k as ContentKind)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type de contenu" />
                    </SelectTrigger>
                    <SelectContent>
                      {KINDS.map((k) => (
                        <SelectItem key={k} value={k}>
                          {k}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label className="text-sm font-medium">Objectif / Brief</label>
                  <Input
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Ex: réduction OPEX sur parc solaire 20MW"
                  />
                </div>

                <div className="md:col-span-3 flex items-center gap-3">
                  <Button type="submit" variant="hero" disabled={loading}>
                    {loading ? "Génération…" : "Générer"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setBrief(""); setOutput(""); }}>Réinitialiser</Button>
                </div>
              </form>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sortie</label>
                  <Tabs defaultValue="edit" className="w-full">
                    <TabsList className="mb-2">
                      <TabsTrigger value="edit">Édition</TabsTrigger>
                      <TabsTrigger value="preview">Aperçu</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit" className="space-y-2">
                      <Textarea
                        value={output}
                        onChange={(e) => setOutput(e.target.value)}
                        placeholder="Votre contenu apparaîtra ici…"
                        rows={12}
                      />
                      <div className="flex gap-3">
                        <Button variant="secondary" onClick={handleCopy} disabled={!output}>Copier</Button>
                        <Button variant="outline" onClick={() => setOutput("")}>Effacer</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="prose prose-neutral dark:prose-invert max-w-none glass-panel rounded-md p-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {output || "Rien à prévisualiser pour l’instant."}
                        </ReactMarkdown>
                      </div>
                      <div className="mt-3">
                        <Button variant="secondary" onClick={handleCopy} disabled={!output}>Copier</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle id="tarifs">Tarifs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      <p>Starter: 19€/mois — 200 générations</p>
                      <p>Pro: 49€/mois — 1 000 générations + modèles privés</p>
                      <p className="text-xs">Annulation à tout moment. Essai gratuit 7 jours.</p>
                      <div className="pt-2">
                        <Button variant="hero" className="w-full">Démarrer l’essai</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel">
                    <CardHeader>
                      <CardTitle>Pourquoi ultra‑niche ?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Moins de bruit, plus d’impact. En se concentrant sur une verticale précise, le ton, les KPI et le format collent exactement aux attentes de vos audiences expertes.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="container mx-auto py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ultra‑Niche AI. Tous droits réservés.
      </footer>
    </>
  );
};

export default Index;
