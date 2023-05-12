import { Inter } from 'next/font/google'
import { Header } from 'maxi/component/Header'
import fs from "fs/promises"
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from 'maxi/component/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home({lastestComics}) {
  return (
    <div>
      <Header/>
    <main  >
    <h2>Ultimos Comics</h2>
    <section className='flex justify-items-center items-center'>
    {lastestComics.map(comic =>{
      return(
        <div key={comic.i} className='flex mb-4 pb-4 m-auto'>
        <Link href={`/comic/${comic.i}`} >
        <h3 className='font-bold text-small pb-2 text-center' >{comic.title}</h3>
        <Image width={comic.width} height={comic.height} src={comic.img} alt={comic.alt}/>
        </Link>
        </div>
      )

    })}
    </section>
    </main>
    <Footer/>
    </div>
  )
}

export async function getStaticProps(context){
  const files = await fs.readdir("./comics")
  const lastestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = lastestComicsFiles.map(async (file) =>{
    const content = await fs.readFile(`./comics/${file}`, "utf-8")
    return JSON.parse(content)
  })

  const lastestComics = await Promise.all(promisesReadFiles)

  return{
    props:{
      lastestComics
    }
  }
}
