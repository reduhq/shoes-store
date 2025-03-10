import React from "react";
import InstallmentTable from "./_components/installment-table";
import Header from "../../_components/header";

interface IParams {
  params: Promise<{ loanId: string }>;
}

const Page = async ({ params }: IParams) => {
  const { loanId } = await params;
  
  return (
    <>
      <Header title="Clientes" />
      {/* Client Header */}
      <div className="space-y-4 mx-4">
        <InstallmentTable loanId={loanId} />
      </div>
    </>
  );
};

export default Page;
