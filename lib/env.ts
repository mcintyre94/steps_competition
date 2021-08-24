export const getApiKey = (): string => {
    const apiKey = process.env.GRAPHJSON_API_KEY;
    if(!apiKey) {
      throw 'Missing environment variable GRAPHJSON_API_KEY. This can be obtained from the graphjson.com dashboard';
    }
    return apiKey
  }
  
  export const getGraphJSONProject = (): string => {
    const graphJsonProjectRuns = process.env.GRAPHJSON_PROJECT
    if(!graphJsonProjectRuns) {
      throw 'Missing environment variable GRAPHJSON_PROJECT. This should be eg. steps-competition-dev';
    }
    return graphJsonProjectRuns
  }

  export const getSecretAdminApiKey = (): string => {
    const secretAdminApiKey = process.env.SECRET_ADMIN_API_KEY
    if(!secretAdminApiKey) {
      throw 'Missing environment variable SECRET_ADMIN_API_KEY. This should be a long random password';
    }
    return secretAdminApiKey
  } 