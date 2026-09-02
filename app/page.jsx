import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Онлајн закажување термини</h1>

      <p>
        Добредојдовте во системот за едноставно и брзо
        закажување термини.
      </p>

      <Link href="/booking">
        Закажи термин
      </Link>
    </section>
  );
}