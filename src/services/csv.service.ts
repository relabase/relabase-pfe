import { parse } from 'papaparse';
import { readFileSync } from 'fs';
import { User } from '@/interfaces/users.interface';




/**
 * retourne les données du fichier csv
 * 
 * 
 * @param filepath le répertoire du fichier (le répertoire 
 * racine commence à partir du dossier racine)
 * 
 * @returns format JSON
 * 
 */

export function csvParse(filepath:string):User[]
{

    var file = readFileSync(filepath, 'utf8');
    var res;

parse(file, {
    header: true,
    complete: (result) => {
        res = result.data;
    }
});

return res;

};


