export type ProductsListingColumn = {
  accessorKey: string;
  header: string;
};
export const columns: ProductsListingColumn[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
  },
];
 