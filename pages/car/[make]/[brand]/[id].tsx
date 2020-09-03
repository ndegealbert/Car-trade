import { GetServerSideProps } from "next"
import { openDB } from "../../../openDb"
import { CarModel } from "../../../api/Car"

interface CarDetailsprops{ 
    car:CarModel | undefined | null 
    
}

export default function  CarDetails({car}:CarDetailsprops){
    if(!car){
        return <h1>Car  not found</h1>
    }
    return <div> {JSON.stringify(car,null,4)} </div>

}


export  const getServerSideProps:GetServerSideProps = async ( ctx)=>{
    const  id = ctx.params.id
    const  db =  await openDB()
    const car = await db.get<CarModel| undefined>('SELECT * FROM Car where id = ?' + id );
    return {props:{car}}
}