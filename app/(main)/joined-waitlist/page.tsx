import React from "react";
import { MdCheckCircle } from "react-icons/md";

const JoinedWaitlist = () => {
  return (
    <>
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center"> */}
              {/* <MdTarget className="w-6 h-6 text-white" /> */}
              <img
                src="/img/NextRole-full-logo.png"
                alt=""
                className="w-[140px]"
              />
              {/* </div> */}

              {/* <h1 className="text-2xl font-bold text-white">NextRole</h1> */}
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-top justify-center p-4">
        <div className="h-max bg-white rounded-2xl shadow-xl mt-12 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdCheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            You're on the list!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for joining our waitlist. We'll notify you as soon as
            NextRole launches and you'll be among the first to experience
            professional job application management.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium">
              Keep an eye on your inbox for exclusive early access and special
              launch offers!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinedWaitlist;
