import {Sequelize} from 'sequelize'

const DATABASE = process.env.MYSQLDB 
const DBUSER   = process.env.MYSQLDBUSER
const DBPASS   = process.env.MYSQLDBPASS
const DBHOST   = process.env.DBHOST
const db = new Sequelize ( DATABASE, DBUSER, DBPASS,
    {host: DBHOST, dialect: 'mysql' } )

export default db