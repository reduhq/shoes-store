import React from "react";
import Header from "../_components/header";
import CreateNewClientButton from "./_components/create-new-client-button";

const Page = () => {
  return (
    <div>
      <Header title="Clientes" />
      <div>
        <CreateNewClientButton/>
      </div>
    </div>
  );
};

export default Page;
