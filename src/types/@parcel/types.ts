declare module "@parcel/types" {
    import { Readable } from 'stream';
    export type SourceMap = any;
    export type FileSystem = any;
    export type WorkerFarm = any;
    export type PackageManager = any;
    export type Diagnostic = any;
    export type PluginLogger = any;

    export type ConfigResult = any;

    export type AST = {
        type: string,
        version: string,
        program: any,
        isDirty?: boolean
    };

    export type JSONValue = null | // ? Is this okay?
        void | boolean | number | string | Array<JSONValue> | JSONObject;

    export type JSONObject = {
        [K in string]: JSONValue;
    };

    export type PackageName = string;
    export type FilePath = string;
    export type Glob = string;
    export type Semver = string;
    export type SemverRange = string;
    export type ModuleSpecifier = string;

    export type EnvMap = {[key: string]: string}

    export type GlobMap<T> = {
        [K in Glob]: T;
    };

    export type RawParcelConfigPipeline = Array<PackageName>;

    export type HMROptions = {
        port?: number,
        host?: string
    };

    export type RawParcelConfig = {
        extends?: PackageName | FilePath | Array<PackageName | FilePath>,
        resolvers?: RawParcelConfigPipeline,
        transformers?: {
            [K in Glob]: RawParcelConfigPipeline;
        },
        bundler?: PackageName,
        namers?: RawParcelConfigPipeline,
        runtimes?: {
            [K in EnvironmentContext]: RawParcelConfigPipeline;
        },
        packagers?: {
            [K in Glob]: PackageName;
        },
        optimizers?: {
            [K in Glob]: RawParcelConfigPipeline;
        },
        reporters?: RawParcelConfigPipeline,
        validators?: {
            [K in Glob]: RawParcelConfigPipeline;
        }
    };

    export type ResolvedParcelConfigFile = {
        readonly filePath: FilePath,
        readonly resolveFrom?: FilePath
    } & RawParcelConfig;

    export type Engines = {
        readonly browsers?: string | Array<string>,
        readonly electron?: SemverRange,
        readonly node?: SemverRange,
        readonly parcel?: SemverRange
    };

    export type TargetSourceMapOptions = {
        readonly sourceRoot?: string,
        readonly inline?: boolean,
        readonly inlineSources?: boolean
    };

    export interface Target {
        readonly distEntry: FilePath | null;
        readonly distDir: FilePath;
        readonly env: Environment;
        readonly sourceMap: TargetSourceMapOptions | null;
        readonly name: string;
        readonly publicUrl: string;
        readonly loc: SourceLocation | null;
    }

    export type EnvironmentContext =
        "browser"
        | "web-worker"
        | "service-worker"
        | "node"
        | "electron-main"
        | "electron-renderer";

    export type OutputFormat = "esmodule" | "commonjs" | "global";
    export type PackageTargetDescriptor = {
        readonly context?: EnvironmentContext,
        readonly engines?: Engines,
        readonly includeNodeModules?: boolean | Array<PackageName> | {
            [K in PackageName]: boolean;
        },
        readonly outputFormat?: OutputFormat,
        readonly publicUrl?: string,
        readonly distDir?: FilePath,
        readonly sourceMap?: boolean | TargetSourceMapOptions,
        readonly isLibrary?: boolean,
        readonly minify?: boolean,
        readonly scopeHoist?: boolean
    };

    export type TargetDescriptor = {
        readonly distDir: FilePath
    } & PackageTargetDescriptor;

    export type EnvironmentOpts = {
        readonly context?: EnvironmentContext,
        readonly engines?: Engines,
        readonly includeNodeModules?: boolean | Array<PackageName> | {
            [K in PackageName]: boolean;
        },
        readonly outputFormat?: OutputFormat,
        readonly isLibrary?: boolean,
        readonly minify?: boolean,
        readonly scopeHoist?: boolean
    };

    export type VersionMap = {
        [K in string]: string;
    };

    export interface Environment {
        readonly context: EnvironmentContext;
        readonly engines: Engines;
        readonly includeNodeModules: boolean | Array<PackageName> | {
            [K in PackageName]: boolean;
        };
        readonly outputFormat: OutputFormat;
        readonly isLibrary: boolean;
        readonly minify: boolean;
        readonly scopeHoist: boolean;
        isBrowser: (() => boolean);
        isNode: (() => boolean);
        isElectron: (() => boolean);
        isWorker: (() => boolean);
        isIsolated: (() => boolean);
        matchesEngines: ((minVersions: VersionMap) => boolean);
    }

    type PackageDependencies = {
        [K in PackageName]: Semver;
    };

    export type PackageJSON = {
        name: PackageName,
        version: Semver,
        main?: FilePath,
        module?: FilePath,
        types?: FilePath,
        browser?: FilePath | {
            [K in FilePath]: FilePath | boolean;
        },
        source?: FilePath | {
            [K in FilePath]: FilePath;
        },
        alias?: {
            [K in PackageName | FilePath | Glob]: PackageName | FilePath;
        },
        browserslist?: Array<string>,
        engines?: Engines,
        targets?: {
            [K in string]: PackageTargetDescriptor;
        },
        dependencies?: PackageDependencies,
        devDependencies?: PackageDependencies,
        peerDependencies?: PackageDependencies,
        sideEffects?: boolean | FilePath | Array<FilePath>
    };

    export type LogLevel = "none" | "error" | "warn" | "info" | "verbose";
    export type BuildMode = "development" | "production" | string;

    export type InitialParcelOptions = {
        readonly entries?: FilePath | Array<FilePath>,
        readonly rootDir?: FilePath,
        readonly config?: ResolvedParcelConfigFile,
        readonly defaultConfig?: ResolvedParcelConfigFile,
        readonly env?: EnvMap,
        readonly targets?: Array<string> | {
            [K in string]: TargetDescriptor;
        } | null,
        readonly disableCache?: boolean,
        readonly cacheDir?: FilePath,
        readonly killWorkers?: boolean,
        readonly mode?: BuildMode,
        readonly minify?: boolean,
        readonly scopeHoist?: boolean,
        readonly sourceMaps?: boolean,
        readonly publicUrl?: string,
        readonly distDir?: FilePath,
        readonly hot?: HMROptions | null,
        readonly serve?: ServerOptions | false,
        readonly autoinstall?: boolean,
        readonly logLevel?: LogLevel,
        readonly profile?: boolean,
        readonly patchConsole?: boolean,
        readonly inputFS?: FileSystem,
        readonly outputFS?: FileSystem,
        readonly workerFarm?: WorkerFarm,
        readonly packageManager?: PackageManager,
        readonly defaultEngines?: Engines,
        readonly detailedReport?: number | boolean

        // contentHash
        // throwErrors
        // global?
    };

    export interface PluginOptions {
        readonly mode: BuildMode;
        readonly sourceMaps: boolean;
        readonly env: EnvMap;
        readonly hot: HMROptions | null;
        readonly serve: ServerOptions | false;
        readonly autoinstall: boolean;
        readonly logLevel: LogLevel;
        readonly rootDir: FilePath;
        readonly distDir: FilePath;
        readonly projectRoot: FilePath;
        readonly cacheDir: FilePath;
        readonly inputFS: FileSystem;
        readonly outputFS: FileSystem;
        readonly packageManager: PackageManager;
        readonly instanceId: string;
        readonly detailedReport: number;
    }

    export type ServerOptions = {
        readonly host?: string,
        readonly port: number,
        readonly https?: HTTPSOptions | boolean,
        readonly publicUrl?: string
    };

    export type HTTPSOptions = {
        readonly cert: FilePath,
        readonly key: FilePath
    };

// Source locations are 1-based, meaning lines and columns start at 1
    export type SourceLocation = {
        readonly filePath: string,
        readonly start: {
            readonly line: number,
            readonly column: number
        },
        readonly end: {
            readonly line: number,
            readonly column: number
        }
    };

    export type Meta = JSONObject;

    export type Symbol = string;

    export interface Symbols {
        get: ((exportSymbol: Symbol) => {
            local: Symbol,
            loc: SourceLocation | null
        } | null);
        hasExportSymbol: ((exportSymbol: Symbol) => boolean);
        hasLocalSymbol: ((local: Symbol) => boolean);
        // Whether static analysis bailed out
        readonly isCleared: boolean;
    }

    export interface MutableSymbols {
        // Static analysis bailed out
        clear: (() => void);
        set: ((exportSymbol: Symbol, local: Symbol, loc: SourceLocation | null) => void);
    }

    export type DependencyOptions = {
        readonly moduleSpecifier: ModuleSpecifier,
        readonly isAsync?: boolean,
        readonly isEntry?: boolean,
        readonly isOptional?: boolean,
        readonly isURL?: boolean,
        readonly isWeak?: boolean | null,
        readonly loc?: SourceLocation,
        readonly env?: EnvironmentOpts,
        readonly meta?: Meta,
        readonly target?: Target,
        readonly symbols?: Map<Symbol, {
            local: Symbol,
            loc: SourceLocation | null
        }>
    };

    export interface Dependency {
        readonly id: string;
        readonly moduleSpecifier: ModuleSpecifier;
        readonly isAsync: boolean;
        readonly isEntry: boolean;
        readonly isOptional: boolean;
        readonly isURL: boolean;
        readonly isWeak: boolean | null;
        readonly loc: SourceLocation | null;
        readonly env: Environment;
        readonly meta: Meta;
        readonly target: Target | null;
        readonly sourceAssetId: string | null;
        readonly sourcePath: string | null;
        readonly pipeline: string | null;
        // (imported symbol -> variable that it is used as)
        // TODO make immutable
        readonly symbols: MutableSymbols;
    }

    export type File = {
        readonly filePath: FilePath,
        readonly hash?: string
    };

    export type ASTGenerator = {
        type: string,
        version: string
    };

    export interface BaseAsset {
        readonly env: Environment;
        readonly fs: FileSystem;
        readonly filePath: FilePath;
        readonly id: string;
        readonly meta: Meta;
        readonly isIsolated: boolean;
        readonly isInline: boolean;
        readonly isSplittable: boolean | null;
        readonly isSource: boolean;
        readonly type: string;
        readonly sideEffects: boolean;
        readonly uniqueKey: string | null;
        readonly astGenerator: ASTGenerator | null;
        // (symbol exported by this -> name of binding to export)
        readonly symbols: Symbols;
        getAST: (() => Promise<AST | null>);
        getCode: (() => Promise<string>);
        getBuffer: (() => Promise<Buffer>);
        getStream: (() => Readable);
        getMap: (() => Promise<SourceMap | null>);
        getMapBuffer: (() => Promise<Buffer | null>);
        getIncludedFiles: (() => ReadonlyArray<File>);
        getDependencies: (() => ReadonlyArray<Dependency>);
        getConfig: ((
            filePaths: Array<FilePath>,
            options: {
                packageKey?: string,
                parse?: boolean
            } | null
        ) => Promise<ConfigResult | null>);
        getPackage: (() => Promise<PackageJSON | null>);
    }

    export interface MutableAsset {
        isIsolated: boolean;
        isInline: boolean;
        isSplittable: boolean | null;
        type: string;
        addDependency: ((dep: DependencyOptions) => string);
        addIncludedFile: ((file: File) => void);
        addURLDependency: ((url: string, opts: Partial<DependencyOptions>) => string);
        readonly symbols: MutableSymbols;
        isASTDirty: (() => boolean);
        setAST: ((aST: AST) => void);
        setBuffer: ((buffer: Buffer) => void);
        setCode: ((arg0: string) => void);
        setEnvironment: ((opts: EnvironmentOpts) => void);
        setMap: ((arg0: SourceMap | null) => void);
        setStream: ((readable: Readable) => void);
    }

    export interface Asset extends BaseAsset {
        readonly stats: Stats;
    }

    export interface Config {
        readonly isSource: boolean;
        readonly searchPath: FilePath;
        readonly result: ConfigResult;
        readonly env: Environment;
        readonly resolvedPath: FilePath | null;
        setResolvedPath: ((filePath: FilePath) => void);
        setResult: ((result: ConfigResult) => void) // TODO: fix;
        setResultHash: ((resultHash: string) => void);
        addIncludedFile: ((filePath: FilePath) => void);
        addDevDependency: ((name: PackageName, version?: Semver) => void);
        setWatchGlob: ((glob: string) => void);
        getConfigFrom: ((
            searchPath: FilePath,
            filePaths: Array<FilePath>,
            options: {
                packageKey?: string,
                parse?: boolean,
                exclude?: boolean
            } | null
        ) => Promise<ConfigResult | null>);
        getConfig: ((
            filePaths: Array<FilePath>,
            options: {
                packageKey?: string,
                parse?: boolean,
                exclude?: boolean
            } | null
        ) => Promise<ConfigResult | null>);
        getPackage: (() => Promise<PackageJSON | null>);
        shouldRehydrate: (() => void);
        shouldReload: (() => void);
        shouldInvalidateOnStartup: (() => void);
    }

    export type Stats = {
        time: number,
        size: number
    };

    export type GenerateOutput = {
        readonly content: Blob,
        readonly map?: SourceMap | null
    };

    export type Blob = string | Buffer | Readable;

    export type TransformerResult = {
        readonly ast?: AST | null,
        readonly content?: Blob | null,
        readonly dependencies?: ReadonlyArray<DependencyOptions>,
        readonly env?: EnvironmentOpts,
        readonly filePath?: FilePath,
        readonly includedFiles?: ReadonlyArray<File>,
        readonly isInline?: boolean,
        readonly isIsolated?: boolean,
        readonly isSource?: boolean,
        readonly isSplittable?: boolean,
        readonly map?: SourceMap | null,
        readonly meta?: Meta,
        readonly pipeline?: string | null,
        readonly sideEffects?: boolean,
        readonly symbols?: ReadonlyMap<Symbol, {
            local: Symbol,
            loc: SourceLocation | null
        }>,
        readonly symbolsConfident?: boolean,
        readonly type: string,
        readonly uniqueKey?: string | null
    };

    export type Async<T> = T | Promise<T>;

    export type ResolveFn = ((from: FilePath, to: string) => Promise<FilePath>);

    type ResolveConfigFn = ((configNames: Array<FilePath>) => Promise<FilePath | null>);
    type ResolveConfigWithPathFn = ((configNames: Array<FilePath>, assetFilePath: string) => Promise<FilePath | null>);

    export type ValidateResult = {
        warnings: Array<Diagnostic>,
        errors: Array<Diagnostic>
    };

    export type DedicatedThreadValidator = {
        validateAll: ((
            arg0: {
                assets: Asset[],
                resolveConfigWithPath: ResolveConfigWithPathFn,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<Array<ValidateResult | null>>)
    };

    export type MultiThreadValidator = {
        validate: ((
            arg0: {
                asset: Asset,
                config: ConfigResult | void,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<ValidateResult | void>),
        getConfig?: ((
            arg0: {
                asset: Asset,
                resolveConfig: ResolveConfigFn,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<ConfigResult | void>)
    };

    export type Validator = DedicatedThreadValidator | MultiThreadValidator;

    export type Transformer = {
        // TODO: deprecate getConfig
        getConfig?: ((
            arg0: {
                asset: MutableAsset,
                resolve: ResolveFn,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<ConfigResult | void>),
        loadConfig?: ((
            arg0: {
                config: Config,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<void>),
        preSerializeConfig?: ((
            arg0: {
                config: Config,
                options: PluginOptions
            }
        ) => Async<void>),
        postDeserializeConfig?: ((
            arg0: {
                config: Config,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<void>),
        canReuseAST?: ((
            arg0: {
                ast: AST,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => boolean),
        parse?: ((
            arg0: {
                asset: MutableAsset,
                config: ConfigResult | null,
                resolve: ResolveFn,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<AST | null>),
        transform: ((
            arg0: {
                asset: MutableAsset,
                config: ConfigResult | null,
                resolve: ResolveFn,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<Array<TransformerResult | MutableAsset>>),
        generate?: ((
            arg0: {
                asset: Asset,
                ast: AST,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<GenerateOutput>),
        postProcess?: ((
            arg0: {
                assets: Array<MutableAsset>,
                config: ConfigResult | null,
                resolve: ResolveFn,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<Array<TransformerResult>>)
    };

    export interface TraversalActions {
        skipChildren: (() => void);
        stop: (() => void);
    }

    export type GraphVisitor<TNode, TContext> = GraphTraversalCallback<TNode, TContext> | {
        enter?: GraphTraversalCallback<TNode, TContext>,
        exit?: GraphTraversalCallback<TNode, TContext>
    };
    export type GraphTraversalCallback<TNode, TContext> = ((node: TNode, context: TContext | null, actions: TraversalActions) => TContext | null);

    export type BundleTraversable = {
        readonly type: "asset",
        value: Asset
    } | {
        readonly type: "dependency",
        value: Dependency
    };

    export type BundlerBundleGraphTraversable = {
        readonly type: "asset",
        value: Asset
    } | {
        readonly type: "dependency",
        value: Dependency
    };

    export type CreateBundleOpts = {
            readonly uniqueKey?: string,
            readonly entryAsset: Asset,
            readonly target: Target,
            readonly isEntry?: boolean | null,
            readonly isInline?: boolean | null,
            readonly isSplittable?: boolean | null,
            readonly type?: string | null,
            readonly env?: Environment | null
        } | {
        readonly uniqueKey: string,
        readonly entryAsset?: Asset,
        readonly target: Target,
        readonly isEntry?: boolean | null,
        readonly isInline?: boolean | null,
        readonly isSplittable?: boolean | null,
        readonly type: string,
        readonly env: Environment
    };

    export type SymbolResolution = {
        readonly asset: Asset,
        readonly exportSymbol: Symbol | string,
        readonly symbol: void | null | Symbol,
        // the location of the specifier that lead to this result
        readonly loc: SourceLocation | null
    };

    export type ExportSymbolResolution = {
        readonly exportAs: Symbol | string
    } & SymbolResolution;

    export interface Bundle {
        readonly id: string;
        readonly hashReference: string;
        readonly type: string;
        readonly env: Environment;
        readonly filePath: FilePath | null;
        readonly isEntry: boolean | null;
        readonly isInline: boolean | null;
        readonly isSplittable: boolean | null;
        readonly target: Target;
        readonly stats: Stats;
        getEntryAssets: (() => Array<Asset>);
        getMainEntry: (() => Asset | null);
        hasAsset: ((asset: Asset) => boolean);
        traverseAssets: (<TContext>(visit: GraphVisitor<Asset, TContext>) => TContext | null);
        traverse: (<TContext>(visit: GraphVisitor<BundleTraversable, TContext>) => TContext | null);
    }

    export interface NamedBundle extends Bundle {
        readonly filePath: FilePath;
        readonly name: string;
        readonly displayName: string;
    }

    export type BundleGroup = {
        target: Target,
        entryAssetId: string,
        bundleIds: Array<string>
    };

    export interface MutableBundleGraph extends BundleGraph<Bundle> {
        addAssetGraphToBundle: ((asset: Asset, bundle: Bundle) => void);
        addBundleToBundleGroup: ((bundle: Bundle, bundleGroup: BundleGroup) => void);
        createAssetReference: ((dependency: Dependency, asset: Asset) => void);
        createBundleReference: ((bundle0: Bundle, bundle1: Bundle) => void);
        createBundle: ((createBundleOpts: CreateBundleOpts) => Bundle);
        createBundleGroup: ((dependency: Dependency, target: Target) => BundleGroup);
        getDependencyAssets: ((dependency: Dependency) => Array<Asset>);
        getParentBundlesOfBundleGroup: ((bundleGroup: BundleGroup) => Array<Bundle>);
        getTotalSize: ((asset: Asset) => number);
        removeAssetGraphFromBundle: ((asset: Asset, bundle: Bundle) => void);
        removeBundleGroup: ((bundleGroup: BundleGroup) => void);
        internalizeAsyncDependency: ((bundle: Bundle, dependency: Dependency) => void);
        traverse: (<TContext>(graphVisitor: GraphVisitor<BundlerBundleGraphTraversable, TContext>) => TContext | null);
        traverseContents: (<TContext>(graphVisitor: GraphVisitor<BundlerBundleGraphTraversable, TContext>) => TContext | null);
    }

    export interface BundleGraph<TBundle extends Bundle> {
        getBundles: (() => Array<TBundle>);
        getBundleGroupsContainingBundle: ((bundle: Bundle) => Array<BundleGroup>);
        getBundlesInBundleGroup: ((bundleGroup: BundleGroup) => Array<TBundle>);
        getChildBundles: ((bundle: Bundle) => Array<TBundle>);
        getParentBundles: ((bundle: Bundle) => Array<TBundle>);
        getSiblingBundles: ((bundle: Bundle) => Array<TBundle>);
        getReferencedBundles: ((bundle: Bundle) => Array<TBundle>);
        getDependencies: ((asset: Asset) => Array<Dependency>);
        getIncomingDependencies: ((asset: Asset) => Array<Dependency>);
        resolveExternalDependency: ((dependency: Dependency, bundle?: Bundle) => {
            type: "bundle_group",
            value: BundleGroup
        } | {
            type: "asset",
            value: Asset
        } | null);
        isDependencyDeferred: ((dependency: Dependency) => boolean);
        getDependencyResolution: ((dependency: Dependency, bundle?: Bundle) => Asset | null);
        findBundlesWithAsset: ((asset: Asset) => Array<TBundle>);
        findBundlesWithDependency: ((dependency: Dependency) => Array<TBundle>);
        isAssetReachableFromBundle: ((asset: Asset, bundle: Bundle) => boolean);
        findReachableBundleWithAsset: ((bundle: Bundle, asset: Asset) => TBundle | null);
        isAssetReferenced: ((asset: Asset) => boolean);
        isAssetReferencedByDependant: ((bundle: Bundle, asset: Asset) => boolean);
        hasParentBundleOfType: ((bundle: Bundle, type: string) => boolean);
        /**
         * Resolve the export `symbol` of `asset` to the source,
         * stopping at the first asset after leaving `bundle`.
         * `symbol === null`: bailout (== caller should do `asset.exports[exportsSymbol]`)
         * `symbol === undefined`: symbol not found
         */
        resolveSymbol: ((asset: Asset, symbol: Symbol, boundary: Bundle | null) => SymbolResolution);
        getExportedSymbols: ((asset: Asset) => Array<ExportSymbolResolution>);
        traverseBundles: (<TContext>(visit: GraphVisitor<TBundle, TContext>, startBundle?: Bundle) => TContext | null);
    }

    export type BundleResult = {
        readonly contents: Blob,
        readonly ast?: AST,
        readonly map?: SourceMap | null
    };

    export type ResolveResult = {
        readonly filePath?: FilePath,
        readonly isExcluded?: boolean,
        readonly sideEffects?: boolean,
        readonly code?: string
    };

    export type Bundler = {
        bundle: ((
            arg0: {
                bundleGraph: MutableBundleGraph,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<void>),
        optimize: ((
            arg0: {
                bundleGraph: MutableBundleGraph,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<void>)
    };

    export type Namer = {
        name: ((
            arg0: {
                bundle: Bundle,
                bundleGraph: BundleGraph<Bundle>,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<FilePath | null>)
    };

    export type RuntimeAsset = {
        readonly filePath: FilePath,
        readonly code: string,
        readonly dependency?: Dependency,
        readonly isEntry?: boolean
    };

    export type Runtime = {
        apply: ((
            arg0: {
                bundle: NamedBundle,
                bundleGraph: BundleGraph<NamedBundle>,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<void | RuntimeAsset | Array<RuntimeAsset>>)
    };

    export type Packager = {
        package: ((
            arg0: {
                bundle: NamedBundle,
                bundleGraph: BundleGraph<NamedBundle>,
                options: PluginOptions,
                logger: PluginLogger,
                getInlineBundleContents: ((bundle: Bundle, bundleGraph: BundleGraph<NamedBundle>) => Async<{
                    contents: Blob
                }>),
                getSourceMapReference: ((map: SourceMap | null) => Async<string | null>)
            }
        ) => Async<BundleResult>)
    };

    export type Optimizer = {
        optimize: ((
            arg0: {
                bundle: NamedBundle,
                contents: Blob,
                map: SourceMap | null,
                options: PluginOptions,
                logger: PluginLogger,
                getSourceMapReference: ((map: SourceMap | null) => Async<string | null>)
            }
        ) => Async<BundleResult>)
    };

    export type Resolver = {
        resolve: ((
            arg0: {
                dependency: Dependency,
                options: PluginOptions,
                logger: PluginLogger,
                filePath: FilePath
            }
        ) => Async<ResolveResult | null>)
    };

    export type ProgressLogEvent = {
        readonly type: "log",
        readonly level: "progress",
        readonly phase?: string,
        readonly message: string
    };

    export type DiagnosticLogEvent = {
        readonly type: "log",
        readonly level: "error" | "warn" | "info" | "verbose",
        readonly diagnostics: Array<Diagnostic>
    };

    export type TextLogEvent = {
        readonly type: "log",
        readonly level: "success",
        readonly message: string
    };

    export type LogEvent = ProgressLogEvent | DiagnosticLogEvent | TextLogEvent;

    export type BuildStartEvent = {
        readonly type: "buildStart"
    };

    type WatchStartEvent = {
        readonly type: "watchStart"
    };

    type WatchEndEvent = {
        readonly type: "watchEnd"
    };

    type ResolvingProgressEvent = {
        readonly type: "buildProgress",
        readonly phase: "resolving",
        readonly dependency: Dependency
    };

    type TransformingProgressEvent = {
        readonly type: "buildProgress",
        readonly phase: "transforming",
        readonly filePath: FilePath
    };

    type BundlingProgressEvent = {
        readonly type: "buildProgress",
        readonly phase: "bundling"
    };

    type PackagingProgressEvent = {
        readonly type: "buildProgress",
        readonly phase: "packaging",
        readonly bundle: NamedBundle
    };

    type OptimizingProgressEvent = {
        readonly type: "buildProgress",
        readonly phase: "optimizing",
        readonly bundle: NamedBundle
    };

    export type BuildProgressEvent =
        ResolvingProgressEvent
        | TransformingProgressEvent
        | BundlingProgressEvent
        | PackagingProgressEvent
        | OptimizingProgressEvent;

    export type BuildSuccessEvent = {
        readonly type: "buildSuccess",
        readonly bundleGraph: BundleGraph<NamedBundle>,
        readonly buildTime: number,
        readonly changedAssets: Map<string, Asset>
    };

    export type BuildFailureEvent = {
        readonly type: "buildFailure",
        readonly diagnostics: Array<Diagnostic>
    };

    export type BuildEvent = BuildFailureEvent | BuildSuccessEvent;

    export type ValidationEvent = {
        readonly type: "validation",
        readonly filePath: FilePath
    };

    export type ReporterEvent =
        LogEvent
        | BuildStartEvent
        | BuildProgressEvent
        | BuildSuccessEvent
        | BuildFailureEvent
        | WatchStartEvent
        | WatchEndEvent
        | ValidationEvent;

    export type Reporter = {
        report: ((
            arg0: {
                event: ReporterEvent,
                options: PluginOptions,
                logger: PluginLogger
            }
        ) => Async<void>)
    };

    export interface ErrorWithCode {
        readonly code?: string;
    }

    export interface IDisposable {
        dispose: (() => unknown);
    }

    export interface AsyncSubscription {
        unsubscribe: (() => Promise<unknown>);
    }
}
