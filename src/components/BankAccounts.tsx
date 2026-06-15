"use client";

import Image from "next/image";
import { Copy, Check, Share2 } from "lucide-react";
import { BankAccount } from "@/config/profile";

// ─── Botón Copiar ─────────────────────────────────────────────────────────────
// Color, ícono y texto cambian via CSS puro (:focus en globals.css).
// JS solo hace el clipboard copy en background.

function CopyBtn({ text, label }: { text: string; label: string }) {
  function handlePointerDown() {
    void (async () => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const el = document.createElement("textarea");
        el.value = text;
        el.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:.01";
        document.body.appendChild(el);
        el.focus();
        el.select();
        try { document.execCommand("copy"); } catch {}
        document.body.removeChild(el);
      }
    })();
  }

  return (
    <button
      type="button"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      aria-label={`Copiar ${label}`}
      className="copy-btn tap-highlight-none flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
    >
      {/* Dos íconos: CSS muestra uno u otro según :focus */}
      <Copy  className="icon-copy  w-3.5 h-3.5 shrink-0" />
      <Check className="icon-check w-3.5 h-3.5 shrink-0" />
      {/* Texto controlado por CSS content */}
      <span className="copy-label" />
    </button>
  );
}

// ─── Botón Compartir ──────────────────────────────────────────────────────────

function ShareBtn({ bank, type, number, cci }: {
  bank: string; type: string; number: string; cci?: string
}) {
  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    const fullText =
      `${bank} — ${type}\nCuenta: ${number}` +
      (cci ? `\nCCI: ${cci}` : "");

    void (async () => {
      if (navigator?.share) {
        try { await navigator.share({ title: bank, text: fullText }); return; } catch {}
      }
      try { await navigator.clipboard.writeText(fullText); } catch {
        const el = document.createElement("textarea");
        el.value = fullText;
        el.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:.01";
        document.body.appendChild(el);
        el.focus(); el.select();
        try { document.execCommand("copy"); } catch {}
        document.body.removeChild(el);
      }
      btn.classList.add("btn-copied");
      setTimeout(() => btn.classList.remove("btn-copied"), 2000);
    })();
  }

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      aria-label={`Compartir datos de ${bank}`}
      style={{ backgroundColor: "#f1f5f9", color: "#94a3b8" }}
      className="tap-highlight-none w-8 h-8 rounded-xl flex items-center justify-center active:scale-90"
    >
      <Share2 className="w-4 h-4" />
    </button>
  );
}

// ─── Tarjeta de cuenta ────────────────────────────────────────────────────────

function AccountCard({ account }: { account: BankAccount }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
            {account.logoSrc ? (
              <Image
                src={account.logoSrc}
                alt={`Logo ${account.bank}`}
                width={36}
                height={36}
                className="w-full h-full object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            ) : (
              <span className="text-sm font-bold text-slate-600">
                {account.icon ?? account.bank.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm leading-tight">{account.bank}</p>
            <p className="text-slate-500 text-xs">{account.type}</p>
          </div>
        </div>
        <ShareBtn bank={account.bank} type={account.type} number={account.number} cci={account.cci} />
      </div>

      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5 mb-2">
        <div>
          <p className="text-xs text-slate-400 mb-0.5">N° de cuenta</p>
          <p className="font-mono text-slate-800 text-sm font-semibold tracking-wide">{account.number}</p>
        </div>
        <CopyBtn text={account.number} label="número de cuenta" />
      </div>

      {account.cci && (
        <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">CCI (interbancario)</p>
            <p className="font-mono text-slate-800 text-sm font-semibold tracking-wide">{account.cci}</p>
          </div>
          <CopyBtn text={account.cci} label="CCI" />
        </div>
      )}
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function BankAccounts({ accounts }: { accounts: BankAccount[] }) {
  if (!accounts?.length) return null;
  return (
    <div className="w-full px-5 animate-fade-in-up delay-400">
      <div className="flex flex-col gap-3">
        {accounts.map((account, i) => <AccountCard key={i} account={account} />)}
      </div>
    </div>
  );
}
