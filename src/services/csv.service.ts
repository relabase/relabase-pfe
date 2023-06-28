import { parse } from 'papaparse';
import { readFileSync } from 'fs';




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
export const csvParse = (filepath:string) =>
{

    var file = readFileSync(filepath, 'utf8');

parse(file, {
    header: true,
    complete: (result) => {
        console.dir(result.data);
        return result.data;
    
    
    }
});

};


