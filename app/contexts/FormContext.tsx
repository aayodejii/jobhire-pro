import { createContext, useContext, useState } from "react";

type FormContextType = {
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const FormContext = createContext<FormContextType | null>(null);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <FormContext.Provider value={{ isFormOpen, openForm, closeForm }}>
      {children}
    </FormContext.Provider>
  );
};
