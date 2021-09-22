const path = require("path");
const { fusebox } = require("fuse-box");

class Builder {
    static async go() {
        const env = process.env.ENV;
        const isDev = env === 'dev';

        const builder = new Builder(isDev);
        await builder.start(isDev);
    }

    constructor(isDev) {
        this.fuse = fusebox({
            entry: "src/index.ts",
            target: 'browser',
            compilerOptions: {
                tsConfig: "./tsconfig.json",
            },
            webIndex: {
                template: 'src/index.html',
            },
            devServer: isDev,
        });

        this.outputProps = {
            bundles: {
                distRoot: 'public',
                app: 'script.$hash.js',
                styles: 'styles.$hash.css',
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
