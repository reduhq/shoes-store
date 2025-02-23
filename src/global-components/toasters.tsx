import { toast } from "sonner";

export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      background: "green",
      color: "white",
    },
  });
};

export const errorToast = (message:string) =>{
    toast.error(message, {
      style: {
        background: "red",
        color: "white",
      },
    });

}