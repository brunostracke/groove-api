const { getSymplaEvents } = require("../services/symplaApi");

async function getEvents(req, res) {
  const {data} = await getSymplaEvents()
  const result = data.data.map(event => {
    return {
      id: event.id,
      name: event.name,
      date: event.start_date.split(" ")[0]
    }
  })

  return res.status(200).json(result);
}

module.exports = {getEvents}