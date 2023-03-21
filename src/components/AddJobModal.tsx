import { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Modal,
  TextField,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { ModalContext } from "../context/ModalContext";
import useColumnJobs from "../hooks/useColumnJobs";
import { isDate, parse } from "date-fns";

export type FormValues = {
  candidateName: string;
  photo: string;
  location: string;
  dateApplied: string;
};

const validationSchema = Yup.object().shape({
  candidateName: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  dateApplied: Yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .required("Required")
    .min("1969-11-13", "Date is too early"),
});

const initialValues: FormValues = {
  candidateName: "",
  photo: "",
  location: "",
  dateApplied: "",
};
const ModalForm = () => {
  const { isModalOpen, handleClose, columnType } = useContext(ModalContext);
  const { addJob } = useColumnJobs(columnType);

  const handleSubmit = ({
    candidateName,
    photo,
    location,
    dateApplied,
  }: FormValues) => {
    addJob({ candidateName, photo, location, dateApplied, column: columnType });
    handleClose();
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "0.5rem",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack spacing={2}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: "1.3rem", fontWeight: "bold" }}
                >
                  Add new Job
                </Typography>
                <Field
                  name="candidateName"
                  label="Name"
                  as={TextField}
                  error={touched.candidateName && Boolean(errors.candidateName)}
                  helperText={touched.candidateName && errors.candidateName}
                  placeholder="John Doe"
                />
                <Field
                  name="location"
                  label="Location"
                  as={TextField}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  placeholder="Berlin, Germany"
                />
                <Field
                  name="dateApplied"
                  label="Date Applied"
                  as={TextField}
                  error={touched.dateApplied && Boolean(errors.dateApplied)}
                  helperText={touched.dateApplied && errors.dateApplied}
                  placeholder="dd/mm/yyyy"
                />
                <Field
                  name="photo"
                  label="Photo URL"
                  as={TextField}
                  error={touched.photo && Boolean(errors.photo)}
                  helperText={touched.photo && errors.photo}
                  placeholder="https://example.com/image.jpg"
                />
                <Button type="submit" variant="contained">
                  Add Job
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ModalForm;
