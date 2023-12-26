import axios from 'axios';
import { MarketRepository } from './MarketRepository.js';
import * as models from '../models/index.js';

const client = axios.create({
  baseURL: 'https://www.buda.com/api/v2/',
});

const marketRepository = new MarketRepository(client, models);
export { marketRepository };
