/*
Global type for all the api responses.
Response:
    {
      success: boolean,
      message: string,
      responseObject: any,
      statusCode: number
    }

  Example Response:
    {
      success: true,
      message: "Song retrieved successfully",
      responseObject: 
        {
          id: 1,
          title: "November Rain",
          author_id: 1,
          genre_id: 2,
          album_id: 1
        }
      statusCode: 200
    }
*/

function makeResponse(success, message, data, statusCode) {
  return {
    success,
    message,
    responseObject: data,
    statusCode,
  };
}

module.exports = makeResponse;
