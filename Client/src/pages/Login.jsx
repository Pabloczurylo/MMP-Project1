import React from 'react';
import { useForm } from 'react-hook-form';
import { User, EyeOff } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del login:", data);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-start pt-12 px-4 font-sans">
      
      {/* Header / Brand Name */}
      <header className="mb-32">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase">
          Lautaro Lencina
        </h2>
      </header>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
            Acceso Cliente
          </h1>
          <p className="text-gray-400 text-sm">
            Bienvenido de nuevo
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Input: Nombre de cuenta */}
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Nombre de cuenta</label>
            <div className="relative">
              <input
                {...register("username", { required: "El nombre es obligatorio" })}
                type="text"
                placeholder="Introduce tu nombre de cuenta"
                className="w-full bg-[#1a2230] border-none rounded-lg py-3 px-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-500"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
            {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
          </div>

          {/* Input: Contraseña */}
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Contraseña</label>
            <div className="relative">
              <input
                {...register("password", { required: "La contraseña es obligatoria" })}
                type="password"
                placeholder="Introduce tu contraseña"
                className="w-full bg-[#1a2230] border-none rounded-lg py-3 px-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-500"
              />
              <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer" />
            </div>
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* Botón de Iniciar Sesión */}
          <button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mt-4 transition-colors duration-200"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;