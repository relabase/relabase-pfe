import { csvParse } from '@/services/csv.service';
import { User } from '@interfaces/users.interface';

// password: password123456789
export const UserModel: User[] = csvParse('src/csv/csv.csv');
