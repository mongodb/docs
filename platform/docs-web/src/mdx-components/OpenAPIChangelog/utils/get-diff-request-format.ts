import { isAfter } from 'date-fns';

export const getDiffRequestFormat = (resourceVersionOne: string, resourceVersionTwo: string) => {
  const resourceVersionChoices = [resourceVersionOne, resourceVersionTwo].sort((a, b) =>
    isAfter(new Date(b.slice(0, 10).split('-').join('/')), new Date(a.slice(0, 10).split('-').join('/'))) ? -1 : 1,
  );
  return resourceVersionChoices.join('_');
};
