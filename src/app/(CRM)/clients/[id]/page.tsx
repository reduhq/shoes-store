import React from "react";

interface pageParams {
  params: { id: string };
}

const Page = async ({ params }: pageParams) => {
  const {id} = await params
  
  return <div>{id}</div>;
};

export default Page;
