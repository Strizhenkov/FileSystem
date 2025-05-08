import {runWebServer} from './app';

export interface IAppType {}

export const App = (options: IAppType) => {
    return {
        run: () => {
            console.log("hello world");
        }
    }
};

export const runApp = runWebServer;