import { useAuth } from "@/_core/hooks/useAuth";
import { CustomCursor } from "@/components/CustomCursor";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  createPortfolioItem,
  deletePortfolioItem,
  getSiteSettings,
  listAdminPortfolioItems,
  reorderPortfolioItems,
  type PortfolioInput,
  type PortfolioItem,
  updateAboutSettings,
  updateHeroSettings,
  updatePortfolioItem,
  uploadAboutImage,
  uploadHeroImage,
  uploadPortfolioImage,
} from "@/lib/portfolio";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ExternalLink,
  FilePlus2,
  Globe2,
  ImageUp,
  LoaderCircle,
  Pencil,
  Trash2,
  Workflow,
} from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

type PortfolioKind = "website" | "ai_system";
type PortfolioStatus = "draft" | "published";

type ManagedItem = PortfolioItem;

type PortfolioForm = {
  id?: number;
  kind: PortfolioKind;
  title: string;
  label: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageKey: string;
  publicUrl: string;
  detailsText: string;
  trigger: string;
  aiProcess: string;
  output: string;
  approvalRequired: boolean;
  status: PortfolioStatus;
  sortOrder: number;
};

const emptyForm = (kind: PortfolioKind, sortOrder = 1): PortfolioForm => ({
  kind,
  title: "",
  label: kind === "website" ? "LIVE WEBSITE" : "AI SYSTEM",
  description: "",
  imageUrl: "",
  imageAlt: "",
  imageKey: "",
  publicUrl: "",
  detailsText: "",
  trigger: "",
  aiProcess: "",
  output: "",
  approvalRequired: kind === "ai_system",
  status: "draft",
  sortOrder,
});

function FieldLabel({ children, optional }: { children: string; optional?: boolean }) {
  return (
    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
      {children}{optional ? <span className="ml-1 text-[#555]">optional</span> : null}
    </label>
  );
}

function AdminPortfolioContent() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [activeKind, setActiveKind] = useState<PortfolioKind>("website");
  const [form, setForm] = useState<PortfolioForm>(() => emptyForm("website"));
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);
  const canManage = isAuthenticated && user?.role === "admin";
  const { data, isLoading } = useQuery({ queryKey: ["portfolio", "admin"], queryFn: listAdminPortfolioItems, enabled: canManage });
  const { data: siteSettings } = useQuery({ queryKey: ["site-settings"], queryFn: getSiteSettings, enabled: canManage });
  const items = (data ?? []) as ManagedItem[];
  const activeItems = useMemo(
    () => items.filter(item => item.kind === activeKind).sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [activeKind, items],
  );

  const refreshPortfolio = async () => {
    await queryClient.invalidateQueries({ queryKey: ["portfolio"] });
  };
  const refreshSiteSettings = async () => {
    await queryClient.invalidateQueries({ queryKey: ["site-settings"] });
  };
  const createMutation = useMutation({
    mutationFn: createPortfolioItem,
    onSuccess: async () => {
      toast.success("Portfolio item created.");
      await refreshPortfolio();
      setForm(emptyForm(activeKind, activeItems.length + 1));
    },
    onError: error => toast.error(error.message),
  });
  const updateMutation = useMutation({
    mutationFn: updatePortfolioItem,
    onSuccess: async () => {
      toast.success("Portfolio item updated.");
      await refreshPortfolio();
    },
    onError: error => toast.error(error.message),
  });
  const deleteMutation = useMutation({
    mutationFn: deletePortfolioItem,
    onSuccess: async () => {
      toast.success("Portfolio item removed.");
      await refreshPortfolio();
      setForm(emptyForm(activeKind, Math.max(activeItems.length - 1, 1)));
    },
    onError: error => toast.error(error.message),
  });
  const reorderMutation = useMutation({
    mutationFn: reorderPortfolioItems,
    onSuccess: async () => {
      await refreshPortfolio();
    },
    onError: error => toast.error(error.message),
  });
  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadPortfolioImage(file, activeKind),
    onError: error => toast.error(error.message),
  });
  const heroMutation = useMutation({
    mutationFn: updateHeroSettings,
    onSuccess: async () => {
      await refreshSiteSettings();
      toast.success("Hero image updated.");
    },
    onError: error => toast.error(error.message),
  });
  const aboutMutation = useMutation({
    mutationFn: updateAboutSettings,
    onSuccess: async () => {
      await refreshSiteSettings();
      toast.success("About image updated.");
    },
    onError: error => toast.error(error.message),
  });

  const patchForm = (patch: Partial<PortfolioForm>) => setForm(current => ({ ...current, ...patch }));

  const beginNew = (kind = activeKind) => {
    setActiveKind(kind);
    setForm(emptyForm(kind, activeItems.length + 1));
  };

  const beginEdit = (item: ManagedItem) => {
    setActiveKind(item.kind);
    setForm({
      id: item.id,
      kind: item.kind,
      title: item.title,
      label: item.label,
      description: item.description,
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
      imageKey: item.imageKey ?? "",
      publicUrl: item.publicUrl ?? "",
      detailsText: item.details.join("\n"),
      trigger: item.trigger ?? "",
      aiProcess: item.aiProcess ?? "",
      output: item.output ?? "",
      approvalRequired: item.approvalRequired,
      status: item.status,
      sortOrder: item.sortOrder,
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.imageUrl) {
      toast.error("Add a project image before saving.");
      return;
    }
    const input: PortfolioInput = {
      kind: form.kind,
      title: form.title.trim(),
      label: form.label.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      imageAlt: form.imageAlt.trim(),
      imageKey: form.imageKey.trim() || null,
      publicUrl: form.publicUrl.trim() || null,
      details: form.detailsText.split("\n").map(item => item.trim()).filter(Boolean),
      trigger: form.kind === "ai_system" ? form.trigger.trim() || null : null,
      aiProcess: form.kind === "ai_system" ? form.aiProcess.trim() || null : null,
      output: form.kind === "ai_system" ? form.output.trim() || null : null,
      approvalRequired: form.kind === "ai_system" ? form.approvalRequired : false,
      status: form.status,
      sortOrder: form.sortOrder,
    };
    if (form.id) updateMutation.mutate({ id: form.id, ...input });
    else createMutation.mutate(input);
  };

  const changeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Use a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image files must be 5 MB or smaller.");
      return;
    }
    setIsUploading(true);
    try {
      const result = await uploadMutation.mutateAsync(file);
      patchForm({ imageUrl: result.url, imageKey: result.key, imageAlt: form.imageAlt || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ") });
      toast.success("Image uploaded and ready to save.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const changeHeroImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error("Use a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Hero image files must be 5 MB or smaller.");
      return;
    }
    setIsUploadingHero(true);
    try {
      const uploaded = await uploadHeroImage(file);
      await heroMutation.mutateAsync({
        imageUrl: uploaded.url,
        imageKey: uploaded.key,
        imageAlt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " "),
        previousKey: siteSettings?.heroImageKey,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The hero image upload failed.");
    } finally {
      setIsUploadingHero(false);
    }
  };

  const removeHeroImage = async () => {
    if (!siteSettings?.heroImageUrl) return;
    if (!window.confirm("Remove the managed hero image and return to the built-in fallback portrait?")) return;
    await heroMutation.mutateAsync({ imageUrl: null, imageKey: null, imageAlt: null, previousKey: siteSettings.heroImageKey });
  };

  const changeAboutImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error("Use a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("About image files must be 5 MB or smaller.");
      return;
    }
    setIsUploadingAbout(true);
    try {
      const uploaded = await uploadAboutImage(file);
      await aboutMutation.mutateAsync({
        imageUrl: uploaded.url,
        imageKey: uploaded.key,
        imageAlt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " "),
        previousKey: siteSettings?.aboutImageKey,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The about image upload failed.");
    } finally {
      setIsUploadingAbout(false);
    }
  };

  const removeAboutImage = async () => {
    if (!siteSettings?.aboutImageUrl) return;
    if (!window.confirm("Remove the managed About image and return to the built-in fallback portrait?")) return;
    await aboutMutation.mutateAsync({ imageUrl: null, imageKey: null, imageAlt: null, previousKey: siteSettings.aboutImageKey });
  };

  const move = (id: number, direction: -1 | 1) => {
    const index = activeItems.findIndex(item => item.id === id);
    const swapIndex = index + direction;
    if (index < 0 || swapIndex < 0 || swapIndex >= activeItems.length) return;
    const reordered = [...activeItems];
    [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];
    reorderMutation.mutate(reordered.map((item, sortOrder) => ({ id: item.id, sortOrder: sortOrder + 1 })));
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="mx-auto max-w-[1500px] pb-12 text-[#f0ece6]">
      <header className="mb-7 flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#a8ff3e]">Owner console</p>
          <h1 className="text-5xl sm:text-6xl">Portfolio <em className="text-[#a8ff3e]">control.</em></h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9e9e9e]">Manage the public Websites and AI Systems sections. Save items as drafts until they are ready to appear on your portfolio.</p>
        </div>
        <a href="/" className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.16em] text-[#bdbdbd] transition-colors hover:text-[#a8ff3e] lg:self-auto"><Globe2 className="h-4 w-4" /> View public portfolio</a>
      </header>

      <section className="mb-6 grid gap-4 border border-white/10 bg-[#111] p-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="overflow-hidden bg-black/30">{siteSettings?.heroImageUrl ? <img src={siteSettings.heroImageUrl} alt={siteSettings.heroImageAlt || "Current hero preview"} className="aspect-[16/10] h-full w-full object-cover" /> : <div className="grid aspect-[16/10] place-items-center p-4 text-center text-xs text-[#777]">Built-in hero portrait is active.</div>}</div>
        <div className="flex flex-col justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.18em] text-[#a8ff3e]">Hero image</p><h2 className="mt-2 text-2xl">Manage the first impression.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#9e9e9e]">Upload one portrait or hero visual. Replacing it removes the old managed file. Removing it restores the built-in fallback portrait.</p></div><div className="flex flex-wrap gap-3"><label className="inline-flex cursor-pointer items-center gap-2 bg-[#a8ff3e] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#111]"><ImageUp className="h-4 w-4" /> {isUploadingHero ? "Uploading…" : siteSettings?.heroImageUrl ? "Replace hero" : "Upload hero"}<input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={isUploadingHero || heroMutation.isPending} onChange={changeHeroImage} /></label>{siteSettings?.heroImageUrl ? <Button type="button" variant="outline" disabled={heroMutation.isPending} onClick={() => void removeHeroImage()} className="border-white/15 text-[#d9d9d9] hover:bg-white/5 hover:text-white">Remove hero</Button> : null}</div></div>
      </section>

      <section className="mb-6 grid gap-4 border border-white/10 bg-[#111] p-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="overflow-hidden bg-black/30">{siteSettings?.aboutImageUrl ? <img src={siteSettings.aboutImageUrl} alt={siteSettings.aboutImageAlt || "Current About preview"} className="aspect-[16/10] h-full w-full object-cover" /> : <div className="grid aspect-[16/10] place-items-center p-4 text-center text-xs text-[#777]">Built-in About portrait is active.</div>}</div>
        <div className="flex flex-col justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.18em] text-[#a8ff3e]">About image</p><h2 className="mt-2 text-2xl">The portrait beside your bio.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#9e9e9e]">This is the tilting portrait in the About section. Replacing it removes the old managed file. Removing it restores the built-in fallback portrait.</p></div><div className="flex flex-wrap gap-3"><label className="inline-flex cursor-pointer items-center gap-2 bg-[#a8ff3e] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#111]"><ImageUp className="h-4 w-4" /> {isUploadingAbout ? "Uploading…" : siteSettings?.aboutImageUrl ? "Replace About image" : "Upload About image"}<input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={isUploadingAbout || aboutMutation.isPending} onChange={changeAboutImage} /></label>{siteSettings?.aboutImageUrl ? <Button type="button" variant="outline" disabled={aboutMutation.isPending} onClick={() => void removeAboutImage()} className="border-white/15 text-[#d9d9d9] hover:bg-white/5 hover:text-white">Remove About image</Button> : null}</div></div>
      </section>

      <Tabs value={activeKind} onValueChange={value => beginNew(value as PortfolioKind)} className="gap-6">
        <TabsList className="h-auto w-full justify-start rounded-none border-b border-white/10 bg-transparent p-0 sm:w-auto sm:rounded-lg sm:border sm:border-white/10 sm:bg-white/[0.03] sm:p-1">
          <TabsTrigger value="website" className="h-11 rounded-none px-4 text-[#bdbdbd] data-[state=active]:bg-transparent data-[state=active]:text-[#a8ff3e] sm:rounded-md sm:data-[state=active]:bg-[#a8ff3e] sm:data-[state=active]:text-[#111]"><Globe2 className="h-4 w-4" /> Websites</TabsTrigger>
          <TabsTrigger value="ai_system" className="h-11 rounded-none px-4 text-[#bdbdbd] data-[state=active]:bg-transparent data-[state=active]:text-[#a8ff3e] sm:rounded-md sm:data-[state=active]:bg-[#a8ff3e] sm:data-[state=active]:text-[#111]"><Workflow className="h-4 w-4" /> AI Systems</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_470px]">
        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div><p className="text-lg">{activeKind === "website" ? "Website projects" : "AI system patterns"}</p><p className="text-xs text-[#777]">{activeItems.length} managed {activeItems.length === 1 ? "item" : "items"}</p></div>
            <Button onClick={() => beginNew()} className="bg-[#a8ff3e] text-[#101010] hover:bg-[#c0ff6e]"><FilePlus2 className="mr-2 h-4 w-4" /> Add {activeKind === "website" ? "website" : "AI system"}</Button>
          </div>
          {isLoading ? <div className="grid min-h-48 place-items-center border border-white/10 bg-white/[0.025] text-sm text-[#9e9e9e]"><LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Loading content…</div> : null}
          {!isLoading && activeItems.length === 0 ? <div className="border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center text-sm text-[#9e9e9e]">No {activeKind === "website" ? "websites" : "AI systems"} yet. Create your first item using the form.</div> : null}
          <div className="grid gap-4 md:grid-cols-2">
            {activeItems.map((item, index) => (
              <article key={item.id} className="group overflow-hidden border border-white/10 bg-[#111] transition-colors hover:border-[#a8ff3e]/40">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#1c1c1c]"><img src={item.imageUrl} alt={item.imageAlt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" /><div className="absolute left-3 top-3"><Badge className={item.status === "published" ? "border-0 bg-[#a8ff3e] text-[#111]" : "border-0 bg-white/15 text-white"}>{item.status === "published" ? "Published" : "Draft"}</Badge></div></div>
                <div className="p-4"><p className="text-[10px] uppercase tracking-[0.16em] text-[#a8ff3e]">{item.label}</p><h2 className="mt-2 text-2xl leading-tight">{item.title}</h2><p className="mt-3 line-clamp-2 text-xs leading-5 text-[#9e9e9e]">{item.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-3"><span className="text-[10px] uppercase tracking-[0.15em] text-[#666]">Position {index + 1}</span><div className="flex items-center gap-1"><Button type="button" variant="ghost" size="icon" disabled={index === 0 || reorderMutation.isPending} onClick={() => move(item.id, -1)} aria-label="Move item up"><ArrowUp className="h-4 w-4" /></Button><Button type="button" variant="ghost" size="icon" disabled={index === activeItems.length - 1 || reorderMutation.isPending} onClick={() => move(item.id, 1)} aria-label="Move item down"><ArrowDown className="h-4 w-4" /></Button><Button type="button" variant="ghost" size="icon" onClick={() => beginEdit(item)} aria-label="Edit item"><Pencil className="h-4 w-4" /></Button><Button type="button" variant="ghost" size="icon" onClick={() => { if (window.confirm(`Delete ${item.title}? This cannot be undone.`)) deleteMutation.mutate(item); }} aria-label="Delete item"><Trash2 className="h-4 w-4 text-red-300" /></Button></div></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="h-fit border border-white/10 bg-[#111] xl:sticky xl:top-4">
          <form onSubmit={submit} className="p-5 sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-3 border-b border-white/10 pb-5"><div><p className="text-[10px] uppercase tracking-[0.18em] text-[#a8ff3e]">{form.id ? "Edit item" : "New item"}</p><h2 className="mt-2 text-3xl">{form.id ? form.title || "Untitled" : `New ${activeKind === "website" ? "website" : "AI system"}`}</h2></div><Badge className={form.status === "published" ? "border-0 bg-[#a8ff3e] text-[#111]" : "border border-white/15 bg-transparent text-[#bdbdbd]"}>{form.status}</Badge></div>
            <div className="space-y-5">
              <div><FieldLabel>Title</FieldLabel><Input required value={form.title} onChange={event => patchForm({ title: event.target.value })} placeholder={activeKind === "website" ? "Project name" : "System name"} className="border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div>
              <div><FieldLabel>Eyebrow label</FieldLabel><Input required value={form.label} onChange={event => patchForm({ label: event.target.value })} placeholder="LIVE WEBSITE · PROJECT NAME" className="border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div>
              <div><FieldLabel>Description</FieldLabel><Textarea required value={form.description} onChange={event => patchForm({ description: event.target.value })} placeholder="A concise, honest project summary." className="min-h-24 border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div>
              <div><FieldLabel>Screenshot or workflow image</FieldLabel><div className="overflow-hidden border border-dashed border-white/20 bg-black/20">{form.imageUrl ? <img src={form.imageUrl} alt="Current item preview" className="aspect-[16/9] w-full object-cover" /> : <div className="grid aspect-[16/9] place-items-center p-5 text-center text-xs text-[#777]">Upload one clear image that represents this item.</div>}<label className="flex cursor-pointer items-center justify-center gap-2 border-t border-white/10 px-4 py-3 text-xs uppercase tracking-[0.13em] text-[#bdbdbd] transition-colors hover:bg-white/5 hover:text-[#a8ff3e]"><ImageUp className="h-4 w-4" /> {isUploading ? "Uploading…" : "Upload image"}<input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={isUploading} onChange={changeImage} /></label></div></div>
              <div><FieldLabel>Image description</FieldLabel><Input required value={form.imageAlt} onChange={event => patchForm({ imageAlt: event.target.value })} placeholder="Describe the image for screen readers" className="border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div>
              <div><FieldLabel optional>Live public URL</FieldLabel><Input type="url" value={form.publicUrl} onChange={event => patchForm({ publicUrl: event.target.value })} placeholder="https://your-live-project.vercel.app" className="border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div>
              <div><FieldLabel optional>{activeKind === "website" ? "Project highlights" : "Short supporting points"}</FieldLabel><Textarea value={form.detailsText} onChange={event => patchForm({ detailsText: event.target.value })} placeholder="One short point per line" className="min-h-20 border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div>
              {activeKind === "ai_system" ? <div className="space-y-5 border-t border-white/10 pt-5"><div><FieldLabel>Trigger</FieldLabel><Textarea value={form.trigger} onChange={event => patchForm({ trigger: event.target.value })} placeholder="What starts this system?" className="min-h-20 border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div><div><FieldLabel>AI process</FieldLabel><Textarea value={form.aiProcess} onChange={event => patchForm({ aiProcess: event.target.value })} placeholder="What does the workflow or agent do?" className="min-h-20 border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div><div><FieldLabel>Output</FieldLabel><Textarea value={form.output} onChange={event => patchForm({ output: event.target.value })} placeholder="What useful result is prepared?" className="min-h-20 border-white/15 bg-black/25 text-white placeholder:text-[#555]" /></div><div className="flex items-center justify-between gap-3 border border-white/10 bg-black/20 p-3"><div><p className="text-sm">Human approval</p><p className="mt-1 text-xs text-[#777]">Show that a person reviews important outcomes.</p></div><Switch checked={form.approvalRequired} onCheckedChange={approvalRequired => patchForm({ approvalRequired })} /></div></div> : null}
              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5"><div><p className="text-sm">Public visibility</p><p className="mt-1 text-xs text-[#777]">Only published items appear on the portfolio.</p></div><Switch checked={form.status === "published"} onCheckedChange={checked => patchForm({ status: checked ? "published" : "draft" })} /></div>
              <div className="grid grid-cols-2 gap-3 pt-2"><Button type="button" variant="outline" onClick={() => beginNew()} className="border-white/15 text-[#d9d9d9] hover:bg-white/5 hover:text-white">Reset</Button><Button type="submit" disabled={isSaving || isUploading} className="bg-[#a8ff3e] text-[#111] hover:bg-[#c0ff6e]">{isSaving ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}{form.id ? "Save changes" : "Create item"}</Button></div>
              {form.publicUrl ? <a href={form.publicUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.14em] text-[#9e9e9e] transition-colors hover:text-[#a8ff3e]"><ExternalLink className="h-3.5 w-3.5" /> Open public URL</a> : null}
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default function AdminPortfolio() {
  return (
    <>
      <CustomCursor />
      <DashboardLayout><AdminPortfolioContent /></DashboardLayout>
    </>
  );
}
