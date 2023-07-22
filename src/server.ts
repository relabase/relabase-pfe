import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { AnalyzeRoute } from '@/routes/analyze.route';
import { LoginRoute } from '@routes/login.route';
import { AdminRoute } from '@routes/admin.route';
import { DownloadRoute } from '@routes/download.route';
import { ValidateEnv } from '@utils/validateEnv';
import { LogRoute } from '@routes/logs.route';
import { RoleRoute } from '@routes/roles.route';
import { User_requestRoute } from '@routes/user_requests.route';
import { Package_requestRoute } from '@routes/package_requests.route';
import { StatusRoute } from './routes/status.route';

ValidateEnv();

const app = new App([
        new UserRoute(), 
        new AuthRoute(), 
        new AnalyzeRoute(), 
        new LoginRoute(), 
        new AdminRoute(),
        new DownloadRoute(),
        new LogRoute(),
        new RoleRoute(),
        new User_requestRoute(),
        new Package_requestRoute(),
        new StatusRoute()
    ]);

app.listen();
