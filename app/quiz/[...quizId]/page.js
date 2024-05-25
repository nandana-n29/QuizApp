'use client';
import React, { useEffect, useState } from 'react';
import QuizSubmit from '../../components/quizSubmit';
import QuizTimer from '../../components/QuizTimer';
import { useRouter } from 'next/navigation';

function Page({params}) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const quizId = params.quizId[0];
  const question = parseInt(params.quizId[1]);
  const subject = sessionStorage .getItem('subject');
  const difficulty = sessionStorage.getItem('difficulty');
  const topic = sessionStorage .getItem('topic');
  const unit = sessionStorage.getItem('unit');

  const [username, setUsername] = useState('Anonymous');
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/question', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              quizId: quizId,
              subject: subject,
              difficulty: difficulty,
              ques:question,
              topic: topic,
              unit: unit,
          }),
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const ques = await response.json();
        setQuestions(ques.question);
        console.log(ques)
        saveQuiz(ques.question);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    const saveQuiz = async(questions)=>{
      await fetch('http://localhost:3000/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId: quizId,
          question: questions,
        }),
      })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.error('Error saving quiz data:', error);
      });
    }
    fetchQuestions();
    sessionStorage.setItem('quizId', quizId);
  
    if(localStorage.getItem('username')){
      setUsername(localStorage.getItem('username'));
    }

  }, []);

  

  const handleSubmit = async() => {
    const quizResultData = {
      quizId: quizId,
      username: username,
      questions: questions,
      userAnswers: userAnswers,
    };


    await fetch('http://localhost:3000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizId: quizResultData.quizId,
        username: quizResultData.username,
        questions: quizResultData.questions,
        userAnswers: quizResultData.userAnswers,
      }),
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('Quiz result stored successfully:', data);
    })
    .catch(error => {
      console.error('Error storing quiz result:', error);
    });
    router.push(`/result/${quizId}/${username}`)
  };

  const handleNextQuestion = () => {
    if (questions.length > 0) {
      setCurrentQuestionIndex(prevIndex => (prevIndex + 1));
    }
  };

  const handlePreviousQuestion = () => {
    if (questions.length > 0) {
      setCurrentQuestionIndex(prevIndex =>
        prevIndex === 0 ? 0 : prevIndex - 1
      );
    }
  };

  const handleOptionSelect = (option) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: option
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };
  const handleTimeUp = () => {
    setCurrentQuestionIndex(questions.length)
  };
  useEffect(() => {
    calculateScore();
  }, [userAnswers]);
    const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='container mx-auto'>
      <hr />
      <h1 className='text-5xl my-6 text-center font-black'>
        Quiz Crafters - {quizId}
      </h1>
      <hr />
      {(questions.length === 0) && <h1 className='text-white my-2 text-2xl text-center font-semibold'>Fetching Questions...</h1>}
      {(questions.length !== 0) && 
      <div className="h-screen  p-4 rounded-2xl w-full flex flex-col justify-evenly">
      {currentQuestion && (
          <>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h3 className='text-lg font-semibold'>Subject : {questions[currentQuestionIndex].subject}</h3>
              <h3 className='text-lg font-semibold'>Unit : {questions[currentQuestionIndex].unit}</h3>
              <h3 className='text-lg font-semibold'>Topic: {questions[currentQuestionIndex].topic}</h3>
            </div>
            <div className="flex flex-col">
              <h3 className='text-lg font-semibold'>Username : Anonymous</h3>
              <QuizTimer timeLimit={150*questions.length} onTimeUp={handleTimeUp}/>
            </div>
          </div>
            <h1 className='text-white text-2xl font-semibold'>Q{currentQuestionIndex + 1}. {currentQuestion.question}</h1>
            <div>
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`my-3 ${userAnswers[currentQuestionIndex] === option.option ? 'border-white border-2' : 'border-gray-700 border'} p-2 rounded-lg cursor-pointer`}
                  onClick={() => handleOptionSelect(option.option)}
                >
                  <label className='text-white text-xl ml-2'>{option.option}</label>
                </div>
              ))}
            </div>
            <div>
              {userAnswers[currentQuestionIndex] && (
                <p className='text-white'>Your answer: {userAnswers[currentQuestionIndex]}</p>
              )}
            </div>
          </>
        )}
        {currentQuestionIndex<questions.length && <div className="flex justify-between mt-4">
          <button onClick={handlePreviousQuestion} className="border py-2 px-4 rounded-lg hover:bg-white hover:text-black">Previous</button>
          {currentQuestionIndex < questions.length - 1 && (
          <button onClick={handleNextQuestion} className="border py-2 px-4 rounded-lg hover:bg-white hover:text-black">Next</button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={handleSubmit} className="border py-2 px-4 rounded-lg hover:bg-white hover:text-black">Submit</button>
          )}
        </div>}
        {currentQuestionIndex === questions.length && <QuizSubmit score={score} totalQuestions={questions.length} questions={questions} userAnswers={userAnswers}/>}
      </div>}
    </div>
  );
}

export default Page;
