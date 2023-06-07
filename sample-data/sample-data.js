const customers = [
  {
    "id": 1,
    "name": "Leatha Ullrich"
  },
  {
    "id": 2,
    "name": "Rocio Schuster"
  },
  {
    "id": 3,
    "name": "Kelvin Schiller"
  },
  {
    "id": 4,
    "name": "Kennedi Emard"
  },
  {
    "id": 5,
    "name": "Rhiannon Little"
  },
  {
    "id": 6,
    "name": "Fleta Schuppe"
  },
  {
    "id": 7,
    "name": "Dell Rath"
  },
  {
    "id": 8,
    "name": "Era Hand"
  },
  {
    "id": 9,
    "name": "Faustino Quitzon"
  },
  {
    "id": 10,
    "name": "Tony Armstrong"
  },
  {
    "id": 11,
    "name": "Melissa Sauer"
  },
  {
    "id": 12,
    "name": "Kari Keeling"
  },
  {
    "id": 13,
    "name": "Christina Kulas"
  },
  {
    "id": 14,
    "name": "Dallas Schultz"
  },
  {
    "id": 15,
    "name": "Maria Lakin"
  },
  {
    "id": 16,
    "name": "Garry Mills"
  },
  {
    "id": 17,
    "name": "Trudie Grimes"
  },
  {
    "id": 18,
    "name": "Triston Leffler"
  },
  {
    "id": 19,
    "name": "Leatha Hettinger"
  },
  {
    "id": 20,
    "name": "Keon Kirlin"
  }
];

const rooms = [
  {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
  },
  {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
  },
  {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
  },
  {
    "number": 4,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 429.44
  },
  {
    "number": 5,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 340.17
  },
  {
    "number": 6,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
  {
    "number": 7,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 231.46
  },
  {
    "number": 8,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 261.26
  },
  {
    "number": 9,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 200.39
  },
  {
    "number": 10,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 497.64
  },
  {
    "number": 11,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 207.24
  },
  {
    "number": 12,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 172.09
  },
  {
    "number": 13,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 423.92
  },
  {
    "number": 14,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 457.88
  },
  {
    "number": 15,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 1,
    "costPerNight": 294.56
  },
  {
    "number": 16,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 325.6
  },
  {
    "number": 17,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 328.15
  },
  {
    "number": 18,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 2,
    "costPerNight": 496.41
  },
  {
    "number": 19,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 374.67
  },
  {
    "number": 20,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 343.95
  }
]

const bookings = [
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 9,
    "date": "2022/04/22",
    "roomNumber": 15
  },
  {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 43,
    "date": "2022/01/24",
    "roomNumber": 24
  },
  {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 13,
    "date": "2022/01/10",
    "roomNumber": 12
  },
  {
    "id": "5fwrgu4i7k55hl6t7",
    "userID": 20,
    "date": "2022/02/16",
    "roomNumber": 7
  },
  {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2022/02/05",
    "roomNumber": 12
  },
  {
    "id": "5fwrgu4i7k55hl6t9",
    "userID": 38,
    "date": "2023/12/14",
    "roomNumber": 14
  },
  {
    "id": "5fwrgu4i7k55hl6ta",
    "userID": 25,
    "date": "2022/01/11",
    "roomNumber": 9
  },
  {
    "id": "5fwrgu4i7k55hl6tb",
    "userID": 49,
    "date": "2022/02/06",
    "roomNumber": 5
  },
  {
    "id": "5fwrgu4i7k55hl6tc",
    "userID": 22,
    "date": "2023/11/30",
    "roomNumber": 13
  },
  {
    "id": "5fwrgu4i7k55hl6td",
    "userID": 27,
    "date": "2022/01/31",
    "roomNumber": 20
  },
  {
    "id": "5fwrgu4i7k55hl6te",
    "userID": 44,
    "date": "2022/01/19",
    "roomNumber": 8
  },
  {
    "id": "5fwrgu4i7k55hl6tf",
    "userID": 36,
    "date": "2022/01/25",
    "roomNumber": 2
  },
  {
    "id": "5fwrgu4i7k55hl6tg",
    "userID": 34,
    "date": "2022/02/03",
    "roomNumber": 17
  },
  {
    "id": "5fwrgu4i7k55hl6th",
    "userID": 19,
    "date": "2022/02/26",
    "roomNumber": 15
  },
  {
    "id": "5fwrgu4i7k55hl6ti",
    "userID": 6,
    "date": "2022/01/22",
    "roomNumber": 11
  },
  {
    "id": "5fwrgu4i7k55hl6tj",
    "userID": 21,
    "date": "2022/01/17",
    "roomNumber": 7
  },
  {
    "id": "5fwrgu4i7k55hl6tk",
    "userID": 7,
    "date": "2023/11/27",
    "roomNumber": 20
  },
  {
    "id": "5fwrgu4i7k55hl6tl",
    "userID": 3,
    "date": "2022/01/10",
    "roomNumber": 8
  },
  {
    "id": "5fwrgu4i7k55hl6tm",
    "userID": 41,
    "date": "2022/01/16",
    "roomNumber": 19
  },
  {
    "id": "5fwrgu4i7k55hl6tn",
    "userID": 15,
    "date": "2022/01/17",
    "roomNumber": 5
  },
  {
    "id": "5fwrgu4i7k55hl6to",
    "userID": 46,
    "date": "2022/02/22",
    "roomNumber": 13
  }
]

export { customers, rooms, bookings }