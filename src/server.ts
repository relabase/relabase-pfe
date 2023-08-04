import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { AnalyzeRoute } from '@/routes/analyze.route';
import { AdminRoute } from '@routes/admin.route';
import { HistoryRoute } from '@routes/history.route';
import { DownloadRoute } from '@routes/download.route';
import { ValidateEnv } from '@utils/validateEnv';
import { LogRoute } from '@routes/logs.route';
import { RoleRoute } from '@routes/roles.route';
import { User_requestRoute } from '@routes/user_requests.route';
import { Package_requestRoute } from '@routes/package_requests.route';
import { StatusRoute } from './routes/status.route';
import { HomeRoute } from './routes/home.route';
import { HelpRoute } from './routes/help.route';
import { StyleGuideRoute } from './routes/styleguide.route';

ValidateEnv();

const app = new App([
        new UserRoute(), 
        new AuthRoute(), 
        new AnalyzeRoute(), 
        new AdminRoute(),
        new HistoryRoute(),
        new DownloadRoute(),
        new LogRoute(),
        new RoleRoute(),
        new User_requestRoute(),
        new Package_requestRoute(),
        new StatusRoute(),
        new HomeRoute(),
        new HelpRoute(),
        new StyleGuideRoute()
    ]);

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);
});

app.app.use(function (req, res) {
    res.status(404).render('404');
});

app.listen();
