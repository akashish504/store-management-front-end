import superagentPromise from 'superagent-promise';
import Promise from 'promise';
import json5 from 'json5';

const parser = (data) => {
  return json5.parse(data.text);
};

const superagent = superagentPromise(require('superagent'), Promise);

interface RequestHeader {
  Authorization: string | null;
};

const getUserToken = (): string => {
  return localStorage.getItem('token') ? json5.parse(localStorage.getItem('token')).token : null;
};

const getHeaders = (): RequestHeader => {
  return {
    Authorization: getUserToken(),
    "Content-Type": "application/json",
  };
};

const requests = {
  postWithoutToken: async (url: string, data: object, options) => {
      return await superagent
        .post(url, data)
        .then(response => {
          console.log(response);
          return response.body;
        })
        .catch(err => {
          console.log(err);
        });
    },
  post: async (url, data) => {
    console.log(getUserToken())
      return await superagent
        .post(url, data)
        .set(getHeaders())
        .then(response => {
          return console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
  get: async (url, data) => {
    return await superagent
      .get(url)
      .set(getHeaders())
      .query(data)
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err);
      });
  },
};

export default requests;