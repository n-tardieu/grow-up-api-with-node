import mongoose from 'mongoose';
import User from '../models/user'
import LocationType from '../models/location-type'
import PlantVariety from '../models/plant-variety'

const seedUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password1',
    role: 'admin',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password2',
    role: 'admin',
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password3',
    role: 'user',
  },
  {
    name: 'Bob Thompson',
    email: 'bob@example.com',
    password: 'password4',
    role: 'user',
  },
  {
    name: 'Eve Wilson',
    email: 'eve@example.com',
    password: 'password5',
    role: 'user',
  },
];

const seedLocationTypes = [
  { name: 'Salon' },
  { name: 'Chambre' },
  { name: 'Balcon' },
  { name: 'Terrasse' },
  { name: 'Jardin avant' },
  { name: 'Jardin arrière' },
  { name: 'Véranda' },
]

const seedPlantVarieties = [
  {
    name: 'Ficus elastica',
    description: 'Le Ficus elastica, communément appelé caoutchouc ou arbre à caoutchouc, est une plante d\'intérieur à feuilles épaisses et brillantes.',
    waterFrequency: 10,
    lightRequirements: 'Lumière vive',
    optimalTemperature: 18,
  },
  {
    name: 'Sansevieria trifasciata',
    description: 'La Sansevieria trifasciata, également connue sous le nom de langue de belle-mère, est une plante succulente populaire.',
    waterFrequency: 14,
    lightRequirements: 'Lumière indirecte',
    optimalTemperature: 25,
  },
  {
    name: 'Pothos',
    description: 'Le Pothos, également connu sous le nom de lierre du diable, est une plante d\'intérieur grimpante et facile à entretenir.',
    waterFrequency: 5,
    lightRequirements: 'Lumière indirecte',
    optimalTemperature: 22,
  },
  {
    name: 'Dracaena marginata',
    description: 'Le Dracaena marginata, communément appelé dragonnier, est une plante d\'intérieur avec des feuilles minces et pointues.',
    waterFrequency: 12,
    lightRequirements: 'Lumière vive',
    optimalTemperature: 24,
  },
  {
    name: 'Snake Plant',
    description: 'La Snake Plant, également connue sous le nom de Sansevieria, est une plante d\'intérieur résistante et adaptée à différents niveaux de lumière.',
    waterFrequency: 10,
    lightRequirements: 'Lumière indirecte',
    optimalTemperature: 20,
  },
  {
    name: 'Calathea',
    description: 'Le Calathea est une plante d\'intérieur connue pour ses feuilles colorées et ses motifs uniques.',
    waterFrequency: 7,
    lightRequirements: 'Lumière indirecte',
    optimalTemperature: 22,
  },
  {
    name: 'Aloe vera',
    description: 'L\'Aloe vera est une plante succulente appréciée pour ses bienfaits pour la peau et sa capacité à survivre dans des conditions arides.',
    waterFrequency: 14,
    lightRequirements: 'Lumière vive',
    optimalTemperature: 25,
  },
];


const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoDb = process.env.MONGO_DB || 'my-database';

const mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoUri, options)
  .then(() => {
    console.log('Connected to database');

  })
  .catch((err) => console.log('Error connecting database', err.message));

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers)

  await LocationType.deleteMany({});
  await LocationType.insertMany(seedLocationTypes)

  await PlantVariety.deleteMany({});
  await PlantVariety.insertMany(seedPlantVarieties)
}

seedDB().then(() => {
  mongoose.connection.close()
})



