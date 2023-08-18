const axios = require("axios");

const token = process.env.SYMPLA_TOKEN;
const baseApiUrl = process.env.SYMPLA_API;

async function getCodes(req, res) {
  const eventId = req.params.id;
  try {
    const ids = await getOrderIds(eventId);
  
    const tickets = await Promise.all(
      ids.map((id) => {
        return getTickets(eventId, id);
      })
    );
  
    const codes = getCodesByQuantity(tickets);
    const result = Object.keys(codes).map((code) => {
      return {
        id: code,
        code: code,
        quantity: codes[code],
      };
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json([])
  }
}

async function getOrderIds(eventId) {

    const { data } = await axios.get(`${baseApiUrl}/events/${eventId}/orders`, {
      headers: {
        s_token: token,
      },
    });
    return data.data.map((dt) => dt.id);
}

async function getTickets(eventId, id) {
    return axios.get(
      `${baseApiUrl}/events/${eventId}/orders/${id}/participants`,
      {
        headers: {
          s_token: token,
        },
      }
    );
}

function getCodesByQuantity(tickets) {
  return tickets.reduce((acc, order) => {
    const { data } = order;
    data.data.forEach((dt) => {
      const { order_discount } = dt;
      if (order_discount) {
        const code = order_discount.split(" - ")[1];
        if (!acc[code]) acc[code] = 0;
        acc[code]++;
      }
    });
    return acc;
  }, {});
}

module.exports = {
  getCodes,
}