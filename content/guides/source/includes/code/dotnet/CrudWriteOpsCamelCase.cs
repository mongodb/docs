// instruct the driver to camelCase the fields in MongoDB
var pack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("elementNameConvention", pack, x => true);
