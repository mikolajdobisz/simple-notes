import Link from 'next/link'
import FakeNote from '../components/FakeNote'
import Footer from '../components/Footer'
import styles from '../styles/modules/Home.module.scss'

export default function Home() {
  

  return (
    <main>
      <div className={"container " + styles.headlines}>
        <div className="text-center">
          <h1 className="headline">Take simple notes!</h1>
          <h2 className="headline">Organize your work.</h2>
        </div>
      </div>
      <div className={styles.section_1}>
        <div className={"container " + styles.container}>
          <div>
            <FakeNote 
              title="Maths" 
              text="Learn polynomial equations for friday's exam"
              colorIndex={3}
            />
            <FakeNote 
              title="Groceries" 
              text="Learn polynomial equations for friday's exam"
              colorIndex={4}
              customStyle={{
                position: "absolute",
                top: "160px",
                left: "60px",
              }}
            />
          </div>
          <div className={styles.right}>
            <h2 className="headline">
              YOU DON&apos;T NEED AN ACCOUNT
            </h2>
            <p>
              No need to log in to try it out. 
            </p>
            <p>
              Store your notes in your browser and access them locally.
            </p>
            <h2 className="headline">
              OR <Link href="/signin"><a className="link">SIGN IN</a></Link>
            </h2>
            <p>And enjoy your notes from any device.</p>
            <p>Share them with friends.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
