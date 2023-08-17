const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config()

const app = express()

const token = process.env.SYMPLA_TOKEN;
const baseApiUrl = process.env.SYMPLA_API;

app.use(cors());

app.get("/", async (req, res) => {
  const { data } = await axios.get(`${baseApiUrl}/events/2113137/orders`, {
    headers: {
      "s_token": token
    }
  })
  const ids = data.data.map(dt => dt.id)
  let tickets;
  try {
    tickets = await Promise.all(ids.map(id => axios.get(`${baseApiUrl}/events/2113137/orders/${id}/participants`, {
      headers: {
        "s_token": token
      }
    })))

  } catch (error) {
    console.log(error)
    throw error
  }

  const codes = tickets.reduce((acc, order) => {
    const {data} = order;
    data.data.forEach(dt => {
      const { order_discount } = dt;
      const code = order_discount.split(" - ")[1]
      if(!acc[code]) acc[code] = 0
      acc[code]++
    })
    return acc
  },{})
  res.json(codes)
})

app.listen(3010, () => {
  console.log("listening on port 3010...")
})