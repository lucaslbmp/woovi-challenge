"use client";
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">
      <PageTitle text={"Clique no botao para avançar"}/>
      <Link className="mx-auto" href="/payment-method"><Button>Avançar</Button></Link>
    </main>
  );
}
