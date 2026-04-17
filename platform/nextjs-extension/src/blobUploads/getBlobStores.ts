import { getStore, type Store } from "@netlify/blobs";

export const MAIN_BRANCH = "main";
export const PROD_STORE_NAME = "mdx-content";

export function getMdxContentBlobStores({
	branchName,
	siteId,
	token,
	isMain,
}: {
	branchName: string;
	siteId: string | undefined;
	token: string | undefined;
	isMain: boolean;
}): { mdxContentStore: Store; productionStore: Store } {
	const storeName = isMain
		? PROD_STORE_NAME
		: `${branchName}-${PROD_STORE_NAME}`;

	const mdxContentStore = getStore({
		name: storeName,
		siteID: siteId,
		token,
	});

	const productionStore = isMain
		? mdxContentStore
		: getStore({
				name: PROD_STORE_NAME,
				siteID: siteId,
				token,
			});

	console.log(`using ${storeName} for mdx content`);
	return { mdxContentStore, productionStore };
}
