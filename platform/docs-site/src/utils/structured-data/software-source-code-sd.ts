import sanitize from 'sanitize-html';
import { getFullLanguageName } from '@/utils/get-language';
import { StructuredData } from './structured-data';

export class SoftwareSourceCodeSd extends StructuredData {
  codeSampleType: string;
  text: string;
  programmingLanguage?: string;

  constructor({ code, lang, slug }: { code: string; lang?: string; slug?: string }) {
    super('SoftwareSourceCode');
    this.codeSampleType = 'code snippet';
    // Sanitize all input in case HTML snippets are labeled with different language
    this.text = sanitize(code, { disallowedTagsMode: 'escape' });

    const programmingLanguage = getFullLanguageName(lang, slug);
    if (programmingLanguage) {
      this.programmingLanguage = programmingLanguage;
    }
  }
}
