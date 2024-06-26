import { useGetAccount, useUpdateAccount } from "@api/auth";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, SvgIconProps, TextField, Typography } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { FC, JSXElementConstructor } from "react";

type FormikTypes = {
  userName?: string;
  password?: string;
  cpassword?: string;
  email?: string;
};

const CustomTextField = ({
  id,
  Icon,
  placeholder,
  type,
  formik,
}: {
  id: "password" | "userName" | "cpassword" | "email";
  Icon: JSXElementConstructor<SvgIconProps>;
  placeholder: string;
  type: "password" | "email" | "text";
  formik: FormikProps<FormikTypes>;
}) => {
  return (
    <TextField
      fullWidth
      id={id}
      value={formik.values[id]}
      type={type}
      placeholder={placeholder}
      InputProps={{
        autoComplete: "new-password",
        startAdornment: (
          <Icon
            fontSize="small"
            sx={{
              color: "text.secondary",
            }}
          />
        ),
      }}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={formik.touched[id] && formik.errors[id]}
      error={formik.errors[id] !== undefined && formik.touched[id]}
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: (t) => t.common.border,
        },
        "& fieldset": {
          display: "none",
        },
      }}
    />
  );
};

const Account: FC<{ maxWidth?: string }> = ({ maxWidth = "600px" }) => {
  const { data: currentUser } = useGetAccount();
  const { mutate: updateAccount, isLoading: updatingAccount } =
    useUpdateAccount();

  const formik = useFormik<FormikTypes>({
    initialValues: {
      userName: currentUser?.userName || "",
      password: "",
      cpassword: "",
      email: currentUser?.email || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const updatedValues = { ...values };
      if (values.password === "" || values.cpassword === "") {
        updatedValues.password = undefined;
        updatedValues.cpassword = undefined;
      }
      updateAccount(updatedValues);
    },
  });

  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: "1px solid",
        borderColor: (theme) => theme.common.border,
        backgroundColor: "background.paper",
        mb: "16px",
        p: "16px",
        maxWidth,
      }}
    >
      <Box>
        <Typography variant="h6" color="text.primary">
          Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Update your account details here.
        </Typography>
      </Box>
      <Box
        mt="16px"
        className="f-column"
        gap="8px"
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <CustomTextField
          formik={formik}
          id="email"
          placeholder="Email"
          type="email"
          Icon={EmailOutlined}
        />
        <CustomTextField
          formik={formik}
          id="userName"
          placeholder="Username"
          type="text"
          Icon={PersonOutline}
        />
        <CustomTextField
          formik={formik}
          id="password"
          placeholder="Password"
          type="password"
          Icon={LockOutlined}
        />
        <CustomTextField
          formik={formik}
          id="cpassword"
          placeholder="Confirm Password"
          type="password"
          Icon={LockOutlined}
        />
        <LoadingButton
          variant="outlined"
          type="submit"
          loading={updatingAccount}
          sx={{
            alignSelf: "flex-end",
            width: "fit-content",
            mt: "16px",
          }}
        >
          Save Changes
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Account;
