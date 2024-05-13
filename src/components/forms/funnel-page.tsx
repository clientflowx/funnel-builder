"use client";
import React, { useEffect, useId } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";

import { Input } from "../ui/input";

import { Button } from "../ui/button";
import Loading from "../global/loading";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { CopyPlusIcon, Trash } from "lucide-react";
import { FunnelPage } from "@/types/funnel";
import { v4 } from "uuid";
import { useModal } from "@/providers/modal-provider";

interface CreateFunnelPageProps {
  defaultData?: FunnelPage;
  funnelId: string;
  order: number;
  addNewStep?: (newStep: FunnelPage) => void;
  deleteStep?: (stepId: string) => void;
}

const CreateFunnelPage: React.FC<CreateFunnelPageProps> = ({
  defaultData,
  funnelId,
  order,
  addNewStep,
  deleteStep,
}) => {
  const form = useForm();
  const { toast } = useToast();
  const router = useRouter();
  const { setClose } = useModal();
  const onSubmit = async (values: any) => {
    const newStep = {
      id: v4(),
      name: values.name,
      pathName: values.pathName || "",
      order: order,
    };

    if (addNewStep) {
      addNewStep(newStep);
      toast({
        title: "Success",
        description: "New step is added",
      });
      router.refresh();
      setClose();
    }
  };

  const handleDelete = (pageId: string) => {
    if (deleteStep) deleteStep(pageId);
  };

  useEffect(() => {
    if (defaultData) {
      console.log(defaultData);
      form.reset({ name: defaultData.name, pathName: defaultData.pathName });
    }
  }, [defaultData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Page</CardTitle>
        <CardDescription>
          Funnel pages are flow in the order they are created by default. You
          can move them around to change their order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              disabled={form.formState.isSubmitting || order === 0}
              control={form.control}
              name="pathName"
              render={({ field }) => {
                console.log("pathname", field.value);
                return (
                  <FormItem className="flex-1">
                    <FormLabel>Path Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Path for the page"
                        {...field}
                        value={field.value?.toLowerCase()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-2">
              <Button
                className="w-22 self-end"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? <Loading /> : "Save Page"}
              </Button>

              {defaultData?.id && (
                <Button
                  variant={"outline"}
                  className="w-22 self-end border-destructive text-destructive hover:bg-destructive"
                  disabled={form.formState.isSubmitting}
                  type="button"
                  onClick={() => handleDelete(defaultData.id)}
                >
                  {form.formState.isSubmitting ? <Loading /> : <Trash />}
                </Button>
              )}
              {defaultData?.id && (
                <Button
                  variant={"outline"}
                  size={"icon"}
                  disabled={form.formState.isSubmitting}
                  type="button"
                  //   onClick={}
                >
                  {form.formState.isSubmitting ? <Loading /> : <CopyPlusIcon />}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateFunnelPage;
