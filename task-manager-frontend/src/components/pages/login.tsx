import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema, loginSchema } from "../../lib/validations/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import useUserStore from "../../lib/stores/user-store";
import { useEffect } from "react";

type Token = {
  accessToken: string;
};

const Login = () => {
  const { login, isLoggerIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggerIn) {
      navigate("/");
    }
  }, []);

  const { isPending, mutate } = useMutation({
    mutationFn: (data: LoginSchema) =>
      axios.post("http://localhost:8080/api/auth/authenticate", data),
    onSuccess: async (data) => {
      const token = data.data as Token;
      login(token.accessToken);
      navigate("/");
      toast.success("Succesfully logged in");
    },
    onError: async () => {
      toast.error("Error");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = (data) => mutate(data);

  return (
    <section className="flex justify-center">
      <div className="w-full md:w-[500px] bg-white p-6">
        <p className="mb-2 text-2xl font-medium text-primary text-center">
          Login
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input
              label="Email"
              type="text"
              errorMessage={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              errorMessage={errors.password?.message}
              {...register("password")}
            />
            <Button
              color="primary"
              className="w-full text-sm font-normal"
              type="submit"
              isLoading={isPending}
            >
              Login
            </Button>
          </div>
        </form>
        <div className="flex flex-col gap-2 pt-4">
          <h5 className="text-center text-sm">Don't have an account ?</h5>
          <Link
            className="mx-auto text-sm font-semibold text-primary"
            to="/sign-up"
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
