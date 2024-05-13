"use client";
import React, { SetStateAction, useEffect } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";

import { Input } from "../ui/input";

import { Button } from "../ui/button";

// import { v4 } from "uuid";
import { toast, useToast } from "../ui/use-toast";
import { useModal } from "@/providers/modal-provider";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunnelData } from "@/app/(main)/funnels/page";

//CHALLENGE: Use favicons

type Props = {
  setFunnelList: React.Dispatch<React.SetStateAction<FunnelData[]>>;
  funnelList: FunnelData[];
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Funnel name must be at least 1 character",
  }),
});

const CreateFunnel = (props: Props) => {
  const { setFunnelList, funnelList } = props;
  const { setClose } = useModal();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const modifiedFunnelList = [
      ...funnelList,
      { name: values.name, updatedAt: "Today", published: "Live" },
    ];
    setFunnelList(modifiedFunnelList);
    toast({
      title: "Success",
      description: "New funnel is added",
    });
    setClose();
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>From blank</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funnel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-20 mt-4" type="submit">
              {form.formState.isSubmitting ? "Loading" : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateFunnel;
