import {drizzle} from 'drizzle-orm/postgres-js';

import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
dotenv.config( {path: '.env'} );

if(!process.env.DATABASE_URL){
    console.log('🔴DataBase is not Find')
}

const client = postgres(process.env.DATABASE_URL as string)
const db = drizzle(client, { schema });
const migrateDB =async() =>{
    try {
        console.log('🔵Migrate DB')
        await migrate(db, { migrationsFolder: 'migrations' })
        console.log('🟢Migrate DB Success')
    } catch (error) {
        console.log('🔴Migrate DB Error', error)
    }

}
migrateDB();

export default db;
