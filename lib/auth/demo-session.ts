export type DemoSession = {
  name: string;
  email: string;
  role: "Student" | "Teacher" | "Admin";
};

const PROFILE_KEY = "eduportal-demo-profiles";

type DemoProfile = {
  name: string;
  email: string;
};

export function saveDemoProfile(profile: DemoProfile) {
  if (typeof window === "undefined") return;

  try {
    const profiles = JSON.parse(
      window.localStorage.getItem(PROFILE_KEY) ?? "[]",
    ) as DemoProfile[];

    const normalizedEmail = profile.email.trim().toLowerCase();
    const updated = profiles.filter(
      (item) => item.email.trim().toLowerCase() !== normalizedEmail,
    );

    updated.push({ name: profile.name.trim(), email: normalizedEmail });
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
  } catch {
    window.localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify([{ name: profile.name.trim(), email: profile.email.trim().toLowerCase() }]),
    );
  }
}

export function readDemoProfileName(email: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    const profiles = JSON.parse(
      window.localStorage.getItem(PROFILE_KEY) ?? "[]",
    ) as DemoProfile[];

    const normalizedEmail = email.trim().toLowerCase();
    return (
      profiles.find(
        (item) => item.email.trim().toLowerCase() === normalizedEmail,
      )?.name ?? null
    );
  } catch {
    return null;
  }
}

const SESSION_KEY = "eduportal-demo-session";
const SESSION_CHANGE_EVENT = "eduportal-demo-session-change";

export function subscribeDemoSession(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener(SESSION_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SESSION_CHANGE_EVENT, callback);
  };
}

export function getDemoSessionSnapshot(): string | null {
  if (typeof window === "undefined") return null;

  return (
    window.sessionStorage.getItem(SESSION_KEY) ??
    window.localStorage.getItem(SESSION_KEY)
  );
}

export function parseDemoSession(raw: string | null): DemoSession | null {
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as Partial<DemoSession>;

    if (
      typeof session.name !== "string" ||
      typeof session.email !== "string"
    ) {
      return null;
    }

    return {
      name: session.name,
      email: session.email,
      role: "Student",
    };
  } catch {
    return null;
  }
}

export function saveDemoSession(session: DemoSession, remember = false) {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);

  const storage = remember ? window.localStorage : window.sessionStorage;

  storage.setItem(SESSION_KEY, JSON.stringify(session));

  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}

export function readDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY) ?? window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Partial<DemoSession>;
    if (typeof session.name !== "string" || typeof session.email !== "string") return null;
    return { name: session.name, email: session.email, role: "Student" };
  } catch {
    return null;
  }
}


export function clearDemoSession() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);

  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}
