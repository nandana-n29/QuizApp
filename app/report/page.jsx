import React from 'react'

function Page() {
  return (
    <div className='w-screen min-h-screen'>
      <div className="text-center mt-20">
      <h1 className="sm:text-3xl text-2xl font-semibold title-font text-white mb-4">Henry Lethem</h1>
      <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">Topic : Computer Science & Engineering</p>
      <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">Difficulty : Any</p>
      <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">Number of Ques : 10</p>
      <div className="flex mt-6 justify-center">
        <div className="w-16 h-1 rounded-full bg-orange-500 inline-flex"></div>
      </div>
    </div>
      <section className="text-gray-400 body-font mx-auto">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="flex flex-wrap -m-4">
      <div className="p-4 w-full lg:w-1/2">
        <div className="flex border-2 h-40 w-[40vw] rounded-lg border-gray-800 p-8 sm:flex-row flex-col">
          <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-yellow-400 flex-shrink-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-8 h-8" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-white text-lg title-font font-medium mb-3">Score : 90%</h2>
            <p className="leading-relaxed text-base">Correct Answer : 9/10</p>   
            <p className="leading-relaxed text-base">Wrong Answer : 1/10</p>   
          </div>
        </div>
      </div>
      <div className="p-4 w-full lg:w-1/2">
        <div className="flex border-2 h-40 w-[40vw] rounded-lg border-gray-800 p-8 sm:flex-row flex-col">
          <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-yellow-400 flex-shrink-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-white text-lg title-font font-medium mb-3">Summary</h2>
            <p className="leading-relaxed text-base">Strongness : Operating System, DBMS, PPL</p>
            <p className="leading-relaxed text-base">Weakness : ACA, Computer Network</p>
          </div>
        </div>
      </div>
    </div>
  </div>
      </section>
    </div>
  )
}

export default Page
