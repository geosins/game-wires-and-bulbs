const { FuseBox } = require("fuse-box");
const { src } = require("fuse-box/sparky");

class Builder {
    static async go() {
        const env = process.env.ENV;

        const builder = new Builder();
        await builder.prepare();

        const watch = env === 'dev';
        await builder.start({watch});
    }

    constructor() {
        this.fuse = FuseBox.init({
            homeDir: "src",
            output: "public/$name.js",
            tsConfig: "./tsconfig.json",
        });

        this.app = this.fuse.bundle("script").instructions(`> index.ts`);
    }

    async prepare() {
        await this.cleanDir();
        await this.copyHtml();
    }

    async start({ watch } = {}) {
        if (watch) {
            this.app.watch();
        }

        await this.fuse.run();
    }

    async cleanDir() {
        await src('./')
            .clean('./public/')
            .exec();
    }

    async copyHtml() {
        await src('./index.html', { base: './src'})
            .dest('./public')
            .exec();
    }
}

Builder.go();
