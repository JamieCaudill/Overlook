// FILTER ROOMS TEST //

import { expect } from 'chai';
import findTotalCost from "../src/functions/find-total-cost";
import findBookings from '../src/functions/find-bookings';
import { filterRoomsByDate, filterRoomsByType } from '../src/functions/filter-rooms';
import { sampleCustomers, sampleRooms, sampleBookings } from '../sample-data/sample-data';
