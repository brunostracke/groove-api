const axios = require("axios");

const token = process.env.SYMPLA_TOKEN;
const baseApiUrl = process.env.SYMPLA_API;

const config = {
  headers: {
    s_token: token,
  },
};

async function getSymplaEvents() {
  return await axios.get(
    `${baseApiUrl}/events?fields=id,name,start_date&pagesize=200`,
    config
  );
}

async function getSymplaParticipants(eventId) {
  let page = 1;
  let hasNext = true;
  let participants = [];
  while (hasNext) {
    const { data } = await axios.get(
      `${baseApiUrl}/events/${eventId}/participants?page=${page}`,
      config
    );
    hasNext = data.pagination.has_next;
    page++;
    participants = [...participants, ...data.data];
  }
  return participants;
}

module.exports = {
  getSymplaEvents,
  getSymplaParticipants,
};
