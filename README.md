# hackathon

1. Get City list by Budget
http://ec2-52-88-224-149.us-west-2.compute.amazonaws.com:3000/validCities/{budget}

e.g. 
http://ec2-52-88-224-149.us-west-2.compute.amazonaws.com:3000/validCities/1000

2. Get Event list by City 
http://ec2-52-88-224-149.us-west-2.compute.amazonaws.com:3000/findEvents/{city name}

e.g.
http://ec2-52-88-224-149.us-west-2.compute.amazonaws.com:3000/findEvents/New%20York

3. Search Flights
http://ec2-52-88-224-149.us-west-2.compute.amazonaws.com:3000/search?origin={city id}&destination={city id}&departDate={date}&arriveDate={date}

e.g. 
http://ec2-52-88-224-149.us-west-2.compute.amazonaws.com:3000/search?origin=SFO&destination=NYCA&departDate=2015-11-21&arriveDate=2015-11-30
