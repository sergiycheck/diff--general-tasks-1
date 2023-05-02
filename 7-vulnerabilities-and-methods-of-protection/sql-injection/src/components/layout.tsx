import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button1 } from "./shared";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">{children}</main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <ul className="flex justify-center items-center gap-5 pt-1 pb-1">
      <Link href="/">Home</Link>
    </ul>
  );
}

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <ul className="flex justify-center  items-center gap-5 pt-1 pb-1">
      <Link href="/">Home</Link>
      {status === "authenticated" ? (
        <Button1
          onClick={() => {
            signOut();
          }}
        >
          sign out
        </Button1>
      ) : (
        <Link href="/auth/signin">signin</Link>
      )}
    </ul>
  );
}
