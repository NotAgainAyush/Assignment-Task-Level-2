import { useState } from 'react';

const useForm = (initialState, validate) => {
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormValues({
        ...formValues,
        [name]: [...formValues[name], value]
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: formValues[name].filter(item => item !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setFormValues({ ...formValues, submitted: true });
    }
  };

  return {
    formValues,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    errors
  };
};

export default useForm;