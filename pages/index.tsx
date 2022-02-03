import type { NextPage, GetServerSideProps  } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {prisma} from '../lib/prisma'
import { Post } from '../component/Post'
type props = {
  feed : Post
}
const Home: NextPage<props> = (props) => {
  console.log(props.feed)
  return (
    <div className={styles.container}>
      <Head>
        <title>Find Your Escape</title>
        <meta name="description" content="Application pour trouver des escapes games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Find Your <Link href="/Login"><a >Escape</a></Link>
        </h1>

        <ul className={styles.description}>
          Example : {props.feed.map(el => {
            return (
              <li key={el.id}>{el.title} </li>
            )
          })}
          <code className={styles.code}>pages/index.tsx</code>
        </ul>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps  = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

export default Home
