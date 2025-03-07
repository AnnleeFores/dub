import { ProjectProps } from "#/lib/types";
import { fetcher } from "@dub/utils";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import useSWR from "swr";

export default function useProject() {
  const { slug } = useParams() as { slug?: string };

  const { data: project, error } = useSWR<ProjectProps>(
    slug && slug !== "qr-codes" && `/api/projects/${slug}`,
    fetcher,
    {
      dedupingInterval: 30000,
    },
  );

  const exceededUsage = useMemo(() => {
    if (project) {
      return project.usage > project.usageLimit;
    }
  }, [project]);

  return {
    ...project,
    exceededUsage,
    error,
  };
}
