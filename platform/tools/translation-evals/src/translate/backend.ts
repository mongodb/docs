import {
  createAnthropicBackend,
  createOpenAiBackend,
  type TranslationBackend,
} from '@mongodb-docs/translation-service';

/**
 * The gateway serves each model family on its own wire format, so the model
 * name selects the backend. Every `anthropic`-type model in the gateway
 * catalog is named `claude-*`; everything else on the Responses path is
 * served by the openai backend.
 *
 * The model is forwarded to the factory so the backend runs the model the
 * caller configured. An `undefined` override falls through to the env var
 * and then the backend default.
 */
export function selectBackend(model: string | undefined): TranslationBackend {
  return model?.startsWith('claude-')
    ? createAnthropicBackend({ model })
    : createOpenAiBackend({ model });
}
