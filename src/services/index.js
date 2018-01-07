import Vue from 'vue'

import { ExmpleService } from './ExmpleService'

export const ServiceBus = new Vue()

ServiceBus.ExmpleService = ExmpleService
