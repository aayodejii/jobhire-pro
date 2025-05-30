import { useForm } from "../contexts/FormContext";
import ContactFormPopup from "./ContactFormPopup";

const FormPopup = () => {
  const { isFormOpen, closeForm } = useForm();
  return isFormOpen ? <ContactFormPopup onClose={closeForm} /> : null;
};

export default FormPopup;
