export type FunnelListingColumn = { accessorKey: string; header: string };
export const columns: FunnelListingColumn[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
  },
  {
    accessorKey: "published",
    header: "Status",
  },
];
