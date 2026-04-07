import {
  Button,
  Card,
  CardLoader,
  CardTitle,
  SiteConfigurationSurface,
} from '@netlify/sdk/ui/react/components';
import { trpc } from '../trpc';
import { useNetlifySDK } from '@netlify/sdk/ui/react';

export const SiteConfiguration = () => {
  const sdk = useNetlifySDK();
  const trpcUtils = trpc.useUtils();

  const buildEventHandlerEnabledForSite =
    trpc.buildEventHandler.status.useQuery();

  const enableBuildEventHandlerForSite =
    trpc.buildEventHandler.enable.useMutation({
      onSuccess: async () => {
        await trpcUtils.buildEventHandler.status.invalidate();
      },
    });

  const disableBuildEventHandlerForSite =
    trpc.buildEventHandler.disable.useMutation({
      onSuccess: async () => {
        await trpcUtils.buildEventHandler.status.invalidate();
      },
    });

  if (buildEventHandlerEnabledForSite.isLoading) {
    return <CardLoader />;
  }

  return (
    <SiteConfigurationSurface>
      <Card>
        {buildEventHandlerEnabledForSite.data?.enabled ? (
          <>
            <CardTitle>Disable for site</CardTitle>
            <Button
              className="tw-mt-4"
              loading={disableBuildEventHandlerForSite.isPending}
              onClick={() => disableBuildEventHandlerForSite.mutate()}
              variant="danger"
            >
              Disable
            </Button>
          </>
        ) : (
          <>
            <CardTitle>Enable for site</CardTitle>

            <Button
              className="tw-mt-4"
              loading={enableBuildEventHandlerForSite.isPending}
              onClick={() => enableBuildEventHandlerForSite.mutate()}
            >
              Enable
            </Button>
          </>
        )}
      </Card>
      {buildEventHandlerEnabledForSite.data?.enabled && (
        <Card>
          <CardTitle>Example Section for {sdk.extension.name}</CardTitle>
          <p>This is an example site configuration.</p>
        </Card>
      )}
    </SiteConfigurationSurface>
  );
};
