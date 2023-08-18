const { getSymplaEvents } = require("../services/symplaApi");
const { getMonth } = require("date-fns");

const months = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro",
};

async function getEvents(req, res) {
  const { data } = await getSymplaEvents();
  const result = data.data.map((event) => {
    return {
      id: event.id,
      name: formatEventName(event.name, event.start_date),
      date: event.start_date.split(" ")[0],
    };
  });

  return res.status(200).json(result);
}

function formatEventName(name, date) {
  return `${name.split(" ")[0].toLowerCase()} - ${
    months[getMonth(new Date(date))]
  }`;
}

module.exports = { getEvents };
