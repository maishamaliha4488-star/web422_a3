import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const OPEN_ROUTES = ["/login", "/register", "/about", "/_error"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const [, setFavs] = useAtom(favouritesAtom);

  const loadFavs = useCallback(async () => {
    const fav = await getFavourites();
    setFavs(fav);
  }, [setFavs]);

  const verifyAccess = useCallback(
    (url) => {
      const base = url.split("?")[0];
      if (!isAuthenticated() && !OPEN_ROUTES.includes(base)) {
        setOk(false);
        router.push("/login");
      } else {
        setOk(true);
      }
    },
    [router]
  );

  useEffect(() => {
    if (isAuthenticated()) loadFavs();
    verifyAccess(router.pathname);
    router.events.on("routeChangeComplete", verifyAccess);
    return () => router.events.off("routeChangeComplete", verifyAccess);
  }, []);

  return <>{ok && children}</>;
}
