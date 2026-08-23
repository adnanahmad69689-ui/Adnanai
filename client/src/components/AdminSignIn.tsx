import { useAuth } from "@/_core/hooks/useAuth";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";

export function AdminSignIn() {
  const { requestPasswordSetup, signInWithPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      await signInWithPassword(email, password);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setPending(false);
    }
  };

  const startPasswordSetup = async () => {
    if (!email) {
      setMessage("Enter your owner email first, then choose Set or reset password.");
      return;
    }
    setPending(true);
    setMessage("");
    try {
      await requestPasswordSetup(email);
      setMessage("Check your email for a secure password setup link.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send the password setup email.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-[#f0ece6]">
      <form onSubmit={submit} className="flex w-full max-w-md flex-col items-center gap-6 border border-white/10 bg-[#111] p-8 text-center shadow-2xl">
        <div><p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#a8ff3e]">Owner access</p><h1 className="text-3xl">Sign in to continue</h1><p className="mt-3 text-sm leading-6 text-[#9e9e9e]">Use your owner email and password to manage this portfolio.</p></div>
        <input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" className="h-11 w-full border border-white/15 bg-black/25 px-3 text-sm text-white outline-none focus:border-[#a8ff3e]" />
        <input required type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" autoComplete="current-password" className="h-11 w-full border border-white/15 bg-black/25 px-3 text-sm text-white outline-none focus:border-[#a8ff3e]" />
        <Button type="submit" disabled={pending} size="lg" className="w-full bg-[#a8ff3e] text-[#111] hover:bg-[#c0ff6e]">{pending ? "Signing in…" : "Sign in"}</Button>
        <button type="button" onClick={() => void startPasswordSetup()} disabled={pending} className="text-xs text-[#bdbdbd] underline-offset-4 hover:text-[#a8ff3e] hover:underline">Set or reset password</button>
        {message ? <p className="text-sm text-[#bdbdbd]">{message}</p> : null}
      </form>
    </div>
  );
}

export function AdminPasswordSetup() {
  const { completePasswordSetup } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 12) {
      setMessage("Use at least 12 characters for your password.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("The two passwords do not match.");
      return;
    }
    setPending(true);
    setMessage("");
    try {
      await completePasswordSetup(password);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save the password.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-[#f0ece6]">
      <form onSubmit={submit} className="flex w-full max-w-md flex-col items-center gap-6 border border-white/10 bg-[#111] p-8 text-center shadow-2xl">
        <div><p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#a8ff3e]">Owner security</p><h1 className="text-3xl">Set your password</h1><p className="mt-3 text-sm leading-6 text-[#9e9e9e]">Choose a password that only you know. It will be used with your owner email to open the dashboard.</p></div>
        <input required type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="New password (12+ characters)" autoComplete="new-password" className="h-11 w-full border border-white/15 bg-black/25 px-3 text-sm text-white outline-none focus:border-[#a8ff3e]" />
        <input required type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Confirm new password" autoComplete="new-password" className="h-11 w-full border border-white/15 bg-black/25 px-3 text-sm text-white outline-none focus:border-[#a8ff3e]" />
        <Button type="submit" disabled={pending} size="lg" className="w-full bg-[#a8ff3e] text-[#111] hover:bg-[#c0ff6e]">{pending ? "Saving password…" : "Save password"}</Button>
        {message ? <p className="text-sm text-[#bdbdbd]">{message}</p> : null}
      </form>
    </div>
  );
}
