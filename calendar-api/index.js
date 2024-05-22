const fs = require('fs').promises
const fss = require('fs')
const path = require('path')
const process = require('process')
const { authenticate } = require('@google-cloud/local-auth')
const { google } = require('googleapis')

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  const data = fss.readFileSync('./events.json', {
    encoding: 'utf8',
    flag: 'r',
  })
  res.send(data)
})

app.listen(port, () => {
  console.log(`calendar api listening on port ${port}`)
})

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const TOKEN_PATH = path.join(process.cwd(), 'token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

async function listEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth })
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const events = res.data.items
  fs.writeFile('./events.json', JSON.stringify(events))
}

authorize().then(listEvents).catch(console.error)
setInterval(() => {
  authorize().then(listEvents).catch(console.error)
}, 60000 * 15)
