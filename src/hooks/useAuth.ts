import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: Session | null } }) => {
        setUser(data.session?.user ?? null);
        setLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
      },
    );

    return () => subscription.unsubscribe();
  }, []);
  return { user, loading };
}
