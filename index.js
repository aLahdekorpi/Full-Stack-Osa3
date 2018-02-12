const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')
app.use(express.static('build'))

app.use(cors())

let henkilot = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
    
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res)=>{

const pituus = henkilot.length
let aika = new Date
let teksti = '<h1>Henkiloita listassa </h1>'
teksti += pituus
teksti += '<h1> aika: </h1>'
teksti += aika
res.send(teksti)
})

app.get('/api/persons/:id',(req, res) => {
  const id = Number(req.params.id)
  const hlo = henkilot.find(hlo => hlo.id === id)
  res.json(hlo)
})

app.get('/api/persons', (req, res) => {
  res.json(henkilot)
})

app.delete('/delete/:id', (req, res) => {
  const id = Number(req.params.id)
  henkilot = henkilot.filter(hlo => hlo.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(body.name === undefined || body.number === undefined){
    return res.status(400).json({error: 'name or number missing'})
  }
  for (h in henkilot){
    if (henkilot[h].name === body.name){
      return res.status(400).json({error: 'name already exists'})
    } 
  }
  const hlo = {
    name : body.name,
    number : body.number,
    id : generateId()
  }

  henkilot = henkilot.concat(hlo)
  res.json(henkilot) 
})

const generateId = () => {
  return(Math.ceil(Math.random()* 10000000 ))
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
