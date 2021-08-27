const {Pool}=require('pg')
const pool=new Pool({
    user:'postgres',
    port:5432,
    password:"1234",
    database:"cursos",
    host:'localhost'
})

async function insertarCurso(datos){
    const consulta={
        text:` INSERT INTO cursos(nombre,nivel,fecha,duracion) values($1,$2,$3,$4) RETURNING *;`,
        values:datos
    }
    try {
        const result=await pool.query(consulta)
        return result.rows
    } catch (error) {
        console.log(error)
        return error
    }
    
}
async function consultarCursos(){

try {
    const result= await pool.query(`SELECT * FROM cursos order by id asc`)
    return result.rows
    
} catch (error) {
    console.log(error)
    return error
}
}

module.exports={insertarCurso,consultarCursos}