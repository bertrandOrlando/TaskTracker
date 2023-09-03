import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

export const useFormsValidation = (
  addTodo: () => Promise<void>,
  initialValue: bodyTodoItem = {
    task: "",
    description: "",
    category: "",
    fulfillment: 0,
    priority: "Low",
    time: "",
  },
) => {
  return useFormik<bodyTodoItem>({
    initialValues: initialValue,
    onSubmit: addTodo,
    validationSchema: yup.object().shape({
      task: yup.string().required(),
      description: yup.string().required(),
      category: yup.string().required(),
      fulfillment: yup.number().required(),
      priority: yup
        .mixed()
        .oneOf(["Low", "Medium", "High"] as const)
        .defined(),
      time: yup.date().required(),
    }),
  });
};
