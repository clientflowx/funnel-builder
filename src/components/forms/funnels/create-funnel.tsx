"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

import { Button } from "../../ui/button";

// import { v4 } from "uuid";
import { toast } from "../../ui/use-toast";
import { useModal } from "@/providers/modal-provider";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";

type FunnelData = {
  name: string;
};
interface FieldValues {
  name: string;
}

//CHALLENGE: Use favicons

const CreateFunnel = ({
  onFunnelCreated,
}: {
  onFunnelCreated: (newFunnel: FunnelData) => void;
}) => {
  const form = useForm();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    const newFunnel: FunnelData = { name };
    onFunnelCreated(newFunnel);
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Create a New Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
