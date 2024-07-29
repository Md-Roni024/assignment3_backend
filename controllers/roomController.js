const { pool } = require('../config/databaseConnection');


// Create Room API
const createRoom = async (req, res) => {
  const { hotel_slug,room_slug,room_title,room_image,description, bedroom_count,bath_count,price,guest_count } = req.body;  
  try {
      const result = await pool.query(
          'INSERT INTO room_information (hotel_slug,room_slug,room_title,room_image,description, bedroom_count,bath_count,price,guest_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
          [hotel_slug,room_slug,room_title,room_image,description, bedroom_count,bath_count,price,guest_count]
      );
      console.log('Controller pass-----')
      const response = {
          message: "Successfully Created a Room.",
          info: result.rows[0]
      }
      res.status(201).json(response);
  } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).json({ error: error.message });
  }
}


// const getRoomByHotelSlug = async (req, res) => {
//     const { hotelSlug } = req.params;
//     try {
//       const result = await pool.query(
//         'SELECT room_title, room_image, description, bedroom_count, bath_count, price, guest_count FROM room_information WHERE hotel_slug = $1',
//         [hotelSlug]
//       );
//       res.json(result.rows);
//     } catch (error) {
//       console.error('Error fetching room data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
// };


const getRoomByHotelSlug = async (req, res) => {
    console.log('Fetch Room information by Hotel slug...');
    const { hotelSlug } = req.params;

    try {
        const query = `
            SELECT 
                ri.room_title, ri.room_image, ri.bedroom_count,ri.bath_count,ri.guest_count,ri.price,ri.description
            FROM hotel_details hd
            JOIN room_information ri ON hd.slug = ri.hotel_slug
            WHERE hd.slug = $1
        `;
        const { rows } = await pool.query(query, [hotelSlug]);

        if (rows.length === 0) {
            console.log(`No Rooms found with slug: ${hotelSlug}`);
            return res.status(404).json({ error: "Rooms not found" });
        }

        const response = rows.map(row => ({
            room_title: row.room_title,
            room_image: row.room_image,
            bedroom_count: row.bedroom_count,
            description: row.description,
            guest_count: row.guest_count,
            bath_count: row.bath_count,
            price: row.price,
        }));
        
        res.json(response);
  
    } catch (err) {
        console.error('Error fetching room information:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = {createRoom,getRoomByHotelSlug}