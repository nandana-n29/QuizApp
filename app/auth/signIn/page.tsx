"use client";
import React,{useState, useEffect} from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/assets/utils/cn";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
    useEffect(() => {
        if(localStorage.getItem('username')){
            router.push('/generateQuiz');
        }
    }, [])
    return (
        <div className="w-full mx-auto flex justify-center items-center h-screen z-10 bg-contain bg-no-repeat bg-opacity-50" style={{background:`url('../quiz_bg.jpg')`}}>
            <SignInForm />
        </div>
    );
}

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signIn = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/signin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identifier: email,password: password }),
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const success = await response.json();
        if(success.success){
          alert(success.success);
          router.push('/generateQuiz');
          if (typeof window !== 'undefined') {
            localStorage.setItem('username', email);
          }
        }else{
          alert("Enter valid credentials")
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    signIn();
  };
  return (<>
    <div className="max-w-md w-full mx-auto border border-white rounded-2xl p-8 shadow-input bg-black bg-opacity-80 backdrop-blur-sm">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to QuizCrafters
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to QuizCrafters for the best quizzes and trivia
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address or Username</Label>
          <Input id="email" placeholder="johndoe@gmail.com" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" defaultValue={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900  block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        
        <div className="h-full w-full text-center text-gray-300 text-base">
            <span>New to QuizCrafters? ,  </span>
            <a href="/auth/signUp" className="text-white underline">
                Signup now
            </a>
        </div>
      </form>
    </div>
  </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
