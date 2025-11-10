/**
 * Classes to construct Structured Data JSON.
 * Required props should be read in constructor function (to fail validity).
 * Optional props can be set conditionally.
 * Constant values should be set in the constructor function.
 * Optional overwrites can be set in params as default values
 */
import type { ProcedureNode, StepNode } from '@/types/ast';

import { findKeyValuePair } from './find-key-value-pair';
import { getPlaintext } from './get-plaintext';

// Class name to help Smartling identify all structured data, if needed
export const STRUCTURED_DATA_CLASSNAME = 'structured_data';

export class StructuredData {
  '@context': string;
  '@type': string;

  constructor(type: string) {
    this['@context'] = 'https://schema.org';
    this['@type'] = type;
  }

  isValid() {
    function recursiveValidity(param: unknown): boolean {
      // array
      if (Array.isArray(param)) {
        return param.every((e) => recursiveValidity(e));
      }
      // object
      else if (param && typeof param === 'object') {
        return Object.keys(param).every((e) => {
          if (param.hasOwnProperty(e)) return recursiveValidity(param[e as keyof typeof param]);
          return true;
        });
      }

      // string or number
      return String(param).length > 0;
    }

    return recursiveValidity(this);
  }

  toString() {
    return JSON.stringify(this);
  }

  static addCompanyToName(name: string | string[]): string | string[] {
    if (!name) {
      return name;
    }
    if (Array.isArray(name)) {
      return name.map((n) => this.addCompanyToName(n) as string);
    }
    if (name.toLowerCase().includes('mongodb')) {
      return name;
    }
    return `MongoDB ${name}`;
  }
}

class HowToSd extends StructuredData {
  steps: StepNode[];
  name: string;
  image: string;

  constructor({ steps, name }: { steps: StepNode[]; name: string }) {
    super('HowTo');

    this.steps = steps;
    this.name = name;
    // image comes from Flora constants
    // https://github.com/10gen/flora/blob/v1.14.2/src/MDBLogo/constants.ts
    this.image =
      'https://webimages.mongodb.com/_com_assets/cms/kuyj2focmkbxv7gh3-stacked_default_slate_blue.svg?auto=format%252Ccompress';
  }
}

export const constructHowToSd = ({ steps, parentHeading }: { steps: StepNode[]; parentHeading: string }) => {
  function getHowToSection(procedureDirective: ProcedureNode, name: string) {
    const howToSection = {
      '@type': 'HowToSection',
      name,
      itemListElement: [],
    };

    for (const step of procedureDirective.children) {
      handleStep(step as StepNode, howToSection.itemListElement);
    }

    return howToSection;
  }

  /**
   *
   * @param {node}    step
   * @param {step[]}  targetList  can be either steps[] of HowTo or itemListElement[] of HowToSection
   */
  function handleStep(step: StepNode, targetList: HowToItem[]) {
    if (step.name !== 'step') {
      return;
    }
    // text of step is derived from children, or fallback to step's argument
    const childText = getPlaintext(step.children);
    const argText = getPlaintext(step.argument);
    // NOTE: step.argument is repeated in step.children as a Heading component
    // so strip the heading from children
    const bodyText = childText.replace(argText, '');

    // deep search for nested procedure to make sibling sections
    const nestedProcedure = findKeyValuePair(step.children, 'name', 'procedure');
    if (nestedProcedure) {
      targetList.push(getHowToSection(nestedProcedure, (argText ?? bodyText) as string) as HowToSection);
    } else {
      // build step
      const stepSD: HowToStep = {
        '@type': 'HowToStep',
        text: bodyText.length ? bodyText : argText,
      };
      if (bodyText.length && argText) {
        stepSD.name = argText;
      }
      targetList.push(stepSD);
    }
  }

  interface HowToStep {
    '@type': 'HowToStep';
    text: string;
    name?: string;
  }
  interface HowToSection {
    '@type': 'HowToSection';
    name: string;
    itemListElement: HowToItem[];
  }
  type HowToItem = HowToStep | HowToSection;

  const howToProps = {
    steps: [],
    name: parentHeading,
  };

  for (const step of steps) {
    handleStep(step, howToProps.steps);
  }

  return new HowToSd(howToProps);
};

export class VideoObjectSd extends StructuredData {
  embedUrl?: string;
  name?: string;
  uploadDate?: string;
  thumbnailUrl?: string;
  description?: string;

  constructor({
    embedUrl,
    name,
    uploadDate,
    thumbnailUrl,
    description,
  }: {
    embedUrl?: string;
    name?: string;
    uploadDate?: string;
    thumbnailUrl?: string;
    description?: string;
  }) {
    super('VideoObject');

    this.embedUrl = embedUrl;
    this.name = name;
    this.uploadDate = uploadDate;
    this.thumbnailUrl = thumbnailUrl;

    if (description) {
      this.description = description;
    }
  }

  isValid() {
    const hasAllReqFields = [this.embedUrl, this.name, this.uploadDate, this.thumbnailUrl].every((val) => !!val);
    return hasAllReqFields && super.isValid();
  }
}
