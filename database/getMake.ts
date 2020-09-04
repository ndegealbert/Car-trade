import { openDB } from "../pages/openDb";

export  interface Make{
    number:string,
    count:number
}

export  async function getMake(){
    const db=  await openDB()
    const makes = await db.all<Make[]>(`
        SELECT make, count(*) as count
        FROM car
        GROUP BY make
    `);
    return makes;

}

