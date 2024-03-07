import { create } from "zustand";

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  image: File | null;
  category: string;
  stock: string;
}

interface ProductState {
  formData: ProductFormData;
  setFormData: (formData: ProductFormData) => void;
}

const useProductStore = create<ProductState>((set) => ({
  formData: {
    name: "",
    price: "",
    description: "",
    image: null,
    category: "",
    stock: "",
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));

export default useProductStore;
