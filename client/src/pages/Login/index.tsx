import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {HttpError} from "@/types";
import {formErrorMessage} from "@/constants.ts";
import {login} from "@/store/auth";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import {Form, FormButton, FormCheckbox, FormInput, FormInputPassword} from "@components/AuthForm";
import classes from "@pages/Login/styles.module.scss";



type LoginFormValues = {
  email: string,
  pass: string
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>();



  async function onSubmit(data: LoginFormValues){
    try {
      await dispatch(login({email: data.email, password: data.pass})).unwrap();
      navigate("/");
    } catch (err) {
      const {type} = err as HttpError;
      switch (type) {
        // case ErrorType.BAD_REQUEST:
        // case ErrorType.INVALID_DATA:
        // case ErrorType.NOT_VALIDATION:
        // case ErrorType.EMAIL_BUSY:
        //   setError("email", {type: "custom" , message: formErrorMessage.EMAIL_BUSY})
        //   break;
        // case ErrorType.SERVER_ERROR:
        //   break;
      }
    }
  }


  return (
    <div className={classes.login}>
      <Form title="Войти" onSubmit={handleSubmit(onSubmit)}>

        <div className={classes.input_wrap}>
          <FormInput
            type="text"
            placeholder="Электронная почта"
            formRegister={register("email", {required: formErrorMessage.EMAIL_NONE})}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className={classes.input_wrap}>
          <FormInputPassword
            placeholder="Пароль"
            formRegister={register("pass", {required: formErrorMessage.PASSWORD_NONE})}
            errorMessage={errors.pass?.message}
          />
        </div>

        <div className={classes.settings}>
          <FormCheckbox>Запомнить меня</FormCheckbox>
          <Link to="/" className={classes.text}>
            Забыли пароль?
          </Link>
        </div>

        <FormButton>Войти</FormButton>

        <div className={classes.redirect}>
        <span className={classes.text}>
          Нет аккаунта?
        </span>
          <Link to="/signup" className={classes.link}>
            Зарегистрироваться
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;