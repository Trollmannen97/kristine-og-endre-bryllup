"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";

export default function Access() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/access", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }),
      });
      if (response.ok) { window.location.assign("/"); return; }
      setError(response.status === 401 ? "Feil passord. Prøv igjen." : "Kunne ikke åpne siden. Prøv igjen.");
    } catch { setError("Kunne ikke koble til. Prøv igjen."); }
    setPending(false);
  }

  return (
    <main className="grid min-h-[100svh] place-items-center bg-[#f2eee6] px-6 py-12 text-[#161613]">
      <div className="w-full max-w-md border border-black/20 bg-[#f8f5ee] px-7 py-12 text-center sm:px-12">
        <p className="text-xs uppercase tracking-[0.3em] text-black/55">En invitasjon til</p>
        <h1 className="mt-7 font-serif text-5xl leading-[0.95] tracking-[-0.05em]">Kristine <span className="block italic">&amp; Endre</span></h1>
        <LockKeyhole className="mx-auto mt-8 size-5 text-black/50" strokeWidth={1.5} aria-hidden="true" />
        <p className="mt-4 font-serif text-lg text-black/65">Vi gleder oss til å feire med dere.</p>
        <p className="mt-2 text-sm leading-relaxed text-black/55">Skriv inn passordet fra brudeparet for å åpne invitasjonen.</p>
        <form onSubmit={unlock} className="mt-8 text-left">
          <label htmlFor="password" className="text-sm font-medium">Passord</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required maxLength={128} aria-describedby={error ? "access-error" : undefined} aria-invalid={!!error} className="mt-2 h-12 w-full border border-black/30 bg-transparent px-3 outline-offset-4 focus-visible:outline-2" />
          {error && <p id="access-error" role="alert" className="mt-3 text-sm text-[#8b1d1d]">{error}</p>}
          <button type="submit" disabled={pending} className="mt-5 h-12 w-full bg-[#161613] text-xs uppercase tracking-[0.2em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-60">{pending ? "Åpner …" : "Åpne invitasjonen"}</button>
        </form>
      </div>
    </main>
  );
}
