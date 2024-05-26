import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header>Header</header>
      <nav>
        <Link href='/auth/signin'>Sign In</Link>
      </nav>
      <main>Main</main>
      <footer>Footer</footer>
    </>
  );
}
