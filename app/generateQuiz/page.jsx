'use client';
import React,{useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';


function Page() {
  const router = useRouter();
  const [userSubject, setUserSubject] = useState('');
  const [userTopic, setUserTopic] = useState('');
  const [userUnit, setUserUnit] = useState('');
  const [userDifficulty, setUserDifficulty] = useState('Easy');
  const [questions, setQuestions] = useState(10);
  const [quizId, setQuizId] = useState('');
  const [choices, setChoices] = useState([]);

  const handleChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const topic = selectedOption.getAttribute('data-topic');
    const unit = selectedOption.getAttribute('data-unit');
    const subject = selectedOption.getAttribute('data-subject');

    setUserTopic(topic);
    setUserUnit(unit);
    setUserSubject(subject);
    console.log(topic, unit, subject);
  };
  useEffect(() => {
    // Fetch the choices from the database
    const fetchChoices = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/filter', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const choice = await response.json();
        setChoices(choice);
        console.log(choice);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchChoices();
  }, [quizId])

  const generateQuizId = ()=> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let quizId = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      quizId += characters.charAt(randomIndex);
    }
    
    return quizId;
  }
  const handleGenerate = ()=>{
    const quizId = generateQuizId();
    console.log(quizId);
    if (typeof window !== 'undefined') { 
      sessionStorage.setItem('subject', userSubject);
      sessionStorage.setItem('topic', userTopic);
      sessionStorage.setItem('unit', userUnit);
      sessionStorage.setItem('difficulty', userDifficulty);
    }
    router.push(`/quiz/${quizId}/${questions}`);
    // Save the quizId to the database
  }
  
  return (
  
    <div className='container min-h-screen flex items-center justify-evenly ml-auto'>
      <div className="w-auto bg-gray-800 bg-opacity-50 rounded-lg p-8 mt-10 md:mt-0">
      <h2 className="text-white w-full text-center text-lg font-medium title-font mb-5">QuizCrafters - Quiz App</h2>
      <div className="relative mb-4 flex flex-col">
        <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">Choose the topic</label>
        <select id="topic" name="topic" className="w-full max-w-xl bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange}>
        <option value="">Select Topics</option>
          {
            choices.map((choice, index) => {
              return (<option className='bg-gray-600 py-2' key={index} value={choice.topic} data-topic={choice.topic} data-unit={choice.unit} data-subject={choice.subject}>
            {choice.topic}{choice.unit}, {choice.subject}
          </option>)
            })
          }
        </select>
      </div>
      
      
      <div className="relative mb-4">
        <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">Number of Questions</label>
        <input type="text" id="ques" name="ques" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 rounded border border-gray-600 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" defaultValue={questions} onChange={(e)=>setQuestions(Number(e.target.value))}/>
      </div>

      <div className="flex my-3 items-center">
            <span className="mr-3">Difficulty</span>
            <div className="relative">
              <select className="rounded border border-gray-700 focus:ring-2 focus:ring-orange-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-orange-500 text-white pl-3 pr-10">
                <option className='bg-gray-600 my-2' value="">Select Difficulty</option>
                <option className='bg-gray-600 my-2' value="Easy">Easy</option>
                <option className='bg-gray-600 my-2' value="Medium">Medium</option>
                <option className='bg-gray-600 my-2' value="Hard">Hard</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
      </div>


      <button className="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg" onClick={handleGenerate}>Generate</button>
      
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
      <img className="object-cover object-center p-6 rounded-xl" alt="hero" src="https://iconape.com/wp-content/png_logo_vector/brainstorm-creative-logo.png"/>
    </div>
    </div>
  )
}

export default Page
