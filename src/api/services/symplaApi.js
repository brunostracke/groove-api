const axios = require("axios");

const token = process.env.SYMPLA_TOKEN;
const baseApiUrl = process.env.SYMPLA_API;

const config = {
    headers: {
      s_token: token,
    },
  
} 
function getSymplaEvents() {
 return axios.get(`${baseApiUrl}/events?fields=id,name,start_date&pagesize=200`, config)
}

function getSymplaParticipants(eventId) {
  return axios.get(`${baseApiUrl}/events/2113137/orders`, config)
}

module.exports = {
  getSymplaEvents
}