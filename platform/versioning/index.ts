/**
 * The docset catalog: the source of truth for which docs sites and versions
 * exist. Replaces the Atlas db `pool.docsets` and `pool.repos_branches`
 * collections.
 *
 * How to add a project: create `projects/<project>.ts`, then add it to the two
 * lists below. CI enforces that every file in `projects/` appears here, so a 
 * forgotten entry fails the build rather than silently dropping a site from the catalog.
 */
import type { Docset } from "./types";
import agentengine from "./projects/agentengine";
import atlasAppServices from "./projects/atlas-app-services";
import atlasArchitecture from "./projects/atlas-architecture";
import atlasCli from "./projects/atlas-cli";
import atlasOperator from "./projects/atlas-operator";
import biConnector from "./projects/bi-connector";
import c from "./projects/c";
import charts from "./projects/charts";
import cloudDocs from "./projects/cloud-docs";
import cloudManager from "./projects/cloud-manager";
import cloudgov from "./projects/cloudgov";
import compass from "./projects/compass";
import cppDriver from "./projects/cpp-driver";
import csharp from "./projects/csharp";
import databaseTools from "./projects/database-tools";
import datalake from "./projects/datalake";
import django from "./projects/django";
import docs from "./projects/docs";
import docs404 from "./projects/docs-404";
import docsK8sOperator from "./projects/docs-k8s-operator";
import docsRelationalMigrator from "./projects/docs-relational-migrator";
import dopDocs from "./projects/dop-docs";
import drivers from "./projects/drivers";
import entityFramework from "./projects/entity-framework";
import golang from "./projects/golang";
import hibernate from "./projects/hibernate";
import intellij from "./projects/intellij";
import java from "./projects/java";
import javaRs from "./projects/java-rs";
import kafkaConnector from "./projects/kafka-connector";
import kotlin from "./projects/kotlin";
import kotlinSync from "./projects/kotlin-sync";
import landing from "./projects/landing";
import laravel from "./projects/laravel";
import mck from "./projects/mck";
import mcpServer from "./projects/mcp-server";
import meta from "./projects/meta";
import mongocli from "./projects/mongocli";
import mongodbShell from "./projects/mongodb-shell";
import mongodbVscode from "./projects/mongodb-vscode";
import mongoid from "./projects/mongoid";
import mongoidRailsmdb from "./projects/mongoid-railsmdb";
import mongosync from "./projects/mongosync";
import node from "./projects/node";
import opsManager from "./projects/ops-manager";
import phpLibrary from "./projects/php-library";
import pymongo from "./projects/pymongo";
import pymongoArrow from "./projects/pymongo-arrow";
import realm from "./projects/realm";
import rubyDriver from "./projects/ruby-driver";
import rust from "./projects/rust";
import scala from "./projects/scala";
import search from "./projects/search";
import selfManagedSearch from "./projects/self-managed-search";
import sparkConnector from "./projects/spark-connector";
import sqlInterface from "./projects/sql-interface";
import standbyClusters from "./projects/standby-clusters";
import vectorSearch from "./projects/vector-search";
import visualStudioExtension from "./projects/visual-studio-extension";
import voyageai from "./projects/voyageai";

// One entry per file in `projects/`. CI enforces that the two stay in sync.
const projects: Docset[] = [
	agentengine,
	atlasAppServices,
	atlasArchitecture,
	atlasCli,
	atlasOperator,
	biConnector,
	c,
	charts,
	cloudDocs,
	cloudManager,
	cloudgov,
	compass,
	cppDriver,
	csharp,
	databaseTools,
	datalake,
	django,
	docs,
	docs404,
	docsK8sOperator,
	docsRelationalMigrator,
	dopDocs,
	drivers,
	entityFramework,
	golang,
	hibernate,
	intellij,
	java,
	javaRs,
	kafkaConnector,
	kotlin,
	kotlinSync,
	landing,
	laravel,
	mck,
	mcpServer,
	meta,
	mongocli,
	mongodbShell,
	mongodbVscode,
	mongoid,
	mongoidRailsmdb,
	mongosync,
	node,
	opsManager,
	phpLibrary,
	pymongo,
	pymongoArrow,
	realm,
	rubyDriver,
	rust,
	scala,
	search,
	selfManagedSearch,
	sparkConnector,
	sqlInterface,
	standbyClusters,
	vectorSearch,
	visualStudioExtension,
	voyageai,
];

/** Every docset, in declaration order. */
export const docsets: Docset[] = projects;

/** Lookup by Snooty project id. */
export const docsetsByProject: Map<string, Docset> = new Map(
	docsets.map((docset) => [docset.project, docset]),
);

/** Returns the docset for a project, or `undefined` if it is not registered. */
export const getDocset = (project: string): Docset | undefined =>
	docsetsByProject.get(project);

export * from "./types";
export {
	defineDocset,
	docsUrlForEnv,
	isMultiVersion,
	searchPropertyFor,
} from "./define";
