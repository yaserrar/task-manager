import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SignupSchema, signupSchema } from "../../lib/validations/user";
import useUserStore from "../../lib/stores/user-store";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

const SignUp = () => {
  const { isLoggerIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggerIn) {
      navigate("/");
    }
  }, []);

  const { isPending, mutate } = useMutation({
    mutationFn: (data: SignupSchema) =>
      axios.post("http://localhost:8080/api/auth/register", data),
    onSuccess: async () => {
      navigate("/login");
      toast.success("Account created uccesfully");
    },
    onError: async () => {
      toast.error("Error");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupSchema> = (data) => mutate(data);

  return (
    <section className="flex justify-center">
      <div className="w-full md:w-[500px] bg-white p-6">
        <p className="mb-2 text-2xl font-medium text-primary text-center">
          Sign up
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
              label="Name"
              type="text"
              errorMessage={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Password"
              type="password"
              errorMessage={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Confirm password"
              type="password"
              errorMessage={errors.password?.message}
              {...register("password_confirm")}
            />
            <Button
              color="primary"
              className="w-full text-sm font-normal"
              type="submit"
              isLoading={isPending}
            >
              Sign up
            </Button>
          </div>
        </form>
        <div className="flex flex-col gap-2 pt-4">
          <h5 className="text-center text-sm">Lready have an account ?</h5>
          <Link
            className="mx-auto text-sm font-semibold text-primary"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
