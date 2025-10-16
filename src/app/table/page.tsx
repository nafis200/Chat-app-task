import Table from "@/components/Data_Table/Table";


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name: string;
};

const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
    name: "nafisahamed",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
    name: "rakesh biswas",
  },
  {
    id: "728ed5",
    amount: 100,
    status: "pending",
    email: "m@example.com",
    name: "nafisahamed",
  },
  {
    id: "489e1",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
    name: "rakesh biswas",
  },
  // ...
];

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  

  const query = await searchParams;
  
  return (
    <div>
      <Table payments={payments} />
    </div>
  );
};

export default page;
