import { App, IAppType, runApp } from './source/index';
const options: IAppType = {

}
const fsApp = App(options);
fsApp.run();

const args = process.argv.slice(2);
if (args.includes('web')) {
    runApp();
}