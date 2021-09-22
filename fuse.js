const { fusebox } = require("fuse-box");

class Builder {
    static async go() {
        const env = process.env.ENV;
        const isDev = env === 'dev';

        const builder = new Builder();
        await builder.start(isDev);
    }

    constructor() {
        this.fuse = fusebox({
            entry: "src/index.ts",
            target: 'browser',
            compilerOptions: {
                tsConfig: "./tsconfig.json",
            },
            webIndex: {
                template: 'src/index.html',
            },
        });

        this.outputProps = {
            bundles: {
                distRoot: 'public',
                app: 'script.js',
            },
        }
    }

    async start(isDev) {
        return isDev
            ? this.fuse.runDev(this.outputProps)
            : this.fuse.runProd(this.outputProps);
    }

}

Builder.go();
