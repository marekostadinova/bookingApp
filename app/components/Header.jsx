import Link from "next/link";
export default function Header(){

    return(
        <header>
        <nav>
            <Link href="/">Почетна</Link>
             <Link href="/booking">Закажи термин</Link>
        </nav></header>
    );
}