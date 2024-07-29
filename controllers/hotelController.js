const { pool } = require('../config/databaseConnection');

// Create Hotel API
const createHotel = async (req, res) => {
    console.log('Hello Post....')
  const { slug, title, description, images, guest_count, bedroom_count, bathroom_count, amenities, host_name,host_image, host_email, host_phone, address, latitude, longitude } = req.body;  
  console.log('Host_image',host_image)
  try {
      const result = await pool.query(
          'INSERT INTO hotel_details (slug, title, description, images, guest_count, bedroom_count, bathroom_count, amenities, host_name,host_image, host_email, host_phone, address, latitude, longitude) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *',
          [slug, title, description, images, guest_count, bedroom_count, bathroom_count, amenities, host_name,host_image, host_email, host_phone, address, latitude, longitude]
      );
      console.log('Controller pass-----')
      const response = {
          message: "Successfully Created a Hotel.",
          info: result.rows[0]
      }
      res.status(201).json(response);
  } catch (error) {
      console.error('Error creating hotel:', error);
      res.status(500).json({ error: error.message });
  }
}

const getHotelBySlug = async (req, res) => {
    console.log('Fetching hotel details by slug...');
    const { slug } = req.params;

    try {
        const query = `
            SELECT id, slug, title, description, images, 
                   guest_count, bedroom_count, bathroom_count, 
                   amenities, host_name, host_image, host_email, host_phone, 
                   address, latitude, longitude
            FROM hotel_details 
            WHERE slug = $1
        `;
        const { rows } = await pool.query(query, [slug]);

        if (rows.length === 0) {
            console.log(`No hotel found with slug: ${slug}`);
            return res.status(404).json({ error: "Hotel not found" });
        }

        const hotel = rows[0];
        console.log(`Hotel found: ${hotel.title}`);
        console.log('Image:', hotel.host_image);

        // If images or amenities are stored as JSON strings in the database
        // Uncomment and use JSON.parse if necessary:
        // hotel.images = JSON.parse(hotel.images);
        // hotel.amenities = JSON.parse(hotel.amenities);

        const response = {
            id: hotel.id,
            slug: hotel.slug,
            title: hotel.title,
            description: hotel.description,
            images: hotel.images,
            guest_count: hotel.guest_count,
            bedroom_count: hotel.bedroom_count,
            bathroom_count: hotel.bathroom_count,
            amenities: hotel.amenities,
            host_name: hotel.host_name,
            host_image: hotel.host_image,
            host_email: hotel.host_email,
            host_phone: hotel.host_phone,
            address: hotel.address,
            latitude: hotel.latitude,
            longitude: hotel.longitude
        };

        console.log(hotel.images);
        console.log("Type is:", typeof(hotel.images));
        res.json(response);
    } catch (err) {
        console.error('Error fetching hotel details:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};




// const getHotelBySlug = async (req, res) => {
//     console.log('Fetching hotel details by slug...');
//     const { slug } = req.params;

//     try {
//         const query = `
//             SELECT id, slug, title, description, images, 
//                    guest_count, bedroom_count, bathroom_count, 
//                    amenities, host_name,host_image, host_email, host_phone, 
//                    address, latitude, longitude
//             FROM hotel_details 
//             WHERE slug = $1
//         `;
//         const { rows } = await pool.query(query, [slug]);

//         if (rows.length === 0) {
//             console.log(`No hotel found with slug: ${slug}`);
//             return res.status(404).json({ error: "Hotel not found" });
//         }

//         const hotel = rows[0];
//         console.log(`Hotel found: ${hotel.title}`);
//         console.log('image:',hotel.host_image)
//         const response = {
//             id: hotel.id,
//             slug: hotel.slug,
//             title: hotel.title,
//             description: hotel.description,
//             images: hotel.images,
//             guest_count: hotel.guest_count,
//             bedroom_count: hotel.bedroom_count,
//             bathroom_count: hotel.bathroom_count,
//             amenities: hotel.amenities,
//             host_name: hotel.host_name,
//             host_image:hotel.host_image,
//             host_email: hotel.host_email,
//             host_phone: hotel.host_phone,
//             address: hotel.address,
//             latitude: hotel.latitude,
//             longitude: hotel.longitude
//         };
//         console.log(hotel.images)
//         console.log("Type is:",typeof(hotel.images))
//         res.json(response);
//     } catch (err) {
//         console.error('Error fetching hotel details:', err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// const getHotelBySlug = async (req, res) => {
//     console.log('Fetching hotel details and room information by slug...');
//     const { slug } = req.params;

//     try {
//         const query = `
//             SELECT 
//                 hd.id, hd.slug, hd.title, hd.description, hd.images,
//                 hd.amenities, hd.host_name, hd.host_image, hd.host_email, hd.host_phone,
//                 hd.address, hd.latitude, hd.longitude,
//                 ri.room_title, ri.room_image, ri.bedroom_count
//             FROM hotel_details hd
//             JOIN room_information ri ON hd.slug = ri.hotel_slug
//             WHERE hd.slug = $1
//         `;
//         const { rows } = await pool.query(query, [slug]);

//         if (rows.length === 0) {
//             console.log(`No hotel found with slug: ${slug}`);
//             return res.status(404).json({ error: "Hotel not found" });
//         }

//         // Prepare the response
//         const hotelInfo = rows[0];
//         const response = {
//             id: hotelInfo.id,
//             slug: hotelInfo.slug,
//             title: hotelInfo.title,
//             description: hotelInfo.description,
//             images: hotelInfo.images,
//             amenities: hotelInfo.amenities,
//             host_name: hotelInfo.host_name,
//             host_image: hotelInfo.host_image,
//             host_email: hotelInfo.host_email,
//             host_phone: hotelInfo.host_phone,
//             address: hotelInfo.address,
//             latitude: hotelInfo.latitude,
//             longitude: hotelInfo.longitude,
//             rooms: rows.map(row => ({
//                 room_title: row.room_title,
//                 room_image: row.room_image,
//                 bedroom_count: row.bedroom_count
//             }))
//         };

//         console.log(`Hotel found: ${response.title}`);
//         console.log('Hotel images:', response.images);
//         console.log("Type of hotel images:", typeof(response.images));
//         console.log('Number of rooms:', response.rooms.length);

//         res.json({ info: response });
//     } catch (err) {
//         console.error('Error fetching hotel details and room information:', err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };


module.exports = {createHotel,getHotelBySlug}