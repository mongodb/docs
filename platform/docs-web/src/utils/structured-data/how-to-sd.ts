import { StructuredData } from '@/utils/structured-data/structured-data';
import { getPlaintext } from '@/utils/get-plaintext';
import { findKeyValuePair } from '@/utils/find-key-value-pair';
import type { ProcedureNode, StepNode } from '@/types/ast';

export interface HowToStep {
  '@type': 'HowToStep';
  text: string;
  name?: string;
}

export interface HowToSection {
  '@type': 'HowToSection';
  name: string;
  itemListElement: HowToItem[];
}

type HowToItem = HowToSection | HowToStep;

interface HowToSdProps {
  steps: HowToItem[];
  name: string | undefined;
}
class HowToSd extends StructuredData {
  steps: HowToItem[];
  name: string | undefined;
  image: string;

  constructor({ steps, name }: HowToSdProps) {
    super('HowTo');

    this.steps = steps;
    this.name = name;
    // image comes from Flora constants
    // https://github.com/10gen/flora/blob/v1.14.2/src/MDBLogo/constants.ts
    this.image =
      'https://webimages.mongodb.com/_com_assets/cms/kuyj2focmkbxv7gh3-stacked_default_slate_blue.svg?auto=format%252Ccompress';
  }
}

/**
 *
 * @param {node}    step
 * @param {step[]}  targetList  can be either steps[] of HowTo or itemListElement[] of HowToSection
 */
// process step nodes into HowToItem[]
function addStepAsHowToItem(step: StepNode, targetList: HowToItem[]) {
  // check if step is a step node, only handle step node
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

function getHowToSection(procedureDirective: ProcedureNode, name: string) {
  const howToSection: HowToSection = {
    '@type': 'HowToSection',
    name,
    itemListElement: [],
  };

  for (const step of procedureDirective.children) {
    addStepAsHowToItem(step as StepNode, howToSection.itemListElement);
  }

  return howToSection;
}

export const constructHowToSd = ({ steps, parentHeading }: { steps: StepNode[]; parentHeading?: string }) => {
  const howToProps: HowToSdProps = {
    steps: [],
    name: parentHeading,
  };

  // add each step to list as HowToItem
  for (const step of steps) {
    addStepAsHowToItem(step, howToProps.steps);
  }

  return new HowToSd(howToProps);
};
