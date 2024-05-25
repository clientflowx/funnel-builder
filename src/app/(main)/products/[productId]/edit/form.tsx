"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PriceField, ProductData } from "./types";

type Props = {
  productIndex: number;
};

const EditProductForm: React.FC<Props> = ({ productIndex }) => {
  const form = useForm();
  const router = useRouter();
  const [productList, setProductList] = useState<ProductData[]>([]); //product list taken from the local storage
  const [priceFields, setPriceFields] = useState<PriceField[]>([
    {
      amount: "",
      compareAtPrice: "",
      priceAdditionOptions: { description: "", membershipOffer: false },
    },
  ]);

  //fetch the product list from local storage
  useEffect(() => {
    const storedItem = localStorage.getItem("productList");
    const storedProductList = storedItem ? JSON.parse(storedItem) : [];
    setProductList(storedProductList);

    if (storedProductList.length > 0 && productIndex >= 0) {
      const product = storedProductList[productIndex];

      form.reset({
        title: product.name,
        description: product.description,
        chargeTax: product.chargeTax,
        // media: product.media ? [product.media] : null,
        media: null,
        ...product.prices.reduce(
          (
            acc: { [key: string]: string | boolean | number },
            price: PriceField,
            index: number
          ) => {
            acc[`amount_${index}`] = price.amount;
            acc[`compareAtPrice_${index}`] = price.compareAtPrice;
            acc[`priceDescription_${index}`] =
              price.priceAdditionOptions.description;
            acc[`membershipOffer_${index}`] =
              price.priceAdditionOptions.membershipOffer;
            return acc;
          },
          {}
        ),
      });

      setPriceFields(product.prices);
    }
  }, [productIndex, form]);

  const onSubmit = (data: any) => {
    const newProduct: ProductData = {
      name: data.title,
      description: data.description,
      media: data.media[0] || null,
      chargeTax: data.chargeTax,
      prices: priceFields.map((_, index) => ({
        amount: data[`amount_${index}`],
        compareAtPrice: data[`compareAtPrice_${index}`],
        priceAdditionOptions: {
          description: data[`priceDescription_${index}`],
          membershipOffer: data[`membershipOffer_${index}`],
        },
      })),
    };

    // console.log("submitted product data: ", newProduct);
    const newProductList: ProductData[] = [...productList];
    newProductList[productIndex] = newProduct;
    setProductList(newProductList);
    localStorage.setItem("productList", JSON.stringify(newProductList));
    router.push("/products");
  };

  const handleAddPriceField = () => {
    setPriceFields([
      ...priceFields,
      {
        amount: "",
        compareAtPrice: "",
        priceAdditionOptions: { description: "", membershipOffer: false },
      },
    ]);
  };

  return (
    <div>
      <div className="mx-20 flex flex-col gap-5 mb-20">
        <div className="flex flex-col gap-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              {/* Product Information */}
              <div className="p-8 border rounded-md flex flex-col gap-5">
                <div className="font-semibold text-xl">Product Information</div>
                <FormField
                  control={form.control}
                  name="title"
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
                          initialValue={
                            productList[productIndex]?.description || ""
                          }
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
                  name="media"
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>Media</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Upload an image"
                          type="file"
                          accept="image/*"
                          {...field}
                          className="py-20"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="chargeTax"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="chargeTax"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="chargeTax"
                        className="text-sm font-medium"
                      >
                        Charge Tax on this product
                      </label>
                    </div>
                  )}
                />
              </div>

              {/* Prices */}
              <div className="p-8 border rounded-md items-start justify-between flex flex-col gap-5">
                <div className="font-semibold text-xl">Pricing Information</div>
                <div className="flex flex-col gap-16 w-full">
                  {priceFields.map((priceField, index) => (
                    <div key={index} className="flex w-full gap-5 flex-col">
                      <div className="flex gap-5">
                        <FormField
                          control={form.control}
                          name={`amount_${index}`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input placeholder="Amount" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`compareAtPrice_${index}`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Compare-at price</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Compare-at price"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-5 mt-5">
                        <FormField
                          control={form.control}
                          name={`priceDescription_${index}`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Price Description</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Price Description"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Controller
                          control={form.control}
                          name={`membershipOffer_${index}`}
                          render={({ field }) => (
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked) =>
                                  field.onChange(checked)
                                }
                              />
                              <Label htmlFor={`membershipOffer_${index}`}>
                                Membership Offer
                              </Label>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full text-center py-3 pt-5 border-t-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddPriceField}
                  >
                    <Plus size={15} />
                    Add another price
                  </Button>
                </div>
              </div>

              {/* Form submit button */}
              <Button className="w-40 mt-4" type="submit">
                {form.formState.isSubmitting ? "Loading" : "Save Changes"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
