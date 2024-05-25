'use client';
import React,{useEffect, useState} from 'react'
import QuizSubmit from '@/app/components/quizSubmit';

function Page({params}: {params: any}) {
    const quizId = params.data[0];
    const username = params.data[1];
    const [quizResult, setQuizResult] = useState(null);

    useEffect(() => {
        const fetchQuizResult = async () => {
            await fetch('http://localhost:3000/api/getResult', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quizId: quizId,
                        username: username,
                    }),
                })
                .then(async response => {
                    const data = await response.json();
                    setQuizResult(data.quizResult);
                })
                .catch(error => {
                console.error('Error fetching quiz result:', error);
              });
        };
    
        fetchQuizResult();
    }, []);
    
    return (
        <div className='w-full flex flex-col justify-center px-auto'>
            <h2 className='text-center text-2xl w-full font-black my-4'>Quiz Result Details</h2>
            {quizResult && (
                <div className='w-[90%] mx-auto'>
                    <p className='text-start my-2 text-2xl'>Quiz ID: {(quizResult as any).quizId}</p>
                    <p className='text-start my-2 text-2xl'>Username: {(quizResult as any).username}</p>
                    <QuizSubmit  
                        questions={(quizResult as any).questions} 
                        userAnswers={(quizResult as any).userAnswers}
                    />
                </div>
            )}
        </div>
    )
}

export default Page