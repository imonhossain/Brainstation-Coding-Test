export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  console.log("already loded",parentModule, moduleName);
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`);
  }
}
