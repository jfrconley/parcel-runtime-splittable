declare module "@parcel/plugin" {
    import {
        Transformer as TransformerOpts,
        Resolver as ResolverOpts,
        Bundler as BundlerOpts,
        Namer as NamerOpts,
        Runtime as RuntimeOpts,
        Packager as PackagerOpts,
        Optimizer as OptimizerOpts,
        Reporter as ReporterOpts,
        Validator as ValidatorOpts
    } from '@parcel/types';
    export const CONFIG: unique symbol;

    export class Transformer {
        constructor(opts: TransformerOpts);
    }

    export class Resolver {
        constructor(opts: ResolverOpts);
    }

    export class Bundler {
        constructor(opts: BundlerOpts);
    }

    export class Namer {
        constructor(opts: NamerOpts);
    }

    export class Runtime {
        constructor(opts: RuntimeOpts);
    }

    export class Validator {
        constructor(opts: ValidatorOpts);
    }

    export class Packager {
        constructor(opts: PackagerOpts);
    }

    export class Optimizer {
        constructor(opts: OptimizerOpts);
    }

    export class Reporter {
        constructor(opts: ReporterOpts);
    }
}
