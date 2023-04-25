import {Sequelize} from 'sequelize'

const DATABASE = process.env.DATABASE 
const DBUSER   = process.env.DBUSER
const DBPASS   = process.env.DBPASS
const DBHOST   = process.env.DBHOST
const db = new Sequelize ( DATABASE, DBUSER, DBPASS,
    {host: DBHOST, dialect: 'mysql' } )

export default db