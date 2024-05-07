import EditorProvider from "@/providers/editor/editor-provider";
import { FunnelPage } from "@/types/funnel";
import React from "react";
import { v4 } from "uuid";
import EditorNavigation from "./editor-navigation";
import EditorSidebar from "./editor-sidebar";
import WebsiteEditor from "./website-editor";

type Props = {
  params: { funnelPageId: string };
};

const page: FunnelPage = {
  id: "963de249-ad95-4db3-a222-313052a52195",
  name: "Funnel Test Page",
  pathName: "/funnelpage1",
  order: 0,
};
const funnelId = "0";
const Page = ({ params }: Props) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider funnelId={funnelId} pageDetails={page}>
        <EditorNavigation funnelId={funnelId} pageDetails={page} />
        <div className="h-full flex justify-center">
          <WebsiteEditor funnelPageId={params.funnelPageId} />
        </div>
        <EditorSidebar />
      </EditorProvider>
    </div>
  );
};
export default Page;
