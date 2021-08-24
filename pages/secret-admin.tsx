const today = new Date().toISOString().slice(0, 10)

const SecretAdmin = () =>
  <div className="flex items-center justify-center p-4">
    <form className="space-y-8 divide-y divide-gray-200" action="/api/secret-admin-submit" method="POST">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Name (displayed publicly)
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Date recording for
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    defaultValue={today}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="steps" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Steps count
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="steps"
                    id="steps"
                    min="0"
                    max="100000"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="steps" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Secret Key
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="password"
                    name="secretKey"
                    id="secret-key"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
    
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
  </div>

export default SecretAdmin
