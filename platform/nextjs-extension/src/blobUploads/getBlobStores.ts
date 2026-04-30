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
}): { branchStore: Store | false; productionStore: Store } {
	const branchStoreName = isMain ? false : `${branchName}-${PROD_STORE_NAME}`;

	const branchStore =
		branchStoreName &&
		getStore({
			name: branchStoreName,
			siteID: siteId,
			token,
		});

	const productionStore = getStore({
		name: PROD_STORE_NAME,
		siteID: siteId,
		token,
	});

	console.log(`using ${branchStoreName || PROD_STORE_NAME} for mdx content`);
	return { branchStore, productionStore };
}
