"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = ({ params }: { params: { funnelId: string } }) => {
  const router = useRouter();
  const funnelId = params.funnelId;
  useEffect(() => {
    if (funnelId) {
      router.push(`${funnelId}/steps`);
    }
  }, [funnelId, router]);
  return null;
};

export default Page;
