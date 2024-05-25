import React, {useState,useEffect} from 'react'

function QuizSubmit({ questions, userAnswers}) {
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    calculateScore();
  }, []);

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full mt-6 flex flex-col">
        {questions.map((question, index) => (
          <div  key={index}  className={`border cursor-pointer flex w-full`} >
          <div className="p-3 w-1/3 h-auto border-e flex justify-center items-center font-semibold text-xl">
            Q{index+1}
          </div>
          <div className={`p-3 w-full mx-auto flex justify-center items-center ${userAnswers[index] === questions[index].answer ? 'bg-green-900' : 'bg-red-900'} font-semibold text-xl`}>
            {userAnswers[index]?userAnswers[index]:"Not Attempted"}
          </div>
          </div>
        ))}
      </div>
      <h1 className="text-xl text-white font-bold my-6">Your Score is {score}/{questions.length}</h1>
    </div>
  )
}

export default QuizSubmit;
