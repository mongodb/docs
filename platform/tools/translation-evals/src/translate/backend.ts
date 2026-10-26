import {
  BackendName,
  createAnthropicBackend,
  createAwsTranslateBackend,
  createBackend,
  createOpenAiBackend,
  type TranslationBackend,
} from '@mongodb-docs/translation-service';

/**
 * The gateway serves each model family on its own wire format, so the model
 * name selects the backend. Every `anthropic`-type model in the gateway
 * catalog is named `claude-*`; everything else on the Responses path is
 * served by the openai backend.
 *
 * An explicit `backend` (from TRANSLATOR_BACKEND) wins, because AWS
 * Translate has no model name to route on and an operator may deliberately
 * pair a model string with a non-default wire path.
 */
export function resolveBackendName(
  model: string | undefined,
  backend?: BackendName,
): BackendName {
  if (backend !== undefined) return backend;
  return model?.startsWith('claude-') ? BackendName.Anthropic : BackendName.OpenAI;
}

/**
 * Build the translator backend. The LLM backends come from their direct
 * factories so the configured model is forwarded — the registry factories
 * take no model override. AWS Translate and stub have no model, so they go
 * through the registry.
 */
export function selectBackend(
  model: string | undefined,
  backend?: BackendName,
): TranslationBackend {
  const name = resolveBackendName(model, backend);
  if (name === BackendName.Anthropic) return createAnthropicBackend({ model });
  if (name === BackendName.AwsTranslate) return createAwsTranslateBackend();
  if (name === BackendName.Stub) return createBackend(BackendName.Stub);
  return createOpenAiBackend({ model });
}
