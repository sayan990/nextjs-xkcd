import { Header } from "maxi/component/Header"
import Image from "next/image"
import {readFile, readdir} from "fs/promises"
import Link from "next/link"
import { basename } from "path"

export default function comic(i, img, alt, title, width, height, hasNext, hasPrevious, nextId, prevId ) {
    return(
    <>
    <Header/>
    <main>
      <section>
        <h1>{title}</h1>
        <Image width={width} height={height} src={img} alt={alt}/>
        {hasPrevious && <Link>anterior</Link>}
        {hasNext && <Link>siguiente</Link>}
        </section>
    </main>
    </>
)}

export async function getStaticPaths () {
  const files = await fs.readdir("./comics")

  const paths = files.map(file =>{
    const i = basename(file, ".json")
    return {params:{i}}
  })

  return{
    paths,
    fallback:true
  }
}

export async function getStaticProps({params}){
  const {i} = params
  const content = await readFile(`./comics/${i}.json`, "utf-8")
  const comic = JSON.parse(content)

  const idNumber = +i
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResults, nextResults] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])

  const hasPrevious = prevResults.status === "fulfilled"
  const hasNext = nextResults.status === "fulfilled"
  
    return{
      props:{
        ...comic,
        hasNext,
        hasPrevious,
        nextId,
        prevId
      }
    }
  }
  