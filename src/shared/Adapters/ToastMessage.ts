import { ToastOptions, toast } from "react-toastify";

export class AdapterToast {
    public static message(type: "success" | "error" | "warning", content: string, options?: ToastOptions) {
        switch(type){
            case "error": toast.error(content, options); break;
            case "success": toast.success(content, options); break;
            case "warning": toast.warn(content, options); break;
        }
    } 
}