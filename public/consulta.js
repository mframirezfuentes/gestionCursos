const {
    Pool
} = require('pg')
const pool = new Pool({
    user: 'postgres',
    port: 5432,
    password: "1234",
    database: "cursos",
    host: 'localhost'
})

async function insertarCurso(datos) {
    const consulta = {
        text: ` INSERT INTO cursos(nombre,nivel,fecha,duracion) values($1,$2,$3,$4) RETURNING *;`,
        values: datos
    }
    try {
        const result = await pool.query(consulta)
        return result.rows
    } catch (error) {
        console.log(error)
        return error
    }

}
async function consultarCursos() {

    try {
        const result = await pool.query(`SELECT * FROM cursos order by id asc`)
        return result.rows

    } catch (error) {
        console.log(error)
        return error
    }
}

async function editCurso(datos) {

    const consulta = {
        text: `UPDATE cursos SET nombre=$1,nivel=$2,fecha=$3,duracion=$4 where nombre=$1 RETURNING *;`,
        values: [datos[0], Number(datos[1]),datos[2], Number(datos[3])]

    }
    try {
        const result = (await pool.query(consulta))      
        return result.rows

    } catch (error) {
        console.log(error)
        return error
    }
}
async function deleteCurso(datos){
    const consulta={
        text: `DELETE FROM cursos where nombre=$1`,
        vaules:datos
    }
    try {
        const result=await pool.query(consulta)
        console.log("r",result)
        return result.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    insertarCurso,
    consultarCursos,
    editCurso,
    deleteCurso
}