"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Editor } from "@tinymce/tinymce-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type ProductData = {
  name: string;
};
interface FieldValues {
  name: string;
}

const CreateProductForm = () => {
  const form = useForm();

  const router = useRouter();
  const [productList, setProductList] = useState<ProductData[]>([]);

  useEffect(() => {
    const storedItem = localStorage.getItem("productList");
    const storedProductList = storedItem ? JSON.parse(storedItem) : [];
    setProductList(storedProductList);
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    const newProductList: ProductData[] = [...productList, { name }];

    setProductList(newProductList);
    localStorage.setItem("productList", JSON.stringify(newProductList));
    router.push("/products");
  };

  return (
    <div>
      <div className="mx-32 flex flex-col gap-5 mb-20">
        <div className="font-semibold text-xl">Product Information</div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-sm border-b-2 py-4 border-opacity-10 my-5">
            <Switch />
            Include in Online store
          </div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col gap-10">
              {/* Products Information */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Product Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Editor
                        apiKey="3nvpw45mb27i236oztduyp22d4ud67tqms706ubsjbspsvmv"
                        initialValue="Write something..."
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body {font-family: Helvetica, Arial, sans-serif;font-size: 14px;background-color: #000;color: #fff;}",
                        }}
                        onEditorChange={(content) => field.onChange(content)}
                      />
                    </FormControl>
                    <h1 className="text-[6px] opacity-60">
                      Use this field to optionally store a long form of
                      explanation of the product being sold for your own
                      rendering purposes.
                    </h1>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Collection</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Select (or) Search for a Collection"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox id="chargeTax" />
                <label className="text-sm font-medium">
                  Charge Tax on this product
                </label>
              </div>

              {/* Prices */}
              <div className="flex items-center justify-between gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Type" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="Amount" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="compareAtPrice"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Compare-at price</FormLabel>
                    <FormControl>
                      <Input placeholder="Compare-at price" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox id="trackInventory" />
                <label className="text-sm font-medium">Track Inventory</label>
              </div>
              <Button className="w-20 mt-4" type="submit">
                {form.formState.isSubmitting ? "Loading" : "Create"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductForm;
