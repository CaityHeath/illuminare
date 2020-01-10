import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

let google_civic = process.env.google_civic;

const Index = () => (
  <div>
    <Link href="/about">
        <a  title="About" >About Page</a>
    </Link>
    <p>Hello Next.js</p>

  </div>
);


Index.getInitialProps = async function() {
  const res = await fetch(`https://googleapis.com/civicinfo/v2/elections?key=${google_civic}`);
  const data = await res.text();

  console.log(`data fetched ${data.length}`)
  return {data};
}

export default Index;