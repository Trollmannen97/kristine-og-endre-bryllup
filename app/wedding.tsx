"use client";

import { FormEvent, useState } from "react";
import { Check, ChevronDown, Heart, MapPin, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState("yes");

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#0b0b0a] text-[#f4f0e8]">
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden lg:min-h-[900px]">
        <img src="/photos/kristine-endre-portrett.jpg" alt="Kristine og Endre smiler til hverandre ute i naturen" width={1179} height={1457} fetchPriority="high" className="absolute inset-0 -z-20 h-[58%] w-full object-cover object-[center_35%] lg:left-auto lg:h-full lg:w-[58%]" />
        <div className="absolute inset-0 -z-10 hero-shade" />
        <header className="flex items-center justify-between px-6 py-6 sm:px-10">
          <span className="font-serif text-lg tracking-[0.08em]">K &amp; E</span>
          <span className="text-xs uppercase tracking-[0.28em] text-white/70">Vi skal gifte oss</span>
        </header>
        <div className="flex flex-1 flex-col items-center justify-end px-5 pb-12 pt-48 text-center lg:w-[47%] lg:justify-center lg:px-12 lg:py-16">
          <p className="mb-4 text-xs uppercase tracking-[0.42em] text-white/65">En invitasjon til</p>
          <h1 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-normal leading-[0.85] tracking-[-0.055em]">Kristine <span className="block italic">&amp; Endre</span></h1>
          <p className="mt-7 text-sm uppercase tracking-[0.3em] text-white/75">Dato og sted kommer</p>
          <button onClick={() => { setOpened(true); requestAnimationFrame(() => document.getElementById("invitation")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })); }} className="group mt-12 flex flex-col items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Åpne bryllupsinvitasjonen">
            <span className="envelope relative block h-32 w-48 transition-transform duration-500 group-hover:-translate-y-2 sm:h-36 sm:w-56">
              <span className="absolute inset-0 border border-white/70 bg-[#d8d2c7]/95 shadow-2xl" />
              <span className="envelope-fold absolute inset-0" />
              <span className="absolute left-1/2 top-[49%] z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#171714] text-[#eee8dc] shadow-lg"><Heart className="size-4" strokeWidth={1.5} /></span>
            </span>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-white/80">Trykk for å åpne <ChevronDown className="size-4 animate-bounce" /></span>
          </button>
        </div>
      </section>

      <section className="bg-[#f2eee6] px-6 py-16 text-[#161613] sm:px-10 sm:py-24" aria-labelledby="moments-title">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/55">Livet sammen</p>
              <h2 id="moments-title" className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Små øyeblikk. Stor kjærlighet.</h2>
            </div>
            <p className="max-w-xs font-serif text-lg leading-relaxed text-black/65">Fra turer ved havet til dager vi aldri vil glemme. Nå gleder vi oss til å feire med dere.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-7">
            <figure className="col-span-2 sm:col-span-1">
              <img src="/photos/kristine-endre-sommer.jpg" alt="Kristine og Endre holder hender på en sommerdag" width={900} height={1200} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-black/55">Hånd i hånd</figcaption>
            </figure>
            <figure className="sm:pt-12">
              <img src="/photos/kristine-endre-strand.jpg" alt="Kristine og Endre holder rundt hverandre på stranden" width={978} height={1200} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-black/55">Ved havet</figcaption>
            </figure>
            <figure>
              <img src="/photos/kristine-endre-tur.jpg" alt="Kristine og Endre smiler sammen på tur ved svabergene" width={967} height={1200} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-black/55">På eventyr sammen</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {opened && (
        <section id="invitation" className="invitation-enter relative bg-[#f2eee6] px-4 py-16 text-[#161613] sm:px-8 sm:py-24">
          <div className="mx-auto max-w-5xl border border-black/20 bg-[#f8f5ee] shadow-[0_30px_80px_rgba(0,0,0,.25)]">
            <Tabs defaultValue="invitation" className="gap-0">
              <TabsList variant="line" className="mx-auto h-auto gap-6 border-b border-black/10 px-5 py-5 sm:gap-12">
                <TabsTrigger value="invitation" className="rounded-none px-0 py-2 text-xs uppercase tracking-[0.19em]">Invitasjonen</TabsTrigger>
                <TabsTrigger value="rsvp" className="rounded-none px-0 py-2 text-xs uppercase tracking-[0.19em]">Svar</TabsTrigger>
                <TabsTrigger value="practical" className="rounded-none px-0 py-2 text-xs uppercase tracking-[0.19em]">Praktisk</TabsTrigger>
              </TabsList>

              <TabsContent value="invitation" className="m-0 grid min-h-[680px] place-items-center px-6 py-16 text-center sm:px-16">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.38em] text-black/55">Sammen med familiene våre</p>
                  <h2 className="mt-10 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.88] tracking-[-0.05em]">Kristine <span className="block italic">&amp; Endre</span></h2>
                  <p className="mx-auto mt-10 max-w-lg font-serif text-xl leading-relaxed text-black/75 sm:text-2xl">inviterer deg til å feire kjærligheten, løftene og begynnelsen på resten av livet sammen med oss.</p>
                  <div className="mx-auto my-12 h-px w-20 bg-black/25" />
                  <p className="text-sm uppercase tracking-[0.3em]">Dato · tidspunkt · sted</p>
                  <p className="mt-3 font-serif text-2xl italic text-black/55">kommer snart</p>
                </div>
              </TabsContent>

              <TabsContent value="rsvp" className="m-0 grid min-h-[680px] place-items-center px-6 py-14 sm:px-16">
                <div className="w-full max-w-xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-black/50">Svar på invitasjonen</p>
                  <h2 className="mt-4 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Kommer du?</h2>
                  {submitted ? (
                    <div className="mt-12 border-y border-black/15 py-14 text-center" role="status">
                      <span className="mx-auto grid size-14 place-items-center rounded-full border border-black/30"><Check /></span>
                      <h3 className="mt-6 font-serif text-3xl">Tusen takk for svaret</h3>
                      <p className="mt-3 text-black/60">Svaret ditt er registrert og vises kun for brudeparet.</p>
                      <button className="mt-6 text-sm underline underline-offset-4" onClick={() => setSubmitted(false)}>Endre svaret</button>
                    </div>
                  ) : (
                    <form onSubmit={submitRsvp} className="mt-10 space-y-7">
                      <Field label="Navn"><Input required name="name" autoComplete="name" className="h-12 rounded-none border-x-0 border-t-0 border-black/30 bg-transparent px-0 text-base shadow-none" placeholder="Fornavn og etternavn" /></Field>
                      <fieldset>
                        <legend className="mb-3 text-sm font-medium">Deltar du i bryllupet?</legend>
                        <RadioGroup value={attendance} onValueChange={setAttendance} className="grid grid-cols-2 gap-3">
                          <label className="flex cursor-pointer items-center gap-3 border border-black/20 p-4"><RadioGroupItem value="yes" /> Ja, jeg kommer</label>
                          <label className="flex cursor-pointer items-center gap-3 border border-black/20 p-4"><RadioGroupItem value="no" /> Jeg kan ikke</label>
                        </RadioGroup>
                      </fieldset>
                      {attendance === "yes" && <Field label="Eventuell ledsager"><Input name="guest" className="h-12 rounded-none border-x-0 border-t-0 border-black/30 bg-transparent px-0 shadow-none" placeholder="Navn på ledsager" /></Field>}
                      <Field label="Matallergier eller hensyn"><Input name="diet" className="h-12 rounded-none border-x-0 border-t-0 border-black/30 bg-transparent px-0 shadow-none" placeholder="Skriv ingen dersom det ikke gjelder deg" /></Field>
                      <Field label="En valgfri beskjed"><Textarea name="message" className="min-h-24 rounded-none border-black/30 bg-transparent shadow-none" placeholder="Noe du vil si til brudeparet?" /></Field>
                      <p className="text-xs leading-relaxed text-black/50">Svaret er privat. Andre gjester kan ikke se hvem som kommer.</p>
                      <Button type="submit" className="h-12 w-full rounded-none bg-[#161613] text-xs uppercase tracking-[0.22em] text-white">Send svar</Button>
                    </form>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="practical" className="m-0 min-h-[680px] px-6 py-14 sm:px-16">
                <div className="mx-auto max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-black/50">Alt du trenger å vite</p>
                  <h2 className="mt-4 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Praktisk informasjon</h2>
                  <p className="mt-5 max-w-xl leading-relaxed text-black/60">Vi oppdaterer denne siden så snart dato og sted er bestemt. Du finner alltid siste informasjon her.</p>
                  <div className="mt-12 grid gap-px bg-black/15 sm:grid-cols-2">
                    <InfoCard icon={<MapPin />} title="Tid og sted" text="Dato, klokkeslett og adresse kommer snart." />
                    <InfoCard icon={<Utensils />} title="Mat og drikke" text="Meld fra om allergier og matbehov i svarskjemaet." />
                    <InfoCard title="Antrekk" text="Kleskode og nyttige tips publiseres når planene er klare." />
                    <InfoCard title="Reise og overnatting" text="Transport, parkering og hotellforslag kommer her." />
                  </div>
                  <div className="mt-10 border-l border-black/30 pl-6"><p className="text-xs uppercase tracking-[0.22em] text-black/50">Spørsmål?</p><p className="mt-2 font-serif text-2xl">Kontaktinformasjon kommer</p></div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium">{label}<span className="mt-2 block">{children}</span></label>;
}

function InfoCard({ icon, title, text }: { icon?: React.ReactNode; title: string; text: string }) {
  return <article className="min-h-48 bg-[#f8f5ee] p-7 sm:p-9">{icon && <span className="mb-8 block text-black/55 [&_svg]:size-5 [&_svg]:stroke-[1.5]">{icon}</span>}<h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 max-w-xs leading-relaxed text-black/55">{text}</p></article>;
}

