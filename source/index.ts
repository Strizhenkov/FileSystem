export interface IAppType {}

export const App = (options: IAppType) => {
    return {
        run: () => {
            console.log("hello world");
        }
    }
};