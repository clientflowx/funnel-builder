"use client";

import CustomModal from "@/components/global/custom-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/providers/modal-provider";
import { Check, ExternalLink, LucideEdit } from "lucide-react";
import React, { useId, useState } from "react";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Funnel, FunnelPage } from "@/types/funnel";
import CreateFunnelPage from "@/components/forms/funnel-page";
import FunnelStepCard from "./funnel-step-card";
import { v4 } from "uuid";
import FunnelPagePlaceholder from "@/components/funnel-page-placeholder";

// Test Data
const funnel: Funnel = {
  subDomainName: "cxf.com",
};
const pages: FunnelPage[] = [
  {
    id: "963de249-ad95-4db3-a222-313052a52195",
    name: "Funnel Test Page",
    pathName: "/funnelpage1",
    order: 0,
  },
  {
    id: v4(),
    name: "Funnel Test Page 2",
    pathName: "/funnelpage2",
    order: 1,
  },
  {
    id: v4(),
    name: "Funnel Test Page 3",
    pathName: "/funnelpage3",
    order: 2,
  },
];

const FunnelSteps = () => {
  const funnelId = "0";
  const { toast } = useToast();
  const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>(
    pages[0]
  );
  const { setOpen } = useModal();
  const [pagesState, setPagesState] = useState(pages);
  console.log(pagesState);
  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;

    //no destination or same position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    //change state
    const newPageOrder = [...pagesState]
      .toSpliced(source.index, 1)
      .toSpliced(destination.index, 0, pagesState[source.index])
      .map((page, idx) => {
        return { ...page, order: idx };
      });

    setPagesState(newPageOrder);

    toast({
      title: "Success",
      description: "Saved page order",
    });
  };

  const addNewStep = (newStep: FunnelPage) => {
    setPagesState([...pagesState, newStep]);
  };
  const deleteStep = (stepId: string) => {
    const tobeDeletedStep = pagesState.find((page) => page.id === stepId)!;
    const tobeDeletedStepIndex = pagesState.indexOf(tobeDeletedStep!);
    const orderModifiedList = pagesState.map((page) => {
      if (page.order > tobeDeletedStep.order)
        return { ...page, order: page.order - 1 };
      else return page;
    });
    orderModifiedList.splice(tobeDeletedStepIndex, 1);
    setClickedPage(orderModifiedList[0]);
    setPagesState(orderModifiedList);
  };
  return (
    <AlertDialog>
      <div className="flex border-[1px] lg:!flex-row flex-col w-full">
        <aside className="flex-[0.3] bg-background p-6  flex flex-col justify-between ">
          <ScrollArea className="h-full ">
            <div className="flex gap-4 items-center">
              <Check />
              Funnel Steps
            </div>
            {pagesState.length ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="funnels"
                  direction="vertical"
                  key="funnels"
                >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {pagesState.map((page, idx) => (
                        <div
                          className="relative"
                          key={page.id}
                          onClick={() => setClickedPage(page)}
                        >
                          <FunnelStepCard
                            funnelPage={page}
                            index={idx}
                            key={page.id}
                            activePage={page.id === clickedPage?.id}
                          />
                        </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                No Pages
              </div>
            )}
          </ScrollArea>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setOpen(
                <CustomModal
                  title=" Create or Update a Funnel Page"
                  subheading="Funnel Pages allow you to create step by step processes for customers to follow"
                >
                  <CreateFunnelPage
                    funnelId={funnelId}
                    order={pagesState.length}
                    addNewStep={addNewStep}
                  />
                </CustomModal>
              );
            }}
          >
            Create New Steps
          </Button>
        </aside>
        <aside className="flex-[0.7] bg-muted p-4 ">
          {!!pages.length ? (
            <Card className="h-full flex justify-between flex-col">
              <CardHeader>
                <p className="text-sm text-muted-foreground">Page name</p>
                <CardTitle>{clickedPage?.name}</CardTitle>
                <CardDescription className="flex flex-col gap-4">
                  <div className="border-2 rounded-lg sm:w-80 w-full  overflow-clip">
                    <Link
                      href={`/funnels/${funnelId}/builder/${clickedPage?.id}`}
                      className="relative group"
                    >
                      <div className="cursor-pointer group-hover:opacity-30 w-full">
                        {/* Todo: div inside p, hydration error */}
                        <FunnelPagePlaceholder />
                      </div>
                      <LucideEdit
                        size={50}
                        className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transofrm -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                      />
                    </Link>

                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_SCHEME}${funnel.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${clickedPage?.pathName}`}
                      className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink size={15} />
                      <div className="w-64 overflow-hidden overflow-ellipsis ">
                        {process.env.NEXT_PUBLIC_SCHEME}
                        {funnel.subDomainName}.{process.env.NEXT_PUBLIC_DOMAIN}/
                        {clickedPage?.pathName}
                      </div>
                    </Link>
                  </div>
                </CardDescription>
                <CreateFunnelPage
                  defaultData={clickedPage}
                  funnelId={funnelId}
                  order={clickedPage?.order || 0}
                  deleteStep={deleteStep}
                />
              </CardHeader>
            </Card>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-muted-foreground">
              Create a page to view page settings.
            </div>
          )}
        </aside>
      </div>
    </AlertDialog>
  );
};

export default FunnelSteps;
