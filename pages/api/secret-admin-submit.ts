import { NextApiRequest, NextApiResponse } from "next";
import { getSecretAdminApiKey } from "../../lib/env"

const secretAdminApiKey = getSecretAdminApiKey()

export default async (req: NextApiRequest, res:  NextApiResponse) => {
    const { name, date, steps, secretKey } = req.body
    
    if(secretKey != secretAdminApiKey) {
        res.status(401).send('Incorrect secret key!')
        return
    }

    if(!name) {
        res.status(400).send('Missing name!')
        return
    }

    if(!date) {
        res.status(400).send('Missing date!')
        return
    }

    const parsedSteps = parseInt(steps, 10)
    if(!parsedSteps) {
        res.status(400).send('Missing or invalid steps!')
        return
    }
    
    const timestamp = Math.floor(new Date(date).setUTCHours(12) / 1000)

    const event = {
        project: process.env.GRAPHJSON_PROJECT,
        name,
        steps: parsedSteps,
    }

    const payload = {
        api_key: process.env.GRAPHJSON_API_KEY,
        json: JSON.stringify(event),
        timestamp,
    }

    console.log(payload);

    const response = await fetch("https://www.graphjson.com/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if(response.status == 200) {
        const message = `Recorded ${parsedSteps} steps for ${name} on ${date}`;
        res.status(200).send(message)
        return
    } else {
        res.status(503).send(response.body)
    }
  }
