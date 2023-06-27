import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { IndexRoute } from '@routes/index.route';
import { LoginRoute } from '@routes/login.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new IndexRoute(), new LoginRoute()]);

app.listen();
