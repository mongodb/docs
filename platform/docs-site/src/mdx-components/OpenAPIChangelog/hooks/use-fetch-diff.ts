import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { toast } from '@via-ds/components/toast';
import { hideDiffChanges } from '@/utils/filter-hidden-changes';
import { useChangelogData } from '@/context/changelog-context';
import type { Environments } from '@/utils/env-config';
import type { AtlasAdminApiChangelogDiff } from '@/types/openapi';

import { getDiffRequestFormat } from '../utils/get-diff-request-format';

export type UseFetchDiffProps = {
  resourceVersionOne: string;
  resourceVersionTwo?: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const useFetchDiff = ({ resourceVersionOne, resourceVersionTwo, setIsLoading }: UseFetchDiffProps) => {
  const env = process.env.NEXT_PUBLIC_ENV as Environments;
  const { mostRecentDiff } = useChangelogData();
  const [diff, setDiff] = useState<AtlasAdminApiChangelogDiff>([]);

  useEffect(() => {
    if (!resourceVersionOne || !resourceVersionTwo) return;

    const fetchDiff = async () => {
      const fromAndToDiffLabel = getDiffRequestFormat(resourceVersionOne, resourceVersionTwo);
      const { mostRecentDiffLabel, mostRecentDiffData } = mostRecentDiff;

      // Use server-side fetched most recent diff if available
      if (mostRecentDiffLabel === fromAndToDiffLabel && Array.isArray(mostRecentDiffData)) {
        setDiff(mostRecentDiffData);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const isStaging = ['staging', 'development', 'dotcomstg'].includes(env);

      try {
        const res = await fetch(
          `/docs/platform/api/openapi/diff/?diff=${fromAndToDiffLabel}${isStaging ? `&staging=true` : ''}`,
        );
        const diffResponse = await res.json();
        const filteredDiff = hideDiffChanges(diffResponse);
        setDiff(filteredDiff);
      } catch (e) {
        console.error(e);
        toast.warning("We've encountered an error fetching this data", {
          description: 'Please try again at a later time.',
          isDismissible: true,
        });
      }
      setIsLoading(false);
    };

    fetchDiff();
  }, [resourceVersionOne, resourceVersionTwo, mostRecentDiff, setIsLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    diff,
    setDiff,
  };
};
