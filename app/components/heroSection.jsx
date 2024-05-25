"use client";
import React,{useState} from "react";
import { Vortex } from "@/app/components/ui/vortex";
import { useRouter } from "next/navigation";

export default function VortexDemo() {
  const [quizId, setQuizId] = useState();
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/quizValidation', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              quizId: quizId,
          }),
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const success = await response.json();
        if(success.success){
          router.push(`/quiz/${quizId}`);
        }else{
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    check();
    console.log(quizId);
  }
  return (
    <div className="w-full rounded-md h-[80vh] overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        className="flex items-center flex-col justify-center py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-5xl font-black text-center">
        QuizUp Your Life: Where Knowledge Meets Excitement!
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        Embark on an Adventure of Knowledge : Explore, Learn, and Conquer with Our Dynamic Quiz Application!
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <a href="/generateQuiz">
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
              Start new Quiz
            </button>
          </a>
        </div>
        <form className="relative m-4 flex" onSubmit={handleSubmit}>
          <input type="text" id="quizId" name="quizId" className="w-full bg-transparent bg-opacity-20 focus:ring-2 focus:ring-yellow-900 rounded-s-lg border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Join by Quiz ID" defaultValue={quizId} onChange={(e)=>setQuizId(e.target.value)}/>
          <button className="px-4 py-2 border border-gray-600 transition duration-200 rounded-e-lg text-white" disabled={quizId === null}>
            Join
          </button>
        </form>
        {showError && <p className="font-bold text-red-700 w-full text-center">Invalid Quiz ID</p>}
      </Vortex>
    </div>
  );
}

