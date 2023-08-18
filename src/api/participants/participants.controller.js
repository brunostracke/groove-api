const { getSymplaParticipants } = require("../services/symplaApi");

const token = process.env.SYMPLA_TOKEN;
const baseApiUrl = process.env.SYMPLA_API;

async function getCodes(req, res) {
  const eventId = req.params.id;
  try {
    const participants = await getSymplaParticipants(eventId);

    const initialState = {
      eventId,
      revenue: 0,
      liquidRevenue: 0,
      count: 0,
      codesQuantity: [],
    };

    const result = participants.reduce((acc, part) => {
      const { order_discount, ticket_sale_price } = part;
      acc["revenue"] = acc["revenue"] + ticket_sale_price;
      acc.liquidRevenue = acc.liquidRevenue + ticket_sale_price / 1.1;
      acc.count++;
      if (order_discount) {
        const code = order_discount.split(" - ")[1];
        const index = acc.codesQuantity.findIndex((obj) => (obj.id === code));
        if (index < 0) {
          acc.codesQuantity.push({
            id: code,
            quantity: 1,
          });
        } else {
          acc.codesQuantity[index].quantity++;
        }
      }
      return acc;
    }, initialState);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json([]);
  }
}

module.exports = {
  getCodes,
};
