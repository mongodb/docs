import {
  Card,
  CardLoader,
  CardTitle,
  Checkbox,
  Form,
  FormField,
  FormFieldSecret,
  TeamConfigurationSurface,
} from '@netlify/sdk/ui/react/components';
import { useNetlifySDK } from '@netlify/sdk/ui/react';
import { TeamConfigSchema } from '../../schema/team-config';
import { trpc } from '../trpc';
import logoImg from '../../assets/netlify-logo.png';

export const TeamConfiguration = () => {
  const sdk = useNetlifySDK();
  const trpcUtils = trpc.useUtils();
  const teamSettingsQuery = trpc.teamSettings.query.useQuery();
  const teamSettingsMutation = trpc.teamSettings.mutate.useMutation({
    onSuccess: async () => {
      await trpcUtils.teamSettings.query.invalidate();
    },
  });

  if (teamSettingsQuery.isLoading) {
    return <CardLoader />;
  }

  return (
    <TeamConfigurationSurface>
      <Card>
        <img src={logoImg} alt="Netlify Logo" />
        <CardTitle>Example Section for {sdk.extension.name}</CardTitle>
        <Form
          defaultValues={
            teamSettingsQuery.data ?? {
              exampleString: '',
              exampleSecret: '',
              exampleBoolean: false,
              exampleNumber: 123,
            }
          }
          schema={TeamConfigSchema}
          onSubmit={teamSettingsMutation.mutateAsync}
        >
          <FormField
            name="exampleString"
            type="text"
            label="Example String"
            helpText="This is an example string"
          />
          <FormField
            name="exampleNumber"
            type="number"
            label="Example Number"
            helpText="This is an example number"
          />
          <FormFieldSecret
            name="exampleSecret"
            label="Example Secret"
            helpText="This is an example secret"
          />
          <Checkbox
            name="exampleBoolean"
            label="Example Boolean"
            helpText="This is an example boolean"
          />
        </Form>
      </Card>
    </TeamConfigurationSurface>
  );
};
