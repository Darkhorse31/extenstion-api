let query = {
  dashboard: {
    id: "",
    query: `SELECT
        u.number_of_batches,
        (SELECT COUNT(b.batch_type) FROM batches b WHERE b.username=:user) as total_batch,
        JSON_ARRAYAGG(b.batch_type) AS batch_types,
       
        COUNT(CASE WHEN IFNULL(si.photo1, '{}') <> '{}' AND si.adhaar = b.batch_type THEN 1 END) +
        COUNT(CASE WHEN IFNULL(si.photo2, '{}') <> '{}' AND si.adhaar = b.batch_type THEN 1 END) +
        COUNT(CASE WHEN IFNULL(si.photo3, '{}') <> '{}' AND si.adhaar = b.batch_type THEN 1 END) +
        COUNT(CASE WHEN IFNULL(si.photo4, '{}') <> '{}' AND si.adhaar = b.batch_type THEN 1 END) +
        COUNT(CASE WHEN IFNULL(si.photo5, '{}') <> '{}' AND si.adhaar = b.batch_type THEN 1 END) AS total_image
    FROM userlist u
    INNER JOIN batches b ON u.email = b.username
    LEFT JOIN studentInfo si ON b.batch_type = si.adhaar
    WHERE u.email = :user
    
    `,
  },
};
module.exports = query;
