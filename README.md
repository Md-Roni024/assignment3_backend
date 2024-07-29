# Full Statck Assignment - Backend
This is a full-stack site <span style="color: red;font-size:20px">Backend</span> built with Node.js and Express.js stores hotel and room details. It uses PostgreSQL to manage data like hotel slug,title,host name,host email,bedroom count,guest count and amenities. The backend provides APIs to create & read this information. It ensures data is accurate and easy to query. This setup allows the frontend to display hotel and room details for users.

### Technology stack
### Technology Stack

As the name suggests, this repository is built on top of Node.js, Express.js & PostgreSQL, however, in the implementation detail, we will find other supporting technologies as well.

### Technology Stack

As the name suggests, this repository is built on top of Node.js, Express.js & PostgreSQL, however, in the implementation detail, we will find other supporting technologies as well.

<img src="https://img.shields.io/badge/PostgreSQL-%2331575F?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" width="60" height="25"/>: For the database to store user information, complaints, and other relevant data.

<img src="https://img.shields.io/badge/Node.js-%2343853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" width="60" height="25"/> : A runtime environment for executing JavaScript code on the server side.

<img src="https://img.shields.io/badge/Express.js-%23404d59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" width="60" height="25"/> : A web application framework for building APIs to handle server-side logic.

<img src="https://img.shields.io/badge/Postman-%23FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" width="60" height="25"/> : For testing API endpoints and ensuring smooth communication between frontend and backend.




### Running the backend 
Before running the application, make sure you have the following installed:

- Node.js
- Express.js
- Postgresql

1. Clone the project
    ```bash
    git clone https://github.com/Md-Roni024/assignment3_backend
    ```  

2. Go to the project directory and install dependencies
    ```
    cd assignment3_frontend
    npm install
    ```
3. Create a .env file then add your variables credentials as like:
    ```
    USER = "Postgress User Name"
    HOST = "Host Name"
    DATABASE = "Database Name"
    PASSWORD = "Postgress Password"

    //Server Listening PORT
    PORT = ""
    ```
4. Start the backend
    ```
    npm start
    ```
    After successfully run the backend part it will launch in port 8000.


### REST API
In the backend for managing hotel details and room information I build 5 endpoints. Where 3 endpoints for get and post hotel details, similarly rest 2 endpoins are for get and post room information.

- POST /hotel
- GET /hotel/:slug
- GET /hotel
- POST /hotel/create-room
- GET /hotel/:slug/rooms


#### TEST API by Following Endpoints:

```
  1. Get Hotel Details by Hotel Slug:
  http://localhost:3000/hotel/crowne-plaza-dhaka

  2.Get room information of specific hotel by Hotel Slug
  http://localhost:3000/hotel/crowne-plaza-dhaka/rooms
```


### Design Database Schema
- Database Name: <span style="color:red;font-size:15px;font-weight:bold">hotel_db</span>

- Hotel Deatils Table
  ```sql
  CREATE TABLE hotel_details(
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      images TEXT[], -- Array of image URLs
      guest_count INTEGER,
      bedroom_count INTEGER,
      bathroom_count INTEGER,
      amenities TEXT[], -- Array of amenity names
      host_name VARCHAR(255),
      host_image TEXT,
      host_email VARCHAR(255),
      host_phone VARCHAR(20),
      address TEXT,
      latitude DECIMAL(10, 8),
      longitude DECIMAL(11, 8)
  );
  ```
  - Room Information table
  ```sql
  CREATE TABLE room_information (
      id SERIAL PRIMARY KEY,
      hotel_slug VARCHAR(255) REFERENCES hotel_details(slug),
      room_slug VARCHAR(255) NOT NULL,
      room_title VARCHAR(255) NOT NULL,
      room_image TEXT,
      description TEXT,
      bedroom_count INTEGER,
      bath_count INTEGER,
      price INTEGER,
      guest_count INTEGER,
      UNIQUE (hotel_slug, room_slug)
  );
  ```


  ### Demo Input Data:
  - For hote_details table

  ```
  slug: crowne-plaza-dhaka

  title: Crowne Plaza Dhaka Gulshan, an IHG Hotel

  description: Crowne Plaza Dhaka Gulshan, an IHG Hotel features a fitness centre, a shared lounge and a sun terrace with swimming pool and buffet breakfast in Dhaka. This 5-star hotel offers a concierge service and luggage storage space. The accommodation provides a 24-hour front desk, airport transfers, room service and free WiFi throughout the property. At the hotel you will find a restaurant serving Seafood, Steakhouse and Asian cuisine. Vegetarian and halal options can also be requested. Popular points of interest near Crowne Plaza Dhaka Gulshan, an IHG Hotel include Consulate of Singapore, Primeasia University and Southeast University. The nearest airport is Hazrat Shahjalal International Airport, 5 km from the accommodation.
  
  images: [
    "https://lh3.googleusercontent.com/d/1L16eZ9LeY28ospfnPAFcKJjxBqHT61Mw=s220?authuser=0",
    "https://lh3.googleusercontent.com/d/1Njbw-kLtbMxY-C4ps9McEooVfsja2gpG=s220?authuser=0",
    "https://lh3.googleusercontent.com/d/1cCUQ1vuTmpSPIHWecpZp6mu436Tomf-u=s220?authuser=0",
    "https://lh3.googleusercontent.com/d/1Suxip5CEq1piA9pokrjd-cbxHc3bPSd3=s220?authuser=0",
    "https://lh3.googleusercontent.com/d/1t68vPuxypOF9TS_n_WgVHZx2g-FHjdma=s220?authuser=0"
  ]

  guest_count: 6

  bedroom_count: 3

  bathroom_count: 2,

  amenities: [
    "Free WiFi",
    "Airport shuttle",
    "Swimming pool",
    "Free parking",
    "Fitness centre",
    "24-hour front desk"
  ]

  host_name: Roni

  host_image: https://lh3.googleusercontent.com/d/1LYSAeKPBLeBp1_RR5KUlmiXu5i-8Vujk=s220?authuser=0

  host_email: roni.cse024@gmail.com

  host_phone: 01518904071

  address: Banani,Dhaka,Bangladesh

  latitude: 40.38549000

  longitude": 86.56310000

  ```
  
  - For Room Information table:
  ```
    room_title: premium king-room

    room_image: https://lh3.googleusercontent.com/     d1M1M8K_JZCcB9aRVf9V49UKoxjqNd19Kw=s220?authuser=0
    
    bedroom_count: 1

    description: Room size 36 m². Comfy beds, 8.9 – Based on 58 reviews

    guest_count: 2

    bath_count: 1

    price: 22499
  ```

### Future Improvements
  - Add more functionality:

    In future I will add some more inteactive functionality where user can give ratings and review  to every hotels. Also can make report to hotel in any unwanted reason.

  - Notification System :

    The system notifies rectors instantly upon new complaints within their hostel blocks, facilitating swift response



### Contributing
- Contributing is an open invitation for collaboration on the project. You're encouraged to participate by opening issues for bugs or feature requests and submitting pull requests with your improvements or fixes. Your contributions help enhance and grow the project, making it better for everyone.


### Contact

- For any questions or feedback, please reach out to me at roni.cse@gmail.com. I welcome all inquiries and look forward to hearing from you. Your input is valuable and appreciated!

