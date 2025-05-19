import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/logo.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Thullo</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="#" className="hover:underline">Thullo™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5 rtl:space-x-reverse">
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 1-3.878 1.034A6.505 6.505 0 0 0 16.49.248a16.302 16.302 0 0 1-4.124 1.572 4.108 4.108 0 0 0-7.086 2.807c0 .32.036.634.106.933A11.65 11.65 0 0 1 1.392.75a4.088 4.088 0 0 0-.554 2.067c0 1.426.733 2.683 1.846 3.42a4.086 4.086 0 0 1-1.86-.514v.05a4.11 4.11 0 0 0 3.293 4.026 4.118 4.118 0 0 1-1.853.07 4.116 4.116 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 14.193a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.253 11.675-11.675 0-.178-.004-.355-.012-.53a8.18 8.18 0 0 0 2.01-2.078Z" />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path d="M20 1.892a8.178 8.178 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.233 8.233 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.742A11.662 11.662 0 0 1 1.392.75a4.1 4.1 0 0 0-.554 2.067c0 1.426.733 2.683 1.846 3.42a4.09 4.09 0 0 1-1.86-.514v.05a4.111 4.111 0 0 0 3.293 4.026 4.118 4.118 0 0 1-1.853.07 4.116 4.116 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 14.193a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.253 11.675-11.675 0-.178-.004-.355-.012-.53A8.18 8.18 0 0 0 20 1.892Z" />
              </svg>
              <span className="sr-only">Dribbble page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .333A9.911 9.911 0 0 0 0 10.25c0 4.42 2.865 8.166 6.839 9.49.5.092.682-.216.682-.482 0-.237-.009-.868-.014-1.703-2.782.606-3.37-1.34-3.37-1.34-.454-1.153-1.11-1.461-1.11-1.461-.908-.621.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.517 2.341 1.079 2.91.826.092-.652.35-1.079.636-1.327-2.22-.256-4.555-1.123-4.555-4.998 0-1.105.393-2.008 1.036-2.716-.104-.255-.45-1.286.098-2.681 0 0 .843-.27 2.76 1.035a9.586 9.586 0 0 1 5.022 0c1.915-1.305 2.756-1.035 2.756-1.035.55 1.395.204 2.426.1 2.681.645.708 1.034 1.611 1.034 2.716 0 3.884-2.338 4.738-4.566 4.988.36.309.68.919.68 1.852 0 1.336-.012 2.416-.012 2.743 0 .268.18.579.688.48A9.916 9.916 0 0 0 20 10.25 9.916 9.916 0 0 0 10 .333Z" />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm4.93 7.285-5.25 5.25a.625.625 0 0 1-.884 0l-2.625-2.625a.625.625 0 0 1 .884-.884L9.25 11.04l4.807-4.808a.625.625 0 0 1 .884.884Z" />
              </svg>
              <span className="sr-only">LinkedIn account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
