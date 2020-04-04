
/*{
    Tällä saa otettua min max ja avg kyseiselle muuttujalle kuten temperature tässä tilanteessa.
GET, 'https://my.iot-ticket.com/api/v1/stat/read/SnP7c1kZNBxmVk8q60Fm5
?datanodes=Temperature&fromdate=1584734400000&todate=1584766800000&grouping=day'

  "href": "https://my.iot-ticket.com/api/v1/stat/read/SnP7c1kZNBxmVk8q60Fm5?todate=1584766800000&grouping=day&datanodes=Temperature&fromdate=1584734400000",
  "datanodeReads": [{
    "dataType": "double",
    "unit": "c",
    "name": "temperature",
    "path": "sbm/weather",
    "values": [{
      "min": 1.0,
      "max": 2.0,
      "avg": 1.285714285714286,
      "count": 7,
      "sum": 9.0,
      "ts": 1584662400000
    }, {
      "count": 0,
      "sum": 0.0,
      "ts": 1584748800000
    }]
  }]
}
*/
